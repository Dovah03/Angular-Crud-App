import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { DevisTableComponent } from '../../devis-table/devis-table.component';
import { DevisDetailsComponent } from '../../devis-details/devis-details.component';
import { BonCommandeComponent } from '../../table-components/bon-commande/bon-commande.component';
import { BonLivraisonComponent } from '../../table-components/bon-livraison/bon-livraison.component';
import { FactureDetailsComponent } from '../../table-components/facture-details/facture-details.component';
import { BCTableComponent } from '../../table-components/bc-table/bc-table.component';
import { BLTableComponent } from '../../table-components/bl-table/bl-table.component';
import { UsersTableComponent } from '../../users-table/users-table.component';
import { ClientDetailsComponent } from '../../table-components/client-details/client-details.component';
import { ClientDevisComponent } from '../../table-components/client-devis/client-devis.component';
import { ClientBcComponent } from '../../table-components/client-bc/client-bc.component';
import { ClientBlComponent } from '../../table-components/client-bl/client-bl.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'devis-table', component: DevisTableComponent },
    { path: 'devis-table/:id', component: DevisDetailsComponent },
    { path: 'BC', component: BCTableComponent },
    { path: 'BC/:id', component: BonCommandeComponent },
    { path: 'BL', component: BLTableComponent },
    { path: 'BL/:id', component: BonLivraisonComponent },
    { path: 'facture/:id', component: FactureDetailsComponent },
    { path: 'Clients', component: UsersTableComponent },
    { path: 'Client/:id', component: ClientDetailsComponent },
    { path: 'Client-devis', component: ClientDevisComponent },
    { path: 'Client-BC', component: ClientBcComponent },
    { path: 'Client-BL', component: ClientBlComponent },
];
