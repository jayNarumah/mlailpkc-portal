import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentCateogry } from '../models/student-category.model';

@Injectable({
    providedIn: 'root',
})
export class StudentCategoryEndpoint {
    parentUri = '/student-categories';

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<StudentCateogry[]> {
        return this.httpClient.get<StudentCateogry[]>(`${this.parentUri}/list`);
    }
}
