import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentCateogry } from '../models/student-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StudentCategoryEndpoint {
    parentUri = `${environment.apiUrl}/student/student-categories`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<{ data: StudentCateogry[] }> {
        return this.httpClient.get<{ data: StudentCateogry[] }>(`${this.parentUri}/list`);
    }
}
