import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent  {
  public addStudentForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    initial: new FormGroup({
      name: new FormControl(""),
      surname:  new FormControl(""),
      patronymic: new FormControl("")
    }),
    schedule: new FormControl(""),
    hasScholarship: new FormControl(""),
    averageScore: new FormControl(""),
    birthDate: new FormControl(""),
    isBachelor: new FormControl("")});


}
