import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Message } from '../messages-module/Message';
import { MessageService } from '../messages-module/message.service';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css']
})
export class VisitProfileComponent implements OnInit {
  currentUser: User;
  user: User;
  messageBody: string = '';
  showMessageform: boolean = false;
  image: Image;


  constructor(private imageService: ImageService, private messages: MessageService, private activatedRoute: ActivatedRoute, private userService: UserService, private tokenService: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data.data.sameUser) {
        this.route.navigate(['/user_profile']);
      }
      this.user = data.data.user;
      this.currentUser = data.data.currentUser;     
      this.imageService.getImage('USER-' + data.data.user.id).subscribe(next => this.image = next);
    });
  }

  sendMessage() {
    let message: Message = new Message();
    message.body = this.messageBody;
    message.fromUser = this.currentUser.email;
    message.toUser = this.user.email;
    this.messages.sendMessage(message).subscribe(next => message = next);
    this.showMessageform = !this.showMessageform;
  }

}
