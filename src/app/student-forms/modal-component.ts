import { EventEmitter,  Output } from "@angular/core";
import {  FormBuilder, FormGroup } from "@angular/forms";
import {  Router } from "@angular/router";
import { ModalService } from "../_modal";
import { HttpService } from "../http.service";
import { Student } from "../student";
import { Validator } from "./validators";

export class ModalStudentComponent   {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validators: Validator,
              protected router: Router, protected http: HttpService ) {}

  protected openModal(id: string): void {
    this.modalService.open(id);

  }
  protected closeModal(id: string): void {
    this.modalService.close(id);
    this.router.navigate([""]);
  }

}

