import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Admin', link: '/admin' },
    { label: 'Posts', link: '/posts' },
    { label: 'Sobre o Autor', link: '/about' },
  ];

  constructor(
    private router: RouterModule

  ) {}


  private onClick() {
    alert('Clicked in menu item');
  }
}
