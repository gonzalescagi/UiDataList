import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiAnswer } from '../core/api-answer';
import { Person } from '../core/person';
import { DataTable, Config, PageRequest } from '../table';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'my-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  private static defaulPageSize = 5;
  private static defaultPage = 0;

  public config$: Observable<Config>;
  public data$: Observable<DataTable<Person>>;

  public data = [
    {name:'Carlos Gonzales Cotrina', edad: 36},
    {name:'lara y lara', edad: 25},
    {name:'Pedro picapiedra', edad: 1200},

  ]

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {
    this.config$ = this._apiService.getConfig();
    this.data$ = this._apiService.getData(HomeComponent.defaulPageSize, HomeComponent.defaultPage)
    .pipe(
      map(this._createDataTable)
    );
  }

  private _createDataTable(answer: ApiAnswer<Person>): DataTable<Person> {
    const currentPage = Math.ceil(answer.offset / answer.limit) + 1;
    const lastPage = Math.ceil(answer.total / answer.limit);
    const result: DataTable<Person> = {
      pageActual: currentPage,
      lastPage: lastPage,
      data: answer.result
    }

    return result;
  }

  public updateTable (pageRequest: PageRequest) {
    this.data$ = this._apiService.getData(pageRequest.size, (pageRequest.page * pageRequest.size))
    .pipe(
      map(this._createDataTable)
    );
  }

  public goDetails(index: number) {
    this._router.navigateByUrl(`details/${index}`);
  }
}