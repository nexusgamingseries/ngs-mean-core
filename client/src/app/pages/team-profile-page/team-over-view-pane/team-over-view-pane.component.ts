import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Team } from 'src/app/classes/team.class';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { CompetitiveLevelComponent } from 'src/app/formComponents/competitiveLevel/competitive-level.component';
import { PlayHistoryComponent } from 'src/app/formComponents/play-history/play-history.component';
import { RolesComponent } from 'src/app/formComponents/roles/roles.component';
import { TimesAvailableComponent } from 'src/app/formComponents/times-available/times-available.component';
import { TimezoneComponent } from 'src/app/formComponents/timezone/timezone.component';
import { TwitchComponent } from 'src/app/formComponents/twitch/twitch.component';
import { TwitterComponent } from 'src/app/formComponents/twitter/twitter.component';
import { YoutubeComponent } from 'src/app/formComponents/youtube/youtube.component';
import { AssistantCaptainMgmtComponent } from 'src/app/modal/assistant-captain-mgmt/assistant-captain-mgmt.component';
import { ChangeCaptainModalComponent } from 'src/app/modal/change-captain-modal/change-captain-modal.component';
import { ConfirmRemoveMemberComponent } from 'src/app/modal/confirm-remove-member/confirm-remove-member.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: "app-team-over-view-pane",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadComponent,
    TwitchComponent,
    TwitterComponent,
    YoutubeComponent,
    RolesComponent,
    CompetitiveLevelComponent,
    PlayHistoryComponent,
    MatSlideToggle,
    TimesAvailableComponent,
    TimezoneComponent,
    ChangeCaptainModalComponent,
    ConfirmRemoveMemberComponent,
    AssistantCaptainMgmtComponent,
  ],
  templateUrl: "./team-over-view-pane.component.html",
  styleUrl: "./team-over-view-pane.component.css",
})
export class TeamOverViewPaneComponent {
  disabled: boolean = true;
  emailAddress: string;
  message: string;
  errors: any[] = [];
  validAvailableTimes: boolean;
  validAvailDays: number = 0;
  timezoneError;
  tempProfile;
  embedSource: string = "";


  @Input() season:number = null;

  @Input() set source(_source) {
    this.embedSource = _source;
  }

  @Input() returnedProfile: Team;

  constructor(
    public user: UserService,
    private requestService: RequestService,
    public auth: AuthService,
    public team: TeamService,
    public dialog: MatDialog,
    private admin: AdminService,
    public util: UtilitiesService
  ) {}

  //this boolean will keep up with wether the component is embedded in another or is acting as it's own standalone page
  // componentEmbedded: boolean = false;

  //this method enables form inputs for changes
  openEdit() {
    this.disabled = false;
    this.tempProfile = Object.assign({}, this.returnedProfile);
  }

  //this method resets the profile back to pre-edit state and disables inputs for changes
  cancel() {
    this.returnedProfile = Object.assign({}, this.tempProfile);
    this.disabled = true;
  }

  //this method checks that the inputs are valid and if so, saves the team object
  save() {
    if (this.validate()) {
      this.disabled = true;

      this.util.updateAvailabilityToNum(this.returnedProfile);
      // let keys = Object.keys(this.returnedProfile.availability);
      // keys.forEach(element => {
      //   let obj = this.returnedProfile.availability[element];
      //   if (obj.available) {
      //     obj['startTimeNumber'] = this.util.convertToMil(obj.startTime);
      //     obj['endTimeNumber'] = this.util.convertToMil(obj.endTime);
      //   }
      // });

      if (!this.checkRosterSize()) {
        this.returnedProfile.lookingForMore = false;
      }

      let cptRemoved = Object.assign({}, this.returnedProfile);
      delete cptRemoved.captain;

      this.team.saveTeam(cptRemoved).subscribe(
        (res) => {
          this.disabled = true;
        },
        (err) => {
          console.warn(err);
          alert(err.message);
        }
      );
    } else {
      //activate validator errors
      alert("the data was invalid");
      console.warn("the data was invalid");
    }
  }

  //this method controls the opening of the change captain modal
  openAssCaptainChangeDialog(): void {
    const mgmtAssCpt = this.dialog.open(AssistantCaptainMgmtComponent, {
      width: "450px",
      data: {
        members: this.returnedProfile.teamMembers,
        captain: this.returnedProfile.captain,
        assistantCaptain: this.returnedProfile.assistantCaptain,
      },
    });

    mgmtAssCpt.afterClosed().subscribe((result) => {
      if (result != undefined && result != null) {
        this.returnedProfile.assistantCaptain = result;
        this.save();
      }
    });
  }

  openConfirmRemove(player): void {
    const openConfirmRemove = this.dialog.open(ConfirmRemoveMemberComponent, {
      width: "450px",
      data: { player: player },
    });

    openConfirmRemove.afterClosed().subscribe((result) => {
      if (result != undefined && result != null) {
        if (result == "confirm") {
          // this.removeMember(player)
        }
      }
    });
  }

  adminRefreshMMR() {
    this.admin.refreshTeamMMR(this.returnedProfile.teamName_lower).subscribe(
      (res) => {
        this.returnedProfile.teamMMRAvg = res.newMMR;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  //this method controls the opening of the change captain modal
  openCaptainChangeDialog(): void {
    const changeCptDialogRef = this.dialog.open(ChangeCaptainModalComponent, {
      width: "450px",
      data: {
        members: this.returnedProfile.teamMembers,
        captain: this.returnedProfile.captain,
      },
    });

    changeCptDialogRef.afterClosed().subscribe((result:any) => {
      if ( !this.util.isNullOrEmpty(result)) {
        this.team
          .changeCaptain(this.returnedProfile.teamName_lower, result)
          .subscribe(
            (res) => {
              this.returnedProfile = res;
              this.disabled = true;
              this.auth.destroyCaptain();
            },
            (err) => {
              console.warn(err);
            }
          );
      }
    });
  }

  ngOnInit() {
    this.disabled = true;
  }

  checkRosterSize() {
    let mem = 0;
    if (
      this.returnedProfile.teamMembers &&
      this.returnedProfile.teamMembers.length > 0
    ) {
      mem += this.returnedProfile.teamMembers.length;
    } else {
      mem += 0;
    }
    if (
      this.returnedProfile.pendingMembers &&
      this.returnedProfile.pendingMembers.length > 0
    ) {
      mem += this.returnedProfile.pendingMembers.length;
    } else {
      mem += 0;
    }
    return mem < 9;
  }

  inviteEmail() {
    let storedEmail = this.emailAddress;
    this.emailAddress = "";
    if (storedEmail.length > 0) {
      this.user.emailOutreach(storedEmail).subscribe(
        (res) => {
          this.message = res["message"];
        },
        (err) => {}
      );
    }
  }

  //method for inviting users to join this team
  invite(user) {
    if (this.returnedProfile.teamName && user) {
      if (this.checkUserInPending(user)) {
        this.message = "User is all ready invited to your team!";
      } else {
        this.requestService
          .inviteToTeamRequest(this.returnedProfile.teamName_lower, user)
          .subscribe(
            (res) => {
              if (this.returnedProfile["invitedUsers"] == null) {
                this.returnedProfile["invitedUsers"] = [user];
              } else {
                this.returnedProfile["invitedUsers"].push(user);
              }
            },
            (err) => {
              this.message = err.error.message;
            }
          );
      }
    }
  }

  receiveValidTimes(event) {
    this.validAvailableTimes = event.valid;
    this.validAvailDays = event.numdays;
  }

  checkUserInPending(user) {
    let returnValue = false;
    if (this.returnedProfile.pendingMembers) {
      this.returnedProfile.pendingMembers.forEach((pendingMember) => {
        if (pendingMember.displayName == user) {
          returnValue = true;
        }
      });
    } else if (this.returnedProfile["invitedUsers"]) {
      this.returnedProfile["invitedUsers"].forEach((invited) => {
        if (invited == user) {
          returnValue = true;
        }
      });
    }
    return returnValue;
  }

  //method to validate the inputs we require.
  validate() {
    this.errors = [];
    let valid = true;

    //ensure time zone
    if (
      this.validAvailDays > 0 &&
      this.util.isNullOrEmpty(this.returnedProfile.timeZone)
    ) {
      valid = false;
      this.timezoneError = {
        error: true,
      };
      this.errors.push("Timezone required with time's available.");
    } else {
      this.timezoneError = { error: false };
    }
    return valid;
  }

  //method takes in the factors at hand to show the captain edit options or the admin edit options
  showEditDialog() {
    if (this.embedSource == "admin") {
      return false;
    } else if (this.season) {
      return false;
    } else {
      let isTeamCpt;
      if (this.auth.getCaptain()) {
        isTeamCpt = this.team.captainLevel(
          this.returnedProfile,
          this.auth.getUser()
        );
      }
      return isTeamCpt;
    }
  }
}
