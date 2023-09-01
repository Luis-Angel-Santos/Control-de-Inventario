import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  media = Inject(MediaMatcher);
  mobileQuery: MediaQueryList;

  constructor(){
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

}
