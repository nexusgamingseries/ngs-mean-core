import { HomeComponent } from "./home/home.component";
import { DirectoryComponent } from "./directory/directory.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { TeamProfileComponent } from "./team-profile/team-profile.component";
import { DivisionComponent } from "./division/division.component";
import { OutreachEmailResponseComponent } from "./outreach-email-response/outreach-email-response.component";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogViewComponent } from "./blog-view/blog-view.component";
import { LogoutComponent } from "./logout/logout.component";
import { CreateTeamComponent } from "./create-team/create-team.component";
import { ApproveMemberComponent } from "./admin/approve-member/approve-member.component";
import { DeleteMemberComponent } from "./admin/delete-member/delete-member.component";
import { DeleteTeamComponent } from "./admin/delete-team/delete-team.component";
import { DivisionManagementComponent } from "./admin/division-management/division-management.component";
import { SheduleViewComponent } from "./schedule/shedule-view/shedule-view.component";
import { MatchScheduleComponent } from "./schedule/match-schedule/match-schedule.component";
import { TeamScheduleComponent } from "./schedule/team-schedule/team-schedule.component";
import { ReportingComponent } from "./reporting/reporting.component";

const APP_ROUTES: Routes = [
  { path: 'directory', component: DirectoryComponent},
  { path:'', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login/:token', component: LoginComponent},
  { path: 'profile/:id', component: ProfileEditComponent},
  { path: 'teamProfile/:id', component: TeamProfileComponent},
  { path: 'teamCreate', component: CreateTeamComponent},
  { path: 'division/:division', component: DivisionComponent, runGuardsAndResolvers:'paramsChange' },
  { path: 'email/invite/:id', component:OutreachEmailResponseComponent },
  { path: 'blog', component:BlogListComponent },
  { path: 'blog/:id', component:BlogViewComponent },
  { path: '_admin/approveTeamQueue', component:ApproveMemberComponent },
  { path: '_admin/deleteUser', component:DeleteMemberComponent },
  { path: '_admin/manageTeam', component:DeleteTeamComponent },
  { path: '_admin/divisionMgmt', component:DivisionManagementComponent },
  { path: 'schedule' , component:SheduleViewComponent},
  {path: 'schedule/scheduleMatch/:id', component:MatchScheduleComponent},
  { path: 'schedule/teamSchedule', component: TeamScheduleComponent },
  {path: 'schedule/teamSchedule/:id', component:TeamScheduleComponent},
  {path: 'reporting/:id', component:ReportingComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES, {onSameUrlNavigation:'reload'})],
  exports : [ RouterModule ]
})

export class AppRoutingModule{}