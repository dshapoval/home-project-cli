import { Component, HostListener, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { debounce } from '../shared/decorators/debounce';
import { Links } from './links';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('showMainMenu', [
      state('open', style({height: '*', 'max-height': '*'})),
      state('close', style({height: '0', overflow:'hidden'})),
      transition('* => *', [animate('.275s ease-out') ])
    ]),
    trigger('showActiveCategory', [
      state('true', style({height: '*', 'max-height': '*'})),
      state('false', style({height: '0', overflow:'hidden'})),
      transition('* => *', [animate('.3s ease-out') ])
    ])
  ]

})
export class HeaderComponent implements OnInit {
  public links: Array<Links>;

  public mainMenuState: string;
  public isMainMenuShown: boolean = true;
  public isDesktop: boolean = true;
  public isSignIn: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.links = this.getLinks();
  }

  ngOnInit() {
    this.getDeviceType();
    this.isSignIn = this.userService.isAuth();
    this.userService.isAuth$.next(this.isSignIn);
  }
  public getLinks(): Array<Links> {
    return [
      {path: 'main/home', label: 'Главная', index: 0},
      {path: 'main/subscriptions', label: 'Подписки', index: 1},
      {path: 'main/liked', label: 'Понравившиеся', index: 2},
      {path: 'main/recommendations', label: 'Популярные', index: 3},
      {path: 'main/watch-later', label: 'Поиск', index: 4},
    ];
  }
  public setMainMenuState(): void {
    this.mainMenuState = !this.isDesktop && this.isMainMenuShown ? 'close' : 'open';
  }
  public showHideMainMenu(): void {
    this.isMainMenuShown = !this.isMainMenuShown;
    this.setMainMenuState();
  }

  public getDeviceType(): void {
      this.isDesktop = window.innerWidth > 800;
      this.setMainMenuState();
  }

  public singOut(): void {
    this.userService.signOut();
  }

  @HostListener('window:resize')
  @debounce(100)
  onResize() {
    this.getDeviceType();
  }
}
