import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VillesService } from './user-module/villes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private villesService: VillesService,public router: Router) { 
    
  }
  
}
