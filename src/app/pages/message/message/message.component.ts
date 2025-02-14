import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMessage } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../models/user.model';
import { ImageService } from '../../../services/image.service';
import { environment } from '../../../../environements/environement';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @ViewChild('chatBox') private chatBox!: ElementRef;

  conversations: IUser[] = [];
  messages: IMessage[] = [];
  selectedUser: IUser | null = null;
  newMessage: string = ''; 
  currentUser: IUser | null = null;

  constructor(
    private messageService: MessageService, 
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadConversations();
    this.currentUser = this.authService.getUser(); 
    
  }

  // ✅ Charger les utilisateurs avec qui on a discuté
  loadConversations() {
    this.messageService.getUserConversations().subscribe(users => {
        users.forEach(user => {
            if (user.image && user.image.id) {
                this.imageService.getImageUrlById(user.image.id).subscribe(url => {
                    console.log(`🖼️ Image récupérée pour ${user.firstname} :`, url);
                    if (user.image) {
                        user.image.name = url;  
                    }
                });
            }
        });

        console.log("👥 Utilisateurs récupérés :", users);
        this.conversations = users;
    });
}

  

  // ✅ Charger les messages d'un utilisateur sélectionné
  selectUser(user: IUser) {
    this.selectedUser = user;
    console.log("📩 Chargement des messages pour :", user.firstname, user.lastname);

    this.messageService.getMessages(this.currentUser!.id!, user.id!).subscribe(messages => {
        console.log("✅ Messages récupérés :", messages);
        
        this.messages = messages.sort((a, b) => 
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );

        setTimeout(() => this.scrollToBottom(), 100);
    });
}

  
  
  // ✅ Envoyer un message
  sendMessage() {
    if (this.selectedUser && this.newMessage.trim() !== '') {
      const message: IMessage = {
        sender: this.currentUser!,
        receiver: this.selectedUser,
        content: this.newMessage
      };

      this.messageService.sendMessage(message).subscribe((msg) => {
        this.messages.push(msg);
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 100);
      });
    }
  }

  // ✅ Défilement automatique vers le bas
  private scrollToBottom() {
    if (this.chatBox) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }
  getUserImage(user: IUser): string {
    if (user.image && user.image.name) {
      console.log(`🖼️ Image URL pour ${user.firstname}: ${environment.baseUrl}/${environment.assetsImages}${user.image.name}`);
      return `${environment.baseUrl}/${environment.assetsImages}${user.image.name}`;
    }
    console.log(`⚠️ Aucun avatar pour ${user.firstname}, utilisation de l'image par défaut`);
    return 'assets/Icones/default-image.jpg'; 
  }
  
}
