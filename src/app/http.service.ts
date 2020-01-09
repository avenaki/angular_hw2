import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {  Observable } from "rxjs";
import {  tap } from "rxjs/internal/operators";
import { environment } from "../environments/environment";
import { IGeneralService } from "./igeneral.service";
import { Student } from "./student";


@Injectable({
  providedIn: "root"
})
export class HttpService implements IGeneralService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }
  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + "api/student/get").pipe(
      tap(
        success => console.log("success"),
        error => {
          alert("Не получилось получить данные от сервера,  перейдите на hardcode версию");
        }));
  }

  public getStudentById(id: string): Observable <Student> {
    return this.http.get<Student>(this.apiUrl + "api/student/find/" + id).pipe(
      tap(
        success => console.log("success"),
        error => {
          alert("Не получилось получить данные от сервера, перейдите на hardcode версию");
        }));
  }

  public addStudent( student: Student ): void {
     this.http.post(this.apiUrl + "api/student/post",   student  ).pipe(
       tap(
         success => console.log("success"),
         error => {
           alert("Не получилось передать данные серверу, перейдите на hardcode версию");
         })).subscribe();
  }


  public editStudent(  student: Student): void {
    this.http.post(this.apiUrl + "api/student/put",   student ).pipe(
      tap(
        success => console.log("success"),
        error => {
          alert("Не получилось передать данные серверу, перейдите на hardcode версию");
        })).subscribe();
  }

  public deleteStudent(  id: number): void {
  this.http.post(this.apiUrl + "api/student/delete/" + id.toString(), id).pipe(
    tap(
      success => console.log("success"),
      error => {
        alert("Не получилось передать данные серверу, , перейдите на hardcode версию");
      })).subscribe();
  }
}
