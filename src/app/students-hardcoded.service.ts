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
    },
    {
      studNumber: 3,
      name: "Алиса",
      surname: "Куличкина",
      patronymic: "Олеговна",
      birthDate: new Date("09-01-1997"),
      schedule: "Экономика",
      hasScholarship: true,
      isBachelor: false,
      averageScore: 4,
      previousAverageScore: 3
    },
    {
      studNumber: 5,
      name: "Кристина",
      surname: "Патракова",
      patronymic: "Андреевна",
      birthDate: new Date("02-02-1998"),
      schedule: "Филология",
      hasScholarship: true,
      isBachelor: true,
      averageScore: 5,
      previousAverageScore: 4
    },
    {
      studNumber: 6,
      name: "Антон",
      surname: "Трубицын",
      patronymic: "Олегович",
      birthDate: new Date("11-11-1999"),
      schedule: "Юриспруденция",
      hasScholarship: true,
      isBachelor: false,
      averageScore: 2,
      previousAverageScore: 2
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
