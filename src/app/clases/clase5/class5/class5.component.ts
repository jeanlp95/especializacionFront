import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClasesService } from '../../clases.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-class5',
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './class5.component.html',
  styleUrl: './class5.component.css'
})
export class Class5Component {
  constructor(private clasesService: ClasesService) {}

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('modelSelect') modelSelect!: ElementRef<HTMLInputElement>;
  @ViewChild('sizeSelect') sizeSelect!: ElementRef<HTMLInputElement>;
  @ViewChild('qualitySelect') qualitySelect!: ElementRef<HTMLInputElement>;
  
  imagenUrl: string = 'https://picsum.photos/500/600';
  isLoading:boolean = false;
  id = crypto.randomUUID();

  async enviarInfo(){
    this.isLoading = true;
    const text = this.messageInput.nativeElement.value.trim();
    const model = this.modelSelect.nativeElement.value;
    const size = this.sizeSelect.nativeElement.value;
    const quality = this.qualitySelect.nativeElement.value;
    console.log("TEXTO A ENVIAR", text, this.id);
    console.log("ELEMENTOS SELECCIONADOS", model, size, quality);
    
    if (!text) return;

    try {
      const response = await this.clasesService.generarImagen(text, this.id, model, size, quality).toPromise();

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
