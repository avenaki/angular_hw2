import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ModalModule } from "./_modal";
import { AddStudentComponent } from "./add-student/add-student.component";
import { AppComponent } from "./app.component";

import { EditStudentComponent } from "./edit-student/edit-student.component";


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
