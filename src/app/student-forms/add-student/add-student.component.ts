import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";
import { ModalService } from "src/app/_modal";
import { Student } from "../../student";
import {  ModalStudentComponent } from "../modal-component";
import { Validator } from "../validators";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStudentComponent extends ModalStudentComponent implements OnInit {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validators: Validator) {
    super(fb, modalService, validators);
  }
  addStudentForm: FormGroup;
  @Output() newStudentData: EventEmitter<Student> = new EventEmitter<Student>();
  public ngOnInit(): void {
    this.initForm();
  }
  protected initForm(): void {
    this.addStudentForm =  this.fb.group({
      studNumber: new FormControl("", [Validators.required, Validators.pattern(/[1-9]/ )]),
      fullName: new FormGroup({
        name: new FormControl("", [Validators.required, Validators.pattern(/[А-я]/ )]),
        surname:  new FormControl("", [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl("", [Validators.required, Validators.pattern( /[А-я]/)])
      }, [Validators.required, this.validators.fullNameValidator]),
      schedule: new FormControl("", [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl("", [Validators.required, Validators.pattern(/[0-5]/),
        this.validators.markValidator]),
      birthDate: new FormControl("", [Validators.required, this.validators.birthDateValidator]),
      isBachelor: new FormControl("", [Validators.required, Validators.pattern(/(true|false)/)])});
  }

}
