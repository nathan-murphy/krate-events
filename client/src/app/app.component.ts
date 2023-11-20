import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      margin-top: 1rem;
      width: 30%;
      margin: auto;
    };
  `]
})
export class AppComponent {
  title = 'client';
}
