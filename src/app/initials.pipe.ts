import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "initials"
})
export class InitialsPipe implements PipeTransform {
  transform(name: string, surname: string, patronymic: string ): string {
  return surname + " " + name[0] + "." + patronymic[0];
  }
}
