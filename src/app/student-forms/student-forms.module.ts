import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ModalModule } from "../_modal";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";

const appRoutes: Routes = [
  { path: "add", component: AddStudentComponent},
  { path: "edit", component: EditStudentComponent},
 ]
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
    RouterModule.forRoot(appRoutes),
  ]
})
export class StudentFormsModule { }
