import {  FormBuilder } from "@angular/forms";
import {  Router } from "@angular/router";
import { ModalService } from "../_modal";
import { GeneralService } from "../general.service";

import { Validator } from "./validators";

export class ModalStudentComponent   {
  constructor(protected fb: FormBuilder, protected modalService: ModalService, protected validators: Validator,
              protected router: Router, protected dataService: GeneralService ) {}

  protected openModal(id: string): void {
    this.modalService.open(id);

  }
  protected closeModal(id: string): void {
    this.modalService.close(id);
    this.router.navigate([""]);
  }

}

