import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalService } from "../_modal";
import { AddStudentComponent } from "../add-student/add-student.component";
import { ModalComponent } from "../modal-component";
import { Student } from "../student";
import { Validator } from "../validators";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"]
})
export class EditStudentComponent extends ModalComponent implements OnInit {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validator: Validator) {
    super(fb, modalService, validator);
  }
  editStudentForm: FormGroup ;
  clickedAdd: boolean;
  @Output() editedStudentData:  EventEmitter<Student> = new EventEmitter<Student>();
  @Input() currentStudent;
  public ngOnInit(): void {
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
      }, [Validators.required, this.validator.fullNameValidator]),
      schedule: new FormControl(this.currentStudent.schedule, [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl(this.currentStudent.hasScholarship, [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl(this.currentStudent.averageScore, [Validators.required, Validators.pattern(/[0-5]/),
      this.validator.markValidator]),
      birthDate: new FormControl(month + "-" + day + "-" + year, [Validators.required, this.validator.birthDateValidator]),
      isBachelor: new FormControl(this.currentStudent.isBachelor, [Validators.required, Validators.pattern(/(true|false)/)])});
  }
}
