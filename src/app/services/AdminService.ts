import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "app/models/UserModel";


@Injectable()
export class AdminService {

    constructor(private http_client: HttpClient) {}

    getUsers() {
        return this.http_client.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}