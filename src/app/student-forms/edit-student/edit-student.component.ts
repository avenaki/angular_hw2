import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "../../_modal";
import { HttpService } from "../../http.service";
import { Student } from "../../student";
import { ModalStudentComponent } from "../modal-component";
import { Validator } from "../validators";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStudentComponent extends ModalStudentComponent implements OnInit {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validator: Validator,
              protected route: ActivatedRoute, protected http: HttpService ) {
    super(fb, modalService, validator);
  }
  editStudentForm: FormGroup ;
  clickedAdd: boolean;
  @Output() editedStudentData:  EventEmitter<Student> = new EventEmitter<Student>();
  @Input() currentStudent;
  public ngOnInit(): void {
    this.getStudentDetails();
  }
  getStudentDetails(): void {

    const id = this.route.snapshot.params.id;
    if ( id === null || id === undefined) {
      this.initForm();

    } else {
      this.http.getStudentById(id).subscribe(data => {
        this.currentStudent = data;
        this.initForm();
        this.openModal(id);
      });
    }
  }
  protected initForm(): void {
    const day = (this.currentStudent.birthDate.getDate() < 10) ? "0" + this.currentStudent.birthDate.getDate() : this.currentStudent.birthDate.getDate();
    const month = (this.currentStudent.birthDate.getMonth() + 1 < 10) ? "0" + (this.currentStudent.birthDate.getMonth() + 1) : this.currentStudent.birthDate.getMonth() + 1;
    const year = this.currentStudent.birthDate.getFullYear();
    this.editStudentForm =  this.fb.group({
      studNumber: new FormControl(this.currentStudent.studNumber, [Validators.required, Validators.pattern(/[1-9]/ )]),
      fullName: new FormGroup({
        name: new FormControl(this.currentStudent.name, [Validators.required, Validators.pattern(/[А-я]/ )]),
        surname:  new FormControl(this.currentStudent.surname, [Validators.required, Validators.pattern(/[А-я]/)]),
        patronymic: new FormControl(this.currentStudent.patronymic, [Validators.required, Validators.pattern( /[А-я]/)])
      }, [Validators.required, this.validator.fullNameValidator]),
      schedule: new FormControl(this.currentStudent.schedule, [Validators.required, Validators.pattern(/[А-я]|[А-я]-?/)]),
      hasScholarship: new FormControl(this.currentStudent.hasScholarship, [Validators.required, Validators.pattern(/(true|false)/)]),
      averageScore: new FormControl(this.currentStudent.averageScore, [Validators.required, Validators.pattern(/[0-5]/),
      this.validator.markValidator]),
      birthDate: new FormControl(year + "-" + month + "-" + day, [Validators.required, this.validator.birthDateValidator]),
      isBachelor: new FormControl(this.currentStudent.isBachelor, [Validators.required, Validators.pattern(/(true|false)/)])});
  }
}
