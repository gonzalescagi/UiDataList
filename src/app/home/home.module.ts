import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableModule } from '../table';

import { HomeComponent } from './home.component';
import { routes } from './home.router';
import { MiresponsiveDataComponent } from '../miresponsive-data/miresponsive-data.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    
  ],
  declarations: [
    HomeComponent,
    MiresponsiveDataComponent
  ]
})
export class HomeModule {}