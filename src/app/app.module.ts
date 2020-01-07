import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import {  AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpService } from "./http.service";
import { InitialsPipe } from "./initials.pipe";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StartComponent } from "./start/start.component";
import { StudentFormsModule } from "./student-forms/student-forms.module";
import { TendencyDirective } from "./tendency.directive";




@NgModule({
  declarations: [
    AppComponent,
    TendencyDirective,
    InitialsPipe,
    NotFoundComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    StudentFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [ HttpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
