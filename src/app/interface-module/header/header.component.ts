import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { User } from 'src/app/user-module/User';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';
import { createPopper } from "@popperjs/core";
import { Router } from '@angular/router';
import { ImageService } from 'src/app/images-module/image.service';
import { Image } from 'src/app/images-module/Image';
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
  constructor(private imageService: ImageService, private tokenStorageService: TokenStorageService, private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.userName = JSON.parse(payload).username;
      this.userService.getUserById(JSON.parse(payload).username).subscribe(next => {
        UserService.cache.cache(next);
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
