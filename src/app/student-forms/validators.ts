import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class Validator {
  birthDateValidator (control: FormControl): { [s: string]: boolean } {
      const valueToDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 10);
      if (valueToDate.getTime() > currentDate.getTime() || valueToDate.getTime().toString() === "NaN") {
        return {"birthDate": true};
      }
      return null;
    }

  fullNameValidator(group: FormGroup): { [s: string]: boolean } {
      if ((group.controls["name"].value === group.controls["surname"].value) || (group.controls["name"].value === group.controls["patronymic"].value)) {
        return {"fullName": true};
      }
      return null;
    }


  markValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value >= 5 && control.value <= 2) {
      return {"averageScore": true};
    }
    return null; }

}
