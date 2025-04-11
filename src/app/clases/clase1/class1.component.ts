import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesService } from '../clases.service';

@Component({
  selector: 'app-class1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class1.component.html',
  styleUrls: ['./class1.component.css'],
})
export class Class1Component implements OnInit {
  constructor(private renderer: Renderer2) {}
  private clasesService = inject(ClasesService);

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('languageSelect') languageSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  
  uid: string = 'user123'; // Reemplaza con el UID real del usuario

  ngOnInit(): void {
    this.clasesService
      .sendTextToBackend('este es un test', "ingles", "DASIODAI2NOINA")
      .subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
        },
        error: (error) => console.error('Error sending text:', error),
      });
  }

  async sendMessage(): Promise<void> {
    const text = this.messageInput.nativeElement.value.trim();
    if (!text) return;

    const language = this.languageSelect.nativeElement.value;
    
    // Mostrar mensaje enviado inmediatamente
    this.addMessage(text, 'sent', language);
    this.messageInput.nativeElement.value = '';
    
    try {
      // Enviar al backend para traducción
      const response = await this.clasesService.sendTextToBackend(text, language, this.uid).toPromise();
      
      if (response && response.traduccion) {
        // Mostrar la traducción recibida
        this.addMessage(response.traduccion, 'received', language);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      this.addMessage('Error al enviar el mensaje', 'received', language);
    }
  }

  private addMessage(text: string, type: 'sent' | 'received', language: string): void {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    
    // Contenedor del texto del mensaje
    const textContainer = document.createElement('div');
    textContainer.classList.add('messageRecieved');
    textContainer.textContent = text;
    textContainer.style.textAlign = type === 'sent' ? 'right' : 'left';
    messageDiv.appendChild(textContainer);
    
    // Info del idioma solo para mensajes recibidos
    if (type === 'received') {
      const langInfo = document.createElement('div');
      langInfo.style.fontSize = '0.75em';
      langInfo.style.color = '#666';
      langInfo.style.marginTop = '4px';
      langInfo.style.textAlign = 'left';
      langInfo.textContent = `Traducción al ${this.getLanguageName(language)}`;
      messageDiv.appendChild(langInfo);
    }
    
    // Hora del mensaje
    const timeInfo = document.createElement('div');
    timeInfo.style.fontSize = '0.7em';
    timeInfo.style.color = '#666';
    timeInfo.style.marginTop = '2px';
    timeInfo.style.textAlign = type === 'sent' ? 'right' : 'left';
    
    const now = new Date();
    timeInfo.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.appendChild(timeInfo);
    
    this.messagesContainer.nativeElement.appendChild(messageDiv);
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }

  private getLanguageName(code: string): string {
    switch(code) {
      case 'en': return 'Inglés';
      case 'es': return 'Español';
      case 'fr': return 'Francés';
      default: return code;
    }
  }
}