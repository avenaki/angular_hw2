import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GeneralService } from "./general.service";
import { HttpService } from "./http.service";
import { Student } from "./student";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
 changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements  OnInit {

  public students: Student[];
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

  @Output() sendStudentData: EventEmitter<Student> = new EventEmitter<Student>();
  foundStudentId: number;

  constructor(private httpService: HttpService, private cdr: ChangeDetectorRef,
               private router: Router, private generalService: GeneralService) {
    this.router.events.subscribe((val) => {
      if (  val["url"] === "/") { this.getStudentsList(); }
    });
  }
  switchShowFStudents(): void {
    this.status = !this.status;
  }

  ngOnInit(): void {
   this.getStudentsList();
  }
  correctTypesInList(list: Student[]): Student[] {
    list.forEach( student => student.birthDate = new Date(student.birthDate));
    return list;
  }
getStudentsList(): void {
  this.generalService.instance.getStudents().subscribe(res => {
    this.students = res;
   this.saveToLocalStorage(this.students);
   this.students = this.correctTypesInList(this.students);
    this.cdr.markForCheck();
  });

}

  saveToLocalStorage(students: Student[]): void {
    students.forEach( (student) => {
      localStorage.setItem(student.studNumber.toString(), student.averageScore.toString());
    });
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
    if (Number(this.selectedFilteredValue) === 1 && this.filterStatus) {
      const realDate1 = new Date(this.inputCheck1);
      const realDate2 = new Date(this.inputCheck2);
      if (this.inputCheck1 === undefined) {
        if (date.getTime() >= realDate2.getTime()) {
          return true;
        }
      }
      if (this.inputCheck2 === undefined) {
        if (realDate1.getTime() >= date.getTime()) {
          return true;
        }
      }
      if (realDate1.getTime() >= date.getTime() || date.getTime() >= realDate2.getTime()) {

        return true;
      }
    }
    if (Number(this.selectedFilteredValue) === 2 && this.filterStatus) {
      const realNumber1 = Number(this.inputCheck1);
      const realNumber2 = Number(this.inputCheck2);
      if (this.inputCheck1 === undefined) {
        if (realNumber2 < averageScore) {
          return true;
        }
      }
      if (this.inputCheck2 === undefined) {
        if (realNumber1 > averageScore) {
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
    this.generalService.instance.deleteStudent(id).subscribe(res => {
      this.getStudentsList();
 });

      alert("Student with Id " + id.toString() + " was deleted! ");
    } else {
      return;
    }
  }
  trackById(index: number, student: Student): number {
    return student.studNumber;
  }

  calculateTendency(currentScore: number, previousScore: number): number {
    if (currentScore > previousScore) {
      return 2;
    }
    if (currentScore < previousScore) {
      return 1;
    }
    return 0;
  }


  navigateToEditForm(studNumber: number): void {
    this.router.navigate(["edit", studNumber]); }

}
