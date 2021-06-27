import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { User } from 'src/app/user-module/User';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';
import { createPopper } from "@popperjs/core";
import { NotificationService } from 'src/app/user-module/notification-module/notification.service';
import { Notification } from 'src/app/user-module/notification-module/Notification';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  user?: User;
  navbarheight=0;


  constructor(private tokenStorageService: TokenStorageService, private userService: UserService,public router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.userService.getUserById(JSON.parse(payload).username).subscribe(next => {
        this.user = next;
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
    this.navbarheight=this.navbar.nativeElement.clientHeight+30;

    createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: "bottom",
      }
    );
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
