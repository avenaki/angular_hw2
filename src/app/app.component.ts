import { Component } from "@angular/core";
import { AddStudentComponent } from "./add-student/add-student.component";

class Student {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  schedule: string;
  averageScore: number;
  isBachelor: boolean;
  hasScholarship: boolean;
  constructor(id: number, name: string, surname: string, patronymic: string, birthDate: Date,
              schedule: string, averageScore: number, isBachelor: boolean, hasScholarship: boolean ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.schedule = schedule;
    this.averageScore = averageScore;
    this.isBachelor = isBachelor;
    this.hasScholarship = hasScholarship;
  }
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {

  students: Student[] = [
    {
      id: 1,
      name: "Андрей",
      surname: "Иванович",
      patronymic: "Иванов",
      birthDate: new Date("2-10-1998"),
      schedule: "Бизнес-информатика",
      averageScore: 5,
      isBachelor: true,
      hasScholarship: true
    },
    {
      id: 2,
      name: "Ольга",
      surname: "Романова",
      patronymic: "Михайловна",
      birthDate: new Date("11-14-1999"),
      schedule: "Программная-инженерия",
      averageScore: 4,
      isBachelor: true,
      hasScholarship: true
    },
    {
      id: 5,
      name: "Анастасия",
      surname: "Кутузова",
      patronymic: "Евгеньевна",
      birthDate: new Date("02-14-1999"),
      schedule: "Экономика",
      averageScore: 3,
      isBachelor: true,
      hasScholarship: false

    }
    ,
    {
      id: 6,
      name: "Олег",
      surname: "Семенович",
      patronymic: "Олегович",
      birthDate: new Date("02-01-1986"),
      schedule: "Менеджмент",
      averageScore: 4,
      isBachelor: false,
      hasScholarship: false},
    {
      id: 7,
      name: "Екатерина",
      surname: "Гордиенко",
      patronymic: "Ивановна",
      birthDate: new Date("10-11-1997"),
      schedule: "Менеджмент",
      averageScore: 2,
      isBachelor: false,
      hasScholarship: false
    },
    {
      id: 8,
      name: "Екатерина",
      surname: "Сырцева",
      patronymic: "Александровна",
      birthDate: new Date("12-31-1995"),
      schedule: "Экономика",
      averageScore: 2,
      isBachelor: true,
      hasScholarship: false
    },
    {
      id: 9,
      name: "Ольга",
      surname: "Шушарина",
      patronymic: "Ивановна",
      birthDate: new Date("11-01-1999"),
      schedule: "Программная-инженерия",
      averageScore: 4,
      isBachelor: true,
      hasScholarship: true
    },
    {
      id: 10,
      name: "Кристина",
      surname: "Патракова",
      patronymic: "Андреевна",
      birthDate: new Date("06-24-1999"),
      schedule: "Менеджмент",
      averageScore: 2,
      isBachelor: true,
      hasScholarship: false
    },
  ];
  studentsActual = [];
  status: boolean = false;
  searchStatus: boolean = false;
  filterStatus: boolean = false;
  searchInput: string;
  searchValue: string;
  selectedValue: string;
  idToDelete: number;
  selectedFilteredValue: string;
  selectedNowFilter: string;
  filterInput1: string;
  inputCheck1: string;
  inputCheck2: string;
  filterInput2: string;
  studentIsFound: boolean = false;
clickAdd: boolean = false;
  switchShowFStudents(): void {
    this.status = !this.status;
  }
  studentIsValid(score: number): boolean {
    return score < 3 && this.status === true;
  }
  searchStudent(): void {
    this.searchStatus = true;
    this.studentIsFound = false;
    this.searchValue = this.searchInput.toLowerCase();
  }

  filterStudents(): void {
    this.filterStatus = true;
    this.selectedFilteredValue = this.selectedNowFilter;
    this.inputCheck1 = this.filterInput1;
    this.inputCheck2 = this.filterInput2;
  }
  colorStudent(name: string, surname: string, id: number): boolean {
    if (this.searchStatus && surname.toLowerCase() === this.searchValue && Number(this.selectedValue) === 2) {
      this.studentIsFound = true;
      return true;
    }
    if (this.searchStatus && name.toLowerCase() === this.searchValue && Number(this.selectedValue) === 1) {
      this.studentIsFound = true;
      return true;
    }
    if (this.searchStatus && id === Number(this.searchValue) && Number(this.selectedValue) === 3) {
      this.studentIsFound = true;
      this.idToDelete = Number(this.searchValue);
      return true;
    }

    return false;
  }

  filterStudent(averageScore: number, date: Date): boolean {
    if (!this.inputCheck1 && !this.inputCheck2) {
      return false;
    }
    if (Number(this.selectedFilteredValue) === 1 && this.filterStatus  ) {
      const realDate1 = new Date(this.inputCheck1);
      const realDate2 = new Date(this.inputCheck2);
      if (this.inputCheck1   === undefined) {
        if ( date.getTime() >= realDate2.getTime()) {
          return true;
        }
      }
      if (this.inputCheck2 === undefined) {
        if ( realDate1.getTime() >= date.getTime() ) {
          return true;
        }
      }
      if (realDate1.getTime() >= date.getTime() || date.getTime() >= realDate2.getTime()) {

        return true;
      }
    }
    if (Number(this.selectedFilteredValue) === 2 && this.filterStatus ) {
      const realNumber1 = Number(this.inputCheck1);
      const realNumber2 = Number(this.inputCheck2);
      if (this.inputCheck1   === undefined) {
        if ( realNumber2 < averageScore) {
          return true;
        }
      }
      if (this.inputCheck2  === undefined) {
        if ( realNumber1 > averageScore  ) {
          return true;
        }
      }
      if (realNumber1 > averageScore || realNumber2 < averageScore) {
        return true;
      }
    }
    return false;
    }

  sortStudents<T>(propName: keyof Student, order: "ASC" | "DESC"): void {
    if (propName === "birthDate") {
      this.students.sort((a, b) => {
        if (a[propName].getTime() < b[propName].getTime()) {
          return -1;
        }
        if (a[propName].getTime() > b[propName].getTime()) {
          return 1;
        }
        return 0;
      });
    } else {


      this.students.sort((a, b) => {
        if (a[propName] < b[propName]) {
          return -1;
        }
        if (a[propName] > b[propName]) {
          return 1;
        }
        return 0;
      });
    }
      if (order === "DESC") {
        this.students.reverse();
      }
    }

  deleteStudent(): void {
    if (Number(this.selectedValue) !== 3 || this.idToDelete === undefined || this.studentIsFound === false ) {
      alert("You need to find user first in order to delete him/her. Check that you have choosen 3 option and entered students id");
      return;
    }
    if (Number(this.selectedValue) === 3 && this.studentIsFound === true) {
      this.studentIsFound = false;
      this.students = this.students.filter(item => item.id !== this.idToDelete);
      alert("Student with Id " + this.idToDelete.toString() + " was deleted! ");
    }
  }

}
