import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { DivisionService } from 'src/app/services/division.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadingComponent } from 'src/app/elements/loading/loading.component';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';
import { CommonModule } from '@angular/common';
import { TeamLinkComponent } from 'src/app/LinkComponents/team-link/team-link.component';
import { DivisionIfPublicComponent } from 'src/app/elements/division-if-public/division-if-public.component';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    LoadingComponent,
    BannerImageComponent,
    CommonModule,
    TeamLinkComponent,
    DivisionIfPublicComponent,
  ]
})
export class AllTeamsComponent implements OnInit {

  constructor(public TeamService:TeamService, private DivisionService:DivisionService, private util:UtilitiesService) { }

  allTeams = [];
  displayTeams = [];
  divisions = [];
  index='*';

  loading: boolean = true;
  ngOnInit() {
    this.TeamService.getRegisteredTeams().subscribe(
      res=>{
        res = this.util.sortTeams(res);
        res.forEach(team => {
          team.logo = this.TeamService.imageFQDN(team.logo);
        });
        this.allTeams = res;

        this.displayTeams = res;
        this.loading = false;
      },
      err=>{
        console.warn(err);
      }
    )

    this.DivisionService.getDivisionInfo().subscribe(
      res=>{
        this.divisions = res;
      },
      err=>{
        console.warn(err);
      }
    )


  }

  filterTeams(val){
    this.index = val;
    if(val == '*'){
      this.displayTeams = this.allTeams;
    }else{
      this.displayTeams = this.allTeams.filter( a=>{
        if(a.divisionConcat == val){
          return true;
        }
      });
      this.displayTeams = this.util.sortTeams(this.displayTeams);
    }
  }

}
