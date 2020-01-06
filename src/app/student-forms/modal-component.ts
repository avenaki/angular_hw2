import { EventEmitter,  Output } from "@angular/core";
import {  FormBuilder, FormGroup } from "@angular/forms";
import { ModalService } from "../_modal";
import { Student } from "../student";
import { Validator } from "./validators";

export class ModalStudentComponent   {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validators: Validator) {}
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
    const newStudent = new Student( myForm.controls["studNumber"].value,
      myForm.controls["fullName"].value["name"], myForm.controls["fullName"].value["surname"],
      myForm.controls["fullName"].value["patronymic"], new Date(myForm.controls["birthDate"].value),
      myForm.controls["schedule"].value,   Number(myForm.controls["averageScore"].value),
      Number(myForm.controls["averageScore"].value),
      Boolean(myForm.controls["isBachelor"].value), Boolean(myForm.controls["hasScholarship"].value));
      emitter.emit(newStudent);
    this.modalService.close(id);
  }
}
