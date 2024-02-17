import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiresponsiveDataComponent } from './library/miresponsive-data/miresponsive-data.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MiresponsiveDataComponent,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UiDataList';
  data=[
    {name:'carlos', edad:36, action:()=>{}},
    {name:'Juan', edad:36, action:()=>{}},
    {name:'Leonardo', edad:36, action:()=>{}}
  ];

  ngOnInit(): void {

    this.data.forEach(e=>{
      e.action = ()=> this.delete(e);
    })
    console.log(this.data)
  }


  delete(e:any){console.log('ok',e)
let indice = this.data.indexOf(e);
console.log(indice)
this.data.splice(indice,1)
  this.data = this.data.map(e=>e)
  }


}
