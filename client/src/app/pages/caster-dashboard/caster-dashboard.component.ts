import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BannerImageComponent } from 'src/app/components/banner-image/banner-image.component';


@Component({
  selector: 'app-caster-dashboard',
  templateUrl: './caster-dashboard.component.html',
  styleUrls: ['./caster-dashboard.component.css'],
  standalone:true,
  imports:[CommonModule, BannerImageComponent, ]
})
export class CasterDashboardComponent implements OnInit {

  index = 0;

  setTab(ind){
    this.index = ind;
  }

  constructor(){}

  ngOnInit(){

  }



}
