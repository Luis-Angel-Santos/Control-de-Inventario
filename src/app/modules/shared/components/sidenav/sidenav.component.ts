import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  media = inject(MediaMatcher);
  mobileQuery: MediaQueryList;

  constructor(){
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

}
