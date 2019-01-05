const Team = require('../models/team-models');
const teamSub = require('../subroutines/team-subs');
const User = require('../models/user-models');
const Division = require('../models/division-models');
const mongoose = require('mongoose')

/*
check teams who have not been touched or have not been touched in 5 days
update this teams MMR
make sure that the users in this team are marked as a member (we will use the teams list of members as a trusted source)
check the teams division, if it is not in that division, remove the marker from the team (we will use the divisions list as a trusted source)
*/
async function updateTeamsNotTouched() {
    //connect to mongo db
    mongoose.connect(process.env.mongoURI, () => {
        console.log('connected to mongodb');
    });
    //generate the timestamp to compare to
    let date = new Date().getTime();
    let pastDate = 1000 * 60 * 60 * 24 * process.env.daysToRefreshTeams;
    let pastDue = date - pastDate

    //grab teams who fit the criterias
    let teams = await Team.find({
        $or: [{
                lastTouched: null
            },
            {
                lastTouched: undefined
            },
            {
                lastTouched: {
                    $lt: pastDue
                }
            }
        ]
    }).then(
        (foundTeams) => {
            if (foundTeams) {
                return foundTeams
            } else {
                return null;
            }
        },
        (err) => {
            console.log("There was an error in the query", err);
            return null;
        }
    );

    //this batch will be returned
    let batch = [];
    if (teams) {
        //loop through the teams returned that met criteria
        // teams.forEach(team => {
        for (var i = 0; i < teams.length; i++) {
            let team = teams[i];
            console.log(team);
            //update the team mmr
            let mmrUpdate = await teamSub.updateTeamMmrAsynch(team);

            if (mmrUpdate) {
                console.log('mmr updated')
            }

            let teamMembers = [];
            team.teamMembers.forEach(member => {
                teamMembers.push(member.displayName);
            });
            //set the user data to reflect their membership of the team if they exist in the team member array
            let usersTeamNameUpdate = await User.updateMany({ displayName: { $in: teamMembers } }, { teamName: team.teamName, teamId: team._id }).then(
                (updated) => {
                    return updated;
                }, (err) => {
                    return null;
                }
            );
            if (usersTeamNameUpdate) {
                console.log(' updated users profile to belong to team ');
            }

            //check to make sure the prop exists
            if (team.pendingMembers) {
                let pendingMembers = [];
                team.pendingMembers.forEach(member => {
                    pendingMembers.push(member);
                });
                //set the users data to reflect their pending queue to the team, if they exist in the pending member array
                let usersPendingFlag = await User.updateMany({
                    displayName: {
                        $in: pendingMembers
                    }
                }, {
                    pendingTeam: true
                }).then(
                    (updated) => {
                        return updated;
                    }, (err) => {
                        return null;
                    }
                );
                if (usersPendingFlag) {
                    console.log(' updated users profiles to pending team ');
                }
            }


            if (team.divisionConcat) {
                let division = await Division.findOne({ divisionConcat: team.divisionConcat }).then(foundDiv => { return foundDiv; }, err => { return null; });
                if (division) {
                    if (division.teams.indexOf(team.displayName) == -1) {
                        team.divisionDisplayName = '';
                        team.divisionConcat = '';
                    } else {
                        team.divisionConcat = division.divisionConcat;
                        team.divisionDisplayName = division.displayName;
                    }
                } else {
                    team.divisionDisplayName = '';
                    team.divisionConcat = '';
                }
            }

            team.lastTouched = date;

            let saved = await team.save().then(
                (sav) => {
                    return sav;
                },
                (err) => {
                    return null;
                }
            );
            if (saved == null) {
                console.log('Team wasn\'t saved');
            } else {
                batch.push(saved);
            }
        }
        // foreach end });
    }
    return batch;
}


module.exports = {
    updateTeamsNotTouched: updateTeamsNotTouched
};