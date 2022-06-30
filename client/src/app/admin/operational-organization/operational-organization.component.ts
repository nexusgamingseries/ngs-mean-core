import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { OperationalOrganization } from 'src/app/classes/operationalOrganization';
import { OpOrgService } from 'src/app/services/op-org.service';
import { SharedValidatorsService } from 'src/app/services/shared-validators.service';

@Component({
  selector: "app-operational-organization",
  templateUrl: "./operational-organization.component.html",
  styleUrls: ["./operational-organization.component.css"],
})
export class OperationalOrganizationComponent implements OnInit {
  constructor(
    private opOrgServ: OpOrgService,
    private sharedValidators: SharedValidatorsService,
    private http: HttpClient
  ) {
    this.http.get("../assets/filterWords.json").subscribe({
      next: (val) => {
        this.filterWords = val["data"];
        this.ngOnInit();
      },
    });
  }

  filterWords;

  markFormGroupTouched(formGroup: FormGroup) {
    if (formGroup.controls) {
      const keys = Object.keys(formGroup.controls);
      for (let i = 0; i < keys.length; i++) {
        const control = formGroup.controls[keys[i]];

        if (control instanceof FormControl) {
          control.markAsTouched();
        } else if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    }
  }

  nameCtrl = new FormControl("", [Validators.required]);
  abbreviationCtrl = new FormControl("", [Validators.required]);

  formGroup: FormGroup;

  org = new OperationalOrganization(null, null, null);

  ngOnInit(): void {
    this.nameCtrl.setValidators([
      Validators.required,
      this.sharedValidators.validateWords(this.filterWords),
    ]);
    this.nameCtrl.setAsyncValidators([this.checkNameFree()]);

    this.abbreviationCtrl.setValidators([
      Validators.required,
      this.sharedValidators.validateWords(this.filterWords),
    ]);
    this.abbreviationCtrl.setAsyncValidators([this.checkAbbreviationFree()]);

    this.formGroup = new FormGroup({
      name: this.nameCtrl,
      abbreviation: this.abbreviationCtrl,
    });

    this.markFormGroupTouched(this.formGroup);
  }

  originalValues: object = {};

  catchChange(e){
    this.org = e;
  };

  checkNameFree(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      let val = control.value;
      if (val && val.length > 0) {
        let trimmedVal = val.trim();
        if (this.originalValues["checkNameFree"] == control.value) {
          this.originalValues["checkNameFree"] = trimmedVal;
          return of(null);
        } else {
          return this.opOrgServ.getOpOrg({ name: val }).pipe(
            map((res) => {
              let keys = Object.keys(res);
              if (keys.length > 0) {
                return { taken: true };
              }
            })
          );
        }
      } else {
        return of(null);
      }
    };
  }

  checkAbbreviationFree(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      let val = control.value;
      if (val && val.length > 0) {
        let trimmedVal = val.trim();
        if (this.originalValues["checkAbbreviationFree"] == control.value) {
          this.originalValues["checkAbbreviationFree"] = trimmedVal;
          return of(null);
        } else {
          return this.opOrgServ.getOpOrg({ abbreviation: val }).pipe(
            map((res) => {
              let keys = Object.keys(res);
              if (keys.length > 0) {
                return { taken: true };
              }
            })
          );
        }
      } else {
        return of(null);
      }
    };
  }

  saveOpOrg() {
    this.opOrgServ.saveOpOrg(this.org).subscribe({
      next: (v) => {
        console.log("next", v);
        this.org = new OperationalOrganization(null, null, null);
      },
      complete: () => {
        console.log("complete");
      },
      error: (err) => {
        console.warn("err", err);
      },
    });
  }
}
