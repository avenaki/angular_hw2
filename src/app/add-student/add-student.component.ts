import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";
import { ModalService } from "src/app/_modal";
import { Student } from "../student";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit  {
  constructor(private fb: FormBuilder, private modalService: ModalService) {}
  addStudentForm: FormGroup ;
  clickedAdd: boolean;
  @Output() newStudentData: EventEmitter<Student> = new EventEmitter<Student>();

ngOnInit(): void {
      this.initForm();
  }
  initForm(): void {
      this.addStudentForm =  this.fb.group({
      id: new FormControl("", [Validators.required, Validators.pattern(/[1-9]/ )]),
      fullName: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/ )]),
        surname:  new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl("", [Validators.required, Validators.pattern( /[А-я]/)])
      }, [Validators.required, this.fullNameValidator]),
      schedule: new FormControl("", [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl("", [Validators.required, Validators.pattern(/[0-5]/)]),
      birthDate: new FormControl("", [Validators.required, this.birthDateValidator]),
      isBachelor: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)])});
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  submitStudent(): void {
    const controls = this.addStudentForm.controls;
    if (this.addStudentForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    const newStudent = new Student(Number(this.addStudentForm.controls["id"].value),
      this.addStudentForm.controls["fullName"].value["name"], this.addStudentForm.controls["fullName"].value["surname"],
      this.addStudentForm.controls["fullName"].value["patronymic"], new Date(this.addStudentForm.controls["birthDate"].value),
      this.addStudentForm.controls["schedule"].value,   Number(this.addStudentForm.controls["averageScore"].value),
      Boolean(this.addStudentForm.controls["isBachelor"].value), Boolean(this.addStudentForm.controls["hasScholarship"].value));
      this.newStudentData.emit(newStudent);
      this.modalService.close("add-student-modal");
  }
  birthDateValidator(control: FormControl): {[s: string]: boolean} {
  const valueToDate = new Date(control.value);
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 10);
    if (valueToDate.getTime() > currentDate.getTime()  || valueToDate.getTime().toString() === "NaN") {
      return {"birthDate": true};
    }
    return null;
  }
  fullNameValidator(group: FormGroup): {[s: string]: boolean} {
   if (group.controls["name"].value === group.controls["surname"].value || group.controls["name"].value === group.controls["patronymic"].value ) {
     return {"fullName": true};
   }
   return null;
  }
}
