import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalService } from "../../_modal";
import { GeneralService } from "../../general.service";
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
              protected route: ActivatedRoute, protected dataService: GeneralService,
              protected cdr: ChangeDetectorRef, protected router: Router) {
    super(fb, modalService, validator, router, dataService);
  }
  editStudentForm: FormGroup ;
   currentStudent: Student;

  public ngOnInit(): void {
    this.loadData();
  }

public loadData(): void {
  const id = this.route.snapshot.params.id;
  this.dataService.instance.getStudentById(id).subscribe(data => {
    this.currentStudent = data;
    this.currentStudent.birthDate = new Date (this.currentStudent.birthDate);
    this.initForm();
    this.cdr.markForCheck();
    setTimeout( () => {    this.openModal("editStudentModal"); }, 1000);
  });
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
  protected submitStudent(myForm: FormGroup,  id: string): void {
    const controls = myForm.controls;
    if (myForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      alert("Вы не полностью ввели данные или ввели неверно");
      return;
    }
    const newStudent = new Student( myForm.controls["studNumber"].value,
      myForm.controls["fullName"].value["name"], myForm.controls["fullName"].value["surname"],
      myForm.controls["fullName"].value["patronymic"], new Date(myForm.controls["birthDate"].value),
      myForm.controls["schedule"].value,   Number(myForm.controls["averageScore"].value),
      this.currentStudent.averageScore,
      Boolean(myForm.controls["isBachelor"].value), Boolean(myForm.controls["hasScholarship"].value));
    this.dataService.instance.editStudent(newStudent);
    this.router.navigate([""]);
  }
}
