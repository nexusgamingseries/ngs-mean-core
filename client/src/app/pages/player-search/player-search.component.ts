import { Component, OnInit } from '@angular/core';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';
import { UserSearchComponent } from 'src/app/components/user-search/user-search.component';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  standalone:true,
  imports:[UserSearchComponent, BannerImageComponent],
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {

  constructor(private User:UserService, private Team:TeamService) { }

  selectedUser;
  team;
  receiveUser(u){
    this.User.getUser(u).subscribe(
      res=>{
        this.selectedUser = res;
        if(res.teamName){
          this.Team.getTeam(res.teamName).subscribe(
            tRes=>{
              this.team=tRes;
            },
            err=>{
              console.warn(err);
            }
          )
        }
      },
      err=>{
        console.warn(err);
      }
    )
  }

  ngOnInit(): void {
  }

}
