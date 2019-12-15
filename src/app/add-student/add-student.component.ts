import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";
import { ModalService } from "src/app/_modal";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"]
})
export class AddStudentComponent implements OnInit  {
  constructor(private fb: FormBuilder, private modalService: ModalService) {}
  addStudentForm: FormGroup;
  clickedAdd: boolean;
ngOnInit(): void {
      this.initForm();
  }
  initForm(): void {
      this.addStudentForm =  this.fb.group({
      id: new FormControl("", [Validators.required, Validators.pattern(/[1-9]/ )]),
      initial: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/ )]),
        surname:  new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl("", [Validators.required, Validators.pattern( /[А-я]/)])
      }),
      schedule: new FormControl("", [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl("", [Validators.required, Validators.pattern(/[0-5]/)]),
      birthDate: new FormControl("", [Validators.required, Validators.pattern(/[0-1][0-9]-([0-2][0-9]|3[0-1])-[1-9][0-9][0-9][0-9]/)]),
      isBachelor: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)])});
  }
  openModal(id: string): void {
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.modalService.close(id);
  }
  onSubmit(): void {
    const controls = this.addStudentForm.controls;
    if (this.addStudentForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    alert(this.addStudentForm.value.initial.name);
  }
}
