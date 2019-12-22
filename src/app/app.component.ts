import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AddStudentComponent } from "./add-student/add-student.component";
import { Student } from "./student";


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
      birthDate: new Date("1998-11-1"),
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
      birthDate: new Date("1999-03-01"),
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
      birthDate: new Date("1999-02-11"),
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
      birthDate: new Date("1986-11-11"),
      schedule: "Менеджмент",
      averageScore: 4,
      isBachelor: false,
      hasScholarship: false},
    {
      id: 7,
      name: "Екатерина",
      surname: "Гордиенко",
      patronymic: "Ивановна",
      birthDate: new Date("1997-12-03"),
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
      birthDate: new Date("1995-12-22"),
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
      birthDate: new Date("1999-08-15"),
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
      birthDate: new Date("1999-06-24"),
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
  chosenStudent: Student;
  @Output() sendStudentData:  EventEmitter<Student> = new EventEmitter<Student>();
  foundStudentId: number;

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
      this.foundStudentId = id;
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

  deleteStudent(id: number): void {
    const result = confirm("Вы точно хотите удалить студента?");
    if (result) {
      this.students = this.students.filter(item => item.id !== id);
      alert("Student with Id " + id.toString() + " was deleted! ");
    } else {
      return;
    }
  }

  addStudent(student: Student): void {
  this.students.push(student);

  }

  editStudent(student: Student): void {
const index = this.students.findIndex(currentStudent => currentStudent.id === student.id);
this.students[index] = student;
  }
  editChosenStudent(student: Student): void {
  this.chosenStudent = student;
  }
  trackById(index: number, student: Student): number {
    return student.id;
  }
}
