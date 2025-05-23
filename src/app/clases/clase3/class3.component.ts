import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClasesService } from '../clases.service';

@Component({
  selector: 'app-class3',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './class3.component.html',
  styleUrl: './class3.component.css'
})

export class Class3Component {
  constructor(private clasesService: ClasesService) {}

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  
  imagenUrl: string = 'https://picsum.photos/500/600';
  isLoading:boolean = false;
  id = crypto.randomUUID();

  async enviarInfo(){
    this.isLoading = true;
    const text = this.messageInput.nativeElement.value.trim();
    console.log("TEXTO A ENVIAR", text, this.id);
    
    if (!text) return;

    try {
      const response = await this.clasesService.generarImagen(text, this.id).toPromise();

      console.log("respuesta del servidor", response);

      if (response && response.urlImagen) {
        this.imagenUrl = response.urlImagen;
        this.isLoading = false;
      }else{
        this.isLoading = false;
      }
      
    } catch (error) {
      console.error('Error al generar imagen:', error);
    }

  }

}