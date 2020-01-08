import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import {  AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GeneralService } from "./general.service";
import { HttpService } from "./http.service";
import { InitialsPipe } from "./initials.pipe";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StartComponent } from "./start/start.component";
import { StudentFormsModule } from "./student-forms/student-forms.module";
import { StudentsHardcodedService } from "./students-hardcoded.service";
import { TendencyDirective } from "./tendency.directive";


 const generalServiceFactory = (_httpService: HttpService,  _hardcodedService: StudentsHardcodedService,
                                      ) => {
   const currentUrl = window.location.search;
  if  ( currentUrl.endsWith("?debug=true")) {
    return new GeneralService(_httpService, _hardcodedService,  2);
  }
  return new GeneralService(_httpService, _hardcodedService,  1);
};

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
  providers:  [ { provide: GeneralService, useFactory: generalServiceFactory, deps: [HttpService, StudentsHardcodedService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
