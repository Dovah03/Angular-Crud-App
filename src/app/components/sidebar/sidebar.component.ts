import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
   // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
   // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/user-profile', title: 'Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table Utilisateurs',  icon:'users_circle-08', class: '' },
    { path: '/Clients', title: 'Clients',  icon:'users_circle-08', class: '' },
    { path: '/devis-table', title: 'Devis',  icon:'files_single-copy-04', class: '' },
    { path: '/BC', title: 'Bons de Commande',  icon:'education_paper', class: '' },
    { path: '/BL', title: 'Bons de Livraison',  icon:'shopping_delivery-fast', class: '' }, //design_bullet-list-67
    { path: '/Client-devis', title: 'Mes Devis',  icon:'files_single-copy-04', class: '' },
    { path: '/Client-BC', title: 'Mes B.C',  icon:'education_paper', class: '' },
    { path: '/Client-BL', title: 'Mes B.L',  icon:'shopping_delivery-fast', class: '' },

   // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  role : string;
  userPrincipalSub: Subscription;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userPrincipalSub = this.userService.user$.subscribe(user => {
      this.role = user.role;
      console.log(this.role)
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      if(this.role == 'ROLE_ADMIN'){
        this.menuItems.splice(3,7);
      }
      else if(this.role == 'ROLE_MODERATOR'){
      this.menuItems.splice(2,1);
      this.menuItems.splice(6,3);
    }
    else if(this.role == 'ROLE_USER'){
      this.menuItems.splice(2,5);
    }
    });


  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userPrincipalSub.unsubscribe();
  }
}
