import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "app/models/UserModel";
import { ThrowStmt } from "@angular/compiler";
import { Observable } from "rxjs";


@Injectable()
export class AdminService {

    constructor(private http_client: HttpClient) {}

    getUsers() {
        return this.http_client.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }

    updateUser(payload: User): Observable<User> {
        return this.http_client.put<User>('', payload);
    }
}