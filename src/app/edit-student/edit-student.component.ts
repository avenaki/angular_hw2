import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalService } from "../_modal";
import { Student } from "../student";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"]
})
export class EditStudentComponent implements OnInit {
  constructor(private fb: FormBuilder, private modalService: ModalService) {}
  editStudentForm: FormGroup ;
  clickedAdd: boolean;
  @Output() editedStudentData:  EventEmitter<Student> = new EventEmitter<Student>();
  @Input() currentStudent;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    const day = (this.currentStudent.birthDate.getDate() < 10) ? "0" + this.currentStudent.birthDate.getDate() : this.currentStudent.birthDate.getDate();
    const month = (this.currentStudent.birthDate.getMonth() + 1 < 10) ? "0" + (this.currentStudent.birthDate.getMonth() + 1) : this.currentStudent.birthDate.getMonth() + 1;
    const year = this.currentStudent.birthDate.getFullYear();
    this.editStudentForm =  this.fb.group({
      id: new FormControl(this.currentStudent.id, [Validators.required, Validators.pattern(/[1-9]/ )]),
      fullName: new FormGroup({
        name: new FormControl(this.currentStudent.name, [Validators.required, Validators.pattern(/[А-я]/ )]),
        surname:  new FormControl(this.currentStudent.surname, [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl(this.currentStudent.patronymic, [Validators.required, Validators.pattern( /[А-я]/)])
      }, [Validators.required, this.fullNameValidator]),
      schedule: new FormControl(this.currentStudent.schedule, [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl(this.currentStudent.hasScholarship, [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl(this.currentStudent.averageScore, [Validators.required, Validators.pattern(/[0-5]/)]),
      birthDate: new FormControl(month + "-" + day + "-" + year, [Validators.required, this.birthDateValidator]),
      isBachelor: new FormControl(this.currentStudent.isBachelor, [Validators.required, Validators.pattern(/(true|false)/)])});
  }
  openModal(id: string): void {
    if (this.modalService === undefined) {
      this.modalService = new ModalService();
    }
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  submitStudent(): void {
    const controls = this.editStudentForm.controls;
    if (this.editStudentForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    const newStudent = new Student(Number(this.editStudentForm.controls["id"].value),
      this.editStudentForm.controls["fullName"].value["name"], this.editStudentForm.controls["fullName"].value["surname"],
      this.editStudentForm.controls["fullName"].value["patronymic"], new Date(this.editStudentForm.controls["birthDate"].value),
      this.editStudentForm.controls["schedule"].value,   Number(this.editStudentForm.controls["averageScore"].value),
      Boolean(this.editStudentForm.controls["isBachelor"].value), Boolean(this.editStudentForm.controls["hasScholarship"].value));
    this.editedStudentData.emit(newStudent);
    this.modalService.close(this.currentStudent.id.toString());
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
