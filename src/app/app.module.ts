import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ModalModule } from "./_modal";
import { AddStudentComponent } from "./add-student/add-student.component";
import { AppComponent } from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
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
