import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators  } from "@angular/forms";
import {  Router } from "@angular/router";
import { ModalService } from "src/app/_modal";
import { GeneralService } from "../../general.service";
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
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validator: Validator,
              protected dataService: GeneralService, protected router: Router,
              protected cdr: ChangeDetectorRef) {
    super(fb, modalService, validator, router, dataService);

  }
  addStudentForm: FormGroup;
  public ngOnInit(): void {
    this.initForm();
    this.cdr.markForCheck();
    setTimeout( () => {    this.openModal("addModal"); }, 2000);
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
  protected submitStudent(myForm: FormGroup,  id: string): void {
    const controls = myForm.controls;
    if (myForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      alert("Вы не полностью ввели данные или ввели неверно");
      return;
    }
    if (localStorage.getItem(myForm.controls["studNumber"].value.toString()) !== null) {
      alert("Такой номер студенческого уже используется! Введите другой");
      return;
    }
    const newStudent = new Student( myForm.controls["studNumber"].value,
      myForm.controls["fullName"].value["name"], myForm.controls["fullName"].value["surname"],
      myForm.controls["fullName"].value["patronymic"], new Date(myForm.controls["birthDate"].value),
      myForm.controls["schedule"].value,   Number(myForm.controls["averageScore"].value),
      Number(myForm.controls["averageScore"].value),
      Boolean(myForm.controls["isBachelor"].value), Boolean(myForm.controls["hasScholarship"].value));
    this.dataService.instance.addStudent(newStudent);
    this.modalService.close(id);
    this.router.navigate([""]);
  }
}
