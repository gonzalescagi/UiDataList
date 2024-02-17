import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { ContentChild } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-miresponsive-data',
  standalone: true,
  imports: [MiresponsiveDataComponent,NgTemplateOutlet,CommonModule
],
  templateUrl: './miresponsive-data.component.html',
  styleUrls: ['./miresponsive-data.component.css']
})
export class MiresponsiveDataComponent implements OnInit {

  @Input() plantilla:any;
  @Input() base!:TemplateRef<any>;
  @Input() dataList:any;
  //@ViewChild('action') action: TemplateRef<any>;
  @ContentChild('action') action!: TemplateRef<any>;
  @ContentChild('content') content!: TemplateRef<any>;


   startX = 0;
   currentX = 0;
   isSwiping = false;
   threshold = 1000;

  constructor() {
   
  }

  ngOnInit() {
    console.log('==>', this.plantilla)
  }

  ngAfterViewInit(){

  }

   iniciarDeslizamiento(e: MouseEvent | TouchEvent,indice: number): void {
    const elemento = e.target as HTMLElement;
    console.log('**')
    if (elemento.classList.contains('elemento')) {
      this.startX = this.getClientX(e);
      this.isSwiping = true;

      elemento.addEventListener('mousemove', (event) => this.moverElemento(event, elemento));
      elemento.addEventListener('touchmove', (event) => this.moverElemento(event, elemento));

      elemento.addEventListener('mouseup', () => this.finalizarDeslizamiento(elemento,indice));
      elemento.addEventListener('touchend', () => this.finalizarDeslizamiento(elemento,indice));
    }
  }

  private moverElemento(e: MouseEvent | TouchEvent, elemento: HTMLElement): void {
    if (this.isSwiping) {
      this.currentX = this.getClientX(e);
      const offsetX = (this.currentX) - this.startX;
      if (offsetX < 100) {
        elemento.style.transform = `translateX(${offsetX}px)`;
      }
    }
  }

  private finalizarDeslizamiento(elemento: HTMLElement, indice: number): void {
    if (this.isSwiping) {
      const offsetX = this.currentX - this.startX;
      if (offsetX < -this.threshold) {
        elemento.style.transform = 'translateX(-100%)';
        elemento.classList.add('eliminar');
        console.log('elemento', elemento);
        this.dataList.splice(indice, 1);
      } else {
        elemento.style.transform = 'translateX(0)';
      }

      elemento.removeEventListener('mousemove', (event) => this.moverElemento(event, elemento));
      elemento.removeEventListener('touchmove', (event) => this.moverElemento(event, elemento));

      elemento.removeEventListener('mouseup', () => this.finalizarDeslizamiento(elemento,indice));
      elemento.removeEventListener('touchend', () => this.finalizarDeslizamiento(elemento,indice));

      this.startX = 0;
      this.currentX = 0;
      this.isSwiping = false;
    }
  }

 getClientX(e: MouseEvent | TouchEvent): number {
    return e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  }

}