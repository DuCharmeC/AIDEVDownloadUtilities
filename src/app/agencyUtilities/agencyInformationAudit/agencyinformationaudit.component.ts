import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { AgencyInformationService } from '../../rest.service'
import { AgencyInt, Hero, AgencyInformation } from '../../models/agency.information.model';

@Component({
  selector: 'app-agencyinformationaudit',
  templateUrl: './agencyinformationaudit.component.html',
  styleUrls: ['./agencyinformationaudit.component.css']
})
export class AgencyInformationAuditComponent implements OnInit {
  agencies : AgencyInt[];
  agencyInformation: AgencyInformation[];
  editField : string;
  constructor(public agencyService: AgencyInformationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submit4(agencyCode: string): void {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    this.agencyService.postaidevutilities3(agencyCode)
      .subscribe(agency => {
        this.agencies.push(agency);
        console.log(this.agencies[0].agencyCode)
      });
  }
  
  
  /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.agencyService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  } */
  postAgencyInformationAudit(agencyCode: string): void {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    console.log('postAgencyInformationAudit');
    this.agencyService.postAidevUtilities(agencyCode)
      .subscribe(agency => 
        //this.agencies.push(agency);
        this.agencies = agency
      );
  }

  postAgencySearch(agencyCode: string): void {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    console.log('postAgencyInformationSearch');
    this.agencyService.postAgencyInformationSearch(agencyCode)
      .subscribe(agency =>
        this.agencyInformation = agency
        );
  }
  /*
  getHeroes(): void {
    this.agencyService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }*/
  
  getAgencies(): void {
    this.agencyService.getAgencies()
    .subscribe(agencies => this.agencies = agencies);
  }
  
  //Clear 
  clearaidevutilities(): void {
    this.agencies = [];
  }

  onSubmit() {

  }
  
  agencyWasSelected(agency: AgencyInt): void {
    console.log('Agency selected: ', agency);
  }

  updateList(property: string, event: any) {
    const editField = event.target.textContent;
    console.log(editField);
    this.agencies[0].agencyCode = editField;
  }

  changeValue(property: string, event: any) {
    this.editField = event.target.textContent;
    this.agencies[0].agencyCode = this.editField;
    console.log(this.agencies[0].agencyCode);
  }
}
