import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../../model/Facture';
import { FactureService } from '../../Services/Facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {
  @Input() facture:Facture;
  private id:number;
  showLoadingSpinner:boolean = true;
  constructor(public route: ActivatedRoute, private router:Router, private factureService : FactureService) {}


  ngOnInit(): void {
    this.id =+ this.route.snapshot.params['id'];
    this.factureService.getFactureById(this.id).subscribe((res : Facture) => {
      this.facture = res;
      this.showLoadingSpinner = false;
    })
  }
  onOpenModal(f:Facture,type:string){

  }
  onEdit(f:Facture){

  }
  onDelete(){

  }
}
