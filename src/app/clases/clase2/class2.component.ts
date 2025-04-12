import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesService } from '../clases.service';

@Component({
  selector: 'app-class2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class2.component.html',
  styleUrl: './class2.component.css'
})
export class Class2Component {
  constructor(private renderer: Renderer2) {}
  private clasesService = inject(ClasesService);

  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('languageSelect') languageSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  
  uid: string = 'user123'; // Reemplaza con el UID real del usuario
  responseNumber: number = 0;

  // ngOnInit(): void {
  //   this.clasesService
  //     .sendTextToBackend('este es un test', "ingles", "DASIODAI2NOINA")
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Response from backend:', response);
  //       },
  //       error: (error) => console.error('Error sending text:', error),
  //     });
  // }

  async sendMessage(): Promise<void> {
    const text = this.messageInput.nativeElement.value.trim();
    if (!text) return;
    
    // Mostrar mensaje enviado inmediatamente
    this.addMessage(text, 'sent');
    this.messageInput.nativeElement.value = '';
    
    try {
      // Enviar al backend para traducción
      this.addMessage('Esperando respuesta...', 'received', this.responseNumber.toString());
      const response = await this.clasesService.sendTextToAssintant(text, this.uid).toPromise();

      console.log("respuesta del servidor", response);
      
      if (response && response.respuesta) {
        // Mostrar la traducción recibida
        // this.addMessage(response.respuesta, 'received');
        this.UpdateMessage(response.respuesta, this.responseNumber.toString());
        this.responseNumber++;
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      this.addMessage('Error al enviar el mensaje', 'received');
    }
  }

  private UpdateMessage(text: string, id: string){
    const messageDiv = document.getElementById(id);
    if (messageDiv) {
      const textContainer = messageDiv.querySelector('.messageRecieved');
      if (textContainer) {
        textContainer.textContent = text;
      }
    }
  };

  private addMessage(text: string, type: 'sent' | 'received', id?: string): void {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    if (!!id) {
      messageDiv.id = id;
    };
    
    // Contenedor del texto del mensaje
    const textContainer = document.createElement('div');
    textContainer.classList.add('messageRecieved');
    textContainer.textContent = text;
    textContainer.style.textAlign = type === 'sent' ? 'right' : 'left';
    messageDiv.appendChild(textContainer);
    
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

}