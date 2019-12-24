import { EventEmitter, OnInit, Output } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalService } from "./_modal";
import { Student } from "./student";
import { Validator } from "./validators";

export class ModalComponent   {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validators: Validator) {}
  myForm: FormGroup ;
  clickedAdd: boolean;
  @Output() newStudentData: EventEmitter<Student> = new EventEmitter<Student>();
  protected openModal(id: string): void {
    this.modalService.open(id);
  }
  protected closeModal(id: string): void {
    this.modalService.close(id);
  }
  protected submitStudent(myForm: FormGroup, emitter: EventEmitter<Student>, id: string): void {
    const controls = myForm.controls;
    if (myForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      alert("Вы не полностью ввели данные или ввели неверно");
      return;
    }
    const newStudent = new Student(Number(myForm.controls["id"].value),
      myForm.controls["fullName"].value["name"], myForm.controls["fullName"].value["surname"],
      myForm.controls["fullName"].value["patronymic"], new Date(myForm.controls["birthDate"].value),
      myForm.controls["schedule"].value,   Number(myForm.controls["averageScore"].value),
      Boolean(myForm.controls["isBachelor"].value), Boolean(myForm.controls["hasScholarship"].value));
      emitter.emit(newStudent);
    this.modalService.close(id);
  }
}

