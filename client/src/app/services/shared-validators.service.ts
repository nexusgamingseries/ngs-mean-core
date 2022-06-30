import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class SharedValidatorsService {
  constructor() {}

  // filter undesirable words
  validateWords(filterWords): ValidatorFn {
    return (control: FormControl) => {
      let value = control.value;

      if (filterWords && filterWords.length > 0 && value && value.length > 0) {
        let invalid = false;
        let valueArr = value.split(" ");
        valueArr.forEach((element) => {
          if (filterWords.indexOf(element) > -1) {
            invalid = true;
          }
        });
        valueArr = value.split(",");
        valueArr.forEach((element) => {
          if (filterWords.indexOf(element) > -1) {
            invalid = true;
          }
        });
        if (invalid) {
          return { invalidWord: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

}
