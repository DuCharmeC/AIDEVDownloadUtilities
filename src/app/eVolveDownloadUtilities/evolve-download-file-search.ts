import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AgencyInformationService } from '../rest.service';
import { xmlInt, AgencyInt } from '../models/agency.information.model';

import { ActivatedRoute } from '@angular/router'
import * as saveAs from 'file-saver';

@Component({
  /*selector: 'app-download-dashboard',*/
  templateUrl: './evolve-download-file-search.html',
  styles: ['./evolve-download-file-search.css']
})
export class EvolveDownloadFileSearch implements OnInit {

  xmlStringInt: xmlInt
  xmlString : string;
  agencies : AgencyInt[];

  myForm: FormGroup;
    //submitted = false;

  constructor(public agencyService: AgencyInformationService, private route: ActivatedRoute, fb: FormBuilder) { 
    //this.createForm();
    this.myForm = fb.group({  
      'externalReference': ['SBW0004672']  
    });  
  }
  

  ngOnInit(): void {
  }

  transactionPayloadByExternalRef(externalReference: string): void {
    externalReference = externalReference.trim();
    if (!externalReference) { return; }
    this.agencyService.postTransactionPayloadByExternalRef(externalReference)
      .subscribe(agency => 
        //this.agencies.push(agency);
        this.xmlString = agency
      );
  }

  postTransactionPayloadByExternalRef(externalReference: string): void {
    //externalReference = externalReference.trim();
    if (!externalReference) { return; }
    this.agencyService.postTransactionPayloadByExternalRef(externalReference)
      .subscribe(xml => 
        //this.agencies.push(agency);
        this.xmlString = xml
      );
  }

  getTransactionPayloadByExternalRef(): void {
    this.agencyService.getTransactionPayloadByExternalRef()
    .subscribe(xmlString => this.xmlStringInt = xmlString);
  }


  onSubmit(externalReference: string){
    //this.submitted = true;
    this.postTransactionPayloadByExternalRef(externalReference);       
  }
  onReset() {
    //this.submitted = false;
    this.myForm.reset();
  }

  SaveDemo() {  
    let file = new Blob([this.xmlString], { type: 'text/xml' });
    saveAs(file, 'ACORD.xml')
  }

}
