import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, AfterViewChecked } from '@angular/core';
import { User } from 'src/app/user-module/User';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';
import { createPopper } from "@popperjs/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/images-module/image.service';
import { Image } from 'src/app/images-module/Image';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { MessageService } from 'src/app/user-module/messages-module/message.service';
import { HeaderUserResolver } from 'src/app/Resolvers/HeaderUserResolver';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  user?: User;
  navbarheight = 0;
  image: Image;
  userName: string;
  unreadMessages: boolean = false;

  constructor(private hr: HeaderUserResolver, private ms: MessageService, private ws: WebSocketService, private imageService: ImageService, private tokenStorageService: TokenStorageService, private userService: UserService, public router: Router, private ac: ActivatedRoute) { }


  resetUM() {
    this.unreadMessages = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.hr.getCurrentUser()?.then((user) => {
        this.user = user;
        this.userName = this.user.email;
        this.imageService.getImage(`USER-${user.id}`).subscribe(next => { this.image = next });
        this.ws.watch('messagesforheader' + this.userName).subscribe(msg => {
          if (!this.router.url.includes('user_profile')){
            this.unreadMessages = true;
          }
        })
      });
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  @ViewChild("navbar", { static: false }) navbar: ElementRef;

  ngAfterViewInit() {
    this.navbarheight = this.navbar.nativeElement.clientHeight + 30;

    if (this.isLoggedIn) {
      this.ms.getNewMessages().subscribe(next => {
        if (next && next.length > 0) {
          this.unreadMessages = true;
        }
      })      
    }

  }
   
  showLostAndFound:boolean=false;
  showAssosEtVets:boolean=false;
  showAdoptionDD:boolean=false;
}
