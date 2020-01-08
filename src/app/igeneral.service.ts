import { Observable, Subscription } from "rxjs";
import { Student } from "./student";

export interface IGeneralService {
   getStudents: () => Observable<Student[]>;
   getStudentById: (id: string) => Observable <Student>;
   addStudent: ( student: Student ) => void;
   editStudent: (  student: Student) => void;
   deleteStudent: (  id: number) => Observable<Student[]>;
}
