import { Component } from '@angular/core';
import {
  PoContainerModule,
  PoPageModule,
  PoInfoModule 
} from '@po-ui/ng-components';

@Component({
  selector: 'app-about',
  imports: [
    PoContainerModule,
    PoPageModule,
    PoInfoModule

  ],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
