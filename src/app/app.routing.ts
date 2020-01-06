import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddStudentComponent } from "./student-forms/add-student/add-student.component";
import { EditStudentComponent } from "./student-forms/edit-student/edit-student.component";
const routes: Routes = [
  { path: "add", component: AddStudentComponent },
  { path: "edit", component: EditStudentComponent },
  { path: "", component: AppComponent },
];

export const routing = RouterModule.forRoot(routes);
