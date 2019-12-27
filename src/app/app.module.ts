import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { InitialsPipe } from "./initials.pipe";
import { StudentFormsModule } from "./student-forms/student-forms.module";
import { TendencyDirective } from "./tendency.directive";



@NgModule({
  declarations: [
    AppComponent,
    TendencyDirective,
    InitialsPipe,
  ],
  imports: [
    BrowserModule,
    StudentFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
