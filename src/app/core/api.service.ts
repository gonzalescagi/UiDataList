import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Person } from './person';
import { Config } from '../table';
import { configColumns } from './config';
import { data } from './data';
import { ApiAnswer } from './api-answer';

@Injectable()
export class ApiService {

  public getConfig(): Observable<Config> {
    return Observable.of(configColumns);
  }

  public getData(limit: number, offset: number): Observable<ApiAnswer<Person>> {

    return Observable.of(data)
    .pipe(
      map((data: Person[]) => {
        const result: ApiAnswer<Person> = {
          limit: limit,
          offset: offset,
          total: data.length,
          result: data.slice(offset, (limit + offset))
        }

        return result;
      })
    );
  }

  public getPerson(index: number): Observable<Person> {
    return Observable.of((data[index] as Person));
  }
}