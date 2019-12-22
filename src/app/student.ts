export class Student {
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
