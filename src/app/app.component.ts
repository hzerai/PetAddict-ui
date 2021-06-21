import { Component } from '@angular/core';
import { AdoptionService } from './adoption-module/adoption/adoption.service';
import { VillesService } from './user-module/villes.service';
import { UserService } from './user-module/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private villesService: VillesService, private adoption : AdoptionService , private user : UserService) { 
    
  }
}
