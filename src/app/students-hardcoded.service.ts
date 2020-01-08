import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { IGeneralService } from "./igeneral.service";
import { Student } from "./student";


@Injectable({
  providedIn: "root"
})
export class StudentsHardcodedService implements IGeneralService {
  students: Student[];
  students$: Observable<Student[]>;
  student$: Observable<Student>;
constructor() {
  this.students = [
    {
      studNumber: 1,
      name: "Олег",
      surname: "Шемельдин",
      patronymic: "Олегович",
      birthDate: new Date("08-17-1999"),
      schedule: "Программная-инженерия",
      hasScholarship: true,
      isBachelor: false,
      averageScore: 3,
      previousAverageScore: 4
    },
    {
      studNumber: 2,
      name: "Екатерина",
      surname: "Перепелица",
      patronymic: "Андреевна",
      birthDate: new Date("08-08-1998"),
      schedule: "Программная-инженерия",
      hasScholarship: true,
      isBachelor: true,
      averageScore: 4,
      previousAverageScore: 5
    }];
}
  public getStudents(): Observable<Student[]> {
    return this.students$ = new Observable( sub => { sub.next(this.students); });
     }

  public getStudentById(id: string): Observable <Student> {
  const index = this.students.findIndex(currentStudent => currentStudent.studNumber === Number(id));
  const studentById = this.students[index];
  return this.student$ =  new Observable( sub => { sub.next( studentById); });
  }
  public addStudent( student: Student ): void {
  this.students.push(student);
  }

  public editStudent(  student: Student): void {
    const index = this.students.findIndex(currentStudent => currentStudent.studNumber === Number(student.studNumber));
    this.students[index] = student;
  }

  public deleteStudent(  id: number): Observable<Student[]>  {
    this.students = this.students.filter(item => item.studNumber !== id);
    return this.students$ = new Observable( sub => { sub.next(this.students); });
  }
}
