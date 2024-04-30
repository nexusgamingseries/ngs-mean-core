import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AclService } from './acl.service';
import { PageEvent, MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-acl-management',
  templateUrl: './admin-acl-management.component.html',
  styleUrls: ['./admin-acl-management.component.css'],
  standalone:true,
  imports:[
    MatPaginatorModule,
    FormsModule,
    MatLabel, MatFormField,
    RouterModule
  ]
})
export class AdminAclManagementComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  //component properties
  users: any = [];
  filterName:string='';
  displayArray = [];
  length:number;
  pageSize:number = 10;
  filteredArray:any = [];

  pageEvent: PageEvent

  pageEventHandler(pageEvent:PageEvent){
      let i = pageEvent.pageIndex * this.pageSize;
      let endSlice = i + this.pageSize
      if (endSlice > this.filteredArray.length){
        endSlice = this.filteredArray.length;
      }
      this.displayArray = [];
      this.displayArray = this.filteredArray.slice(i, endSlice)

  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
  }

  constructor(private adminService:AdminService, private aclService: AclService, private util: UtilitiesService) { }

  filterUsers(filterName){
    if(filterName == null || filterName == undefined || filterName.length == 0){
      this.filteredArray = this.users;
      this.length = this.filteredArray.length;
      this.displayArray = this.filteredArray.slice(0, 10);
      this.paginator.firstPage();
    }else{
      this.filteredArray = [];
      this.users.forEach(element => {
        if(!this.util.isNullOrEmpty(element.displayName)){
          if (element.displayName.toLowerCase().indexOf(filterName.toLowerCase()) > -1) {
            this.filteredArray.push(element);
          }
        }
      });
      this.length = this.filteredArray.length;
      this.displayArray = this.filteredArray.slice(0,10);
      this.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.adminService.getUsersAcls().subscribe(
      (res)=>{
        //assign return to local property
        this.users = res;
        this.users.forEach(element => {
          element = this.aclService.removeUnwantedProps(element);
        })
        this.filterUsers('');
      },
    (err)=>{ console.warn(err);}
    )
  }
}
