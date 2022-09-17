import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { LoadingComponent } from '../../ui/loading/loading.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from '../../components/components.module';
import { DevisTableComponent } from '../../devis-table/devis-table.component';
import { BCTableComponent } from '../../table-components/bc-table/bc-table.component';
import { BonCommandeComponent } from '../../table-components/bon-commande/bon-commande.component';
import { BonLivraisonComponent } from '../../table-components/bon-livraison/bon-livraison.component';
import { DevisDetailsComponent } from '../../devis-details/devis-details.component';
import { FactureDetailsComponent } from '../../table-components/facture-details/facture-details.component';
import { BLTableComponent } from '../../table-components/bl-table/bl-table.component';
import { UsersTableComponent } from '../../users-table/users-table.component';
import { ClientDetailsComponent } from '../../table-components/client-details/client-details.component';
import { ClientDevisComponent } from '../../table-components/client-devis/client-devis.component';
import { ClientBcComponent } from '../../table-components/client-bc/client-bc.component';
import { ClientBlComponent } from '../../table-components/client-bl/client-bl.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    DataTablesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    DevisTableComponent,
    DevisDetailsComponent,
    BonCommandeComponent,
    BonLivraisonComponent,
    FactureDetailsComponent,
    BCTableComponent,
    BLTableComponent,
    UsersTableComponent,
    ClientDetailsComponent,
    ClientDevisComponent,
    ClientBcComponent,
    ClientBlComponent,
  ],
  providers: [
    LoadingComponent,
  ],
  exports:[LoadingComponent,
  ]
})

export class AdminLayoutModule {}
