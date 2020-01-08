import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "./http.service";
import { IGeneralService } from "./igeneral.service";
import { StudentsHardcodedService } from "./students-hardcoded.service";

@Injectable()
export class GeneralService {
  constructor (
    private _httpService: HttpService,
    private _hardcodedService: StudentsHardcodedService,
    public state: number) {
    this.state = state;
  }

  public get instance(): IGeneralService {
    if (this.state === 1) {
      return this._httpService;
    }
    return this._hardcodedService; }
}

