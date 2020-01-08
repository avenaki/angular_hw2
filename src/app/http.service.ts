import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IGeneralService } from "./igeneral.service";
import { Student } from "./student";


@Injectable({
  providedIn: "root"
})
export class HttpService implements IGeneralService {
  constructor(private http: HttpClient) { }
  private static getParams(student: Student): HttpParams {
    let params = new HttpParams();
    params = params.append("studNumber", student.studNumber.toString());
    params = params.append("name", student.name);
    params = params.append("surname", student.surname);
    params = params.append("patronymic", student.patronymic);
    params = params.append("schedule", student.schedule);
    params = params.append("averageScore", student.averageScore.toString());
    params = params.append("previousAverageScore", student.previousAverageScore.toString());
    params = params.append("isBachelor", student.isBachelor.toString());
    params = params.append("hasScholarship", student.hasScholarship.toString());
    params = params.append("birthDate", student.birthDate.toDateString());
    return params;
  }
  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:5000/api/student/get");
  }

  public getStudentById(id: string): Observable <Student> {
    return this.http.get<Student>("http://localhost:5000/api/student/find/" + id);
  }
  public addStudent( student: Student ): void {
   const params = HttpService.getParams(student);
     this.http.get<Student[]>("http://localhost:5000/api/student/post",  { params } ).subscribe();
  }

  public editStudent(  student: Student): void {
    const params = HttpService.getParams(student);
    this.http.get<Student[]>("http://localhost:5000/api/student/put",   { params }).subscribe();
  }

  public deleteStudent(  id: number): Observable<Student[]>  {
    return this.http.get<Student []>("http://localhost:5000/api/student/delete/" + id.toString() );
  }
}
