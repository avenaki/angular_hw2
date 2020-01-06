export class Student {
  studNumber: number;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: Date;
  schedule: string;
  averageScore: number;
  previousAverageScore: number;
  isBachelor: boolean;
  hasScholarship: boolean;
  constructor(studNumber: number, name: string, surname: string, patronymic: string, birthDate: Date,
              schedule: string, averageScore: number, previousAverageScore: number,  isBachelor: boolean, hasScholarship: boolean ) {
    this.studNumber = studNumber;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthDate = birthDate;
    this.schedule = schedule;
    this.averageScore = averageScore;
    this.previousAverageScore = previousAverageScore;
    this.isBachelor = isBachelor;
    this.hasScholarship = hasScholarship;
  }
}
