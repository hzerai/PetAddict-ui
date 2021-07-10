import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../user-module/_services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/');
  }

}
