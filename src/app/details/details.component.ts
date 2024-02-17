import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../core/api.service';
import { Person } from '../core/person';

@Component({
  selector: 'my-details',
  templateUrl: 'details.component.html'
})
export class DetailsComponent {

  public person$: Observable<Person>;

  constructor(
    private _apiService: ApiService,
    private _currentRoute: ActivatedRoute
  ) {
    this.person$ = _apiService.getPerson(_currentRoute.snapshot.params.index);
  }
}