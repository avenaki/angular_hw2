import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { appRoutes } from "../app-routing.module";
import { AddStudentComponent } from "./add-student/add-student.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { EditStudentGuard } from "./edit-student/edit-student.guard";

const routes: Routes = [
  { path: "edit/:id", component: EditStudentComponent, canActivate: [EditStudentGuard] },
  { path: "add", component: AddStudentComponent },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentFormsRoutingModule { }
