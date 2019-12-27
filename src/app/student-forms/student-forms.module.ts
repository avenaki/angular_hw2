import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "../_modal";
import { ModalComponent } from "../_modal/modal.component";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";




@NgModule({
  declarations: [
    AddStudentComponent,
    EditStudentComponent,
  ],
  exports: [
    AddStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ]
})
export class StudentFormsModule { }
