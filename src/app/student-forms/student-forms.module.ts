import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "../_modal";
import { AppRoutingModule } from "../app-routing.module";
import { HttpService } from "../http.service";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { EditStudentGuard } from "./edit-student/edit-student.guard";
import { routing, StudentFormsRoutingModule } from "./student-forms-routing.module";


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
    StudentFormsRoutingModule,
  ],
  providers: [ EditStudentGuard ]
})
export class StudentFormsModule { }
