import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StartComponent } from "./start/start.component";


export const appRoutes: Routes = [
  { path: "", component: StartComponent },
  { path: "student-forms", loadChildren: "./student-forms/student-forms.module" },
  { path: "**", component: NotFoundComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
