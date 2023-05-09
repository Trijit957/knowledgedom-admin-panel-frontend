import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StudentResponseInterface } from './students.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private readonly apiBasePath = environment.apiDomainPath;

  constructor(
    private http: HttpClient
  ) { }

  public getStudents(params: {page: number; pageSize: number}): Observable<StudentResponseInterface> {
    console.log(params)
      return this.http.get<StudentResponseInterface>(
        `${this.apiBasePath}/Api/StudentApi/GetStudents?page=${params.page}&pageSize=${params.pageSize}`
      )
  }


}
