import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { TimeService } from '../../services/time.service';
import { FilterService } from '../../services/filter.service';
import { orderBy } from 'lodash'
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';

@Component({
  selector: 'app-past-seasons',
  standalone:true,
  imports:[FormsModule, MatSelect, MatLabel, MatFormField, BannerImageComponent],
  templateUrl: './past-seasons.component.html',
  styleUrls: ['./past-seasons.component.css']
})
export class PastSeasonsComponent implements OnInit {

  constructor(private HS: HistoryService, private timeService: TimeService, private FS:FilterService) { }

  seasonsList = [];
  selectedSeason;

  divisionList = [];
  selectedDivision;

  ngOnInit() {
    this.timeService.getSesasonInfo().subscribe(
      res => {
        let currentSeason = res.value;
        this.HS.getPastSeasons().subscribe(
          res => {
            orderBy(res, e => 0 - e.season).forEach(element => {
              if (parseInt(element.season) != parseInt(currentSeason)){
                this.seasonsList.push(element.season);
              }
            });
          },
          err => {
            console.warn(err);
          }
        )
      }
    );

  }

  seasonSelected(){
    this.HS.getSeasonDivisions(this.selectedSeason).subscribe(
      res=>{
        this.divisionList = [];
        res.forEach(element=>{
          this.divisionList.push(element.object);
          this.divisionList.sort((a, b) => { return this.FS.arrangeDivisions(a,b)});
        });
      },
      err=>{
        console.warn(err);
      }
    )
  }

  divisionSelected(){

  }

}
