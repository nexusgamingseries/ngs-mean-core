import { Component } from '@angular/core';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { NavComponent } from './nav/nav.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[AppFooterComponent, RouterModule, NavComponent]
})

export class AppComponent {
  constructor(private notificationService:NotificationService, private snackBar:MatSnackBar, private router:Router){
    this.notificationService.subj_notification.subscribe(
      message=>{
        this.snackBar.open(message, 'Dismiss', { duration: 3000});
      }
    );
    this.router.events.subscribe( event=>{
      if(event instanceof NavigationEnd){
        (<any>window).gtag('config', 'UA-130248168-2',
        {
          'page_path': event.urlAfterRedirects
        });
      }

    })
  }

}
