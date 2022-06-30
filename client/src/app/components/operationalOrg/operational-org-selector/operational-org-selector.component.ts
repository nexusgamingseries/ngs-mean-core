import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpOrgService } from 'src/app/services/op-org.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: "app-operational-org-selector",
  templateUrl: "./operational-org-selector.component.html",
  styleUrls: ["./operational-org-selector.component.css"],
})
export class OperationalOrgSelectorComponent implements OnInit {
  constructor(
    private opOrgServ: OpOrgService,
    private util: UtilitiesService
  ) {}

  orgs = [];
  selectedOrg = null;

  ngOnInit() {
    // if (this.adminLoad) {
    //   this.Admin.getDivisionList().subscribe(
    //     (res) => {
    //       this.divisions = res;
    //     },
    //     (err) => {
    //       console.warn(err);
    //     }
    //   );
    // } else {
      this.opOrgServ.getAllOpOrgs().subscribe({
        next: (v) => {
          this.orgs = v;
        },
        error: (err) => {
          console.warn(err);
        },
      });
    // }
  }

  @Input() set refresh(val) {
    this.ngOnInit();
  }

  @Input() set inputOrg(org) {
    if (org) {
      this.selectedOrg = org.orgId;
    } else {
      this.selectedOrg = null;
    }
  }

  @Output() orgChange = new EventEmitter();

  orgEmmiter(org) {
    this.orgChange.emit(org);
  }

  returnMatchDivision(prop, value) {
    let org = null;
    this.orgs.forEach((iorg) => {
      if (iorg[prop] == value) {
        org = iorg;
      }
    });
    return org;
  }

  orgSelected(org) {
    this.orgEmmiter(this.returnMatchDivision("orgId", org));
  }
}
