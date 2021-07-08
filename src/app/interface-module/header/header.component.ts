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
  constructor(private ms: MessageService, private ws: WebSocketService, private imageService: ImageService, private tokenStorageService: TokenStorageService, private userService: UserService, public router: Router, private ac: ActivatedRoute) { }


  resetUM() {
    this.unreadMessages = false;
  }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.userName = JSON.parse(payload).username;
      this.userService.getUserById(JSON.parse(payload).username , null).subscribe(next => {
        this.user = next;
        this.imageService.getImage(`USER-${next.id}`).subscribe(next => { this.image = next });
      });
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef: ElementRef;
  @ViewChild("navbar", { static: false }) navbar: ElementRef;

  ngAfterViewInit() {
    this.navbarheight = this.navbar.nativeElement.clientHeight + 30;

    createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: "bottom",
      }
    );

    this.ms.getNewMessages().subscribe(next => {
      if (next && next.length > 0) {
        this.unreadMessages = true;
      }
    })
    this.ws.watch('messagesforheader' + this.userName).subscribe(msg => {
      if (!this.router.url.includes('user_profile'))
        this.unreadMessages = true;
    })
  }
  dropdownPopoverShowS = false;
  toggleTooltipS() {
    this.dropdownPopoverShowS = !this.dropdownPopoverShowS;
  }

  dropdownPopoverShowM = false;
  toggleTooltipM() {
    this.dropdownPopoverShowM = !this.dropdownPopoverShowM;
  }

  dropdownPopoverShowZ = false;
  toggleTooltipZ() {
    this.dropdownPopoverShowZ = !this.dropdownPopoverShowZ;
  }
}
