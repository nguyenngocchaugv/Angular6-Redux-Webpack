import {Injectable} from "@angular/core";
import {BaseService} from "./BaseService";

@Injectable()
export class GenericService {

        constructor(private http: BaseService) {

        }
}
