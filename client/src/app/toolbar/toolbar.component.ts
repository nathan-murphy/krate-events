import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
})
export class ToolbarComponent {

  constructor(public router: Router) {
    
  }

  onNavToPotlucks() {
    this.router.navigate(['/potlucks']);
  }

  onNewPotluck() {
    this.router.navigate(['/potlucks/new'])
  }

  onManageUsers() {
    this.router.navigate(['/users'])
  }

}
