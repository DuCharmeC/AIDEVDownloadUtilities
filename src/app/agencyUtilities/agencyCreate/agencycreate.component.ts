import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
//local dependencies
import { AgencyInformationService } from '../../rest.service'
import { AgencyInt, Hero, AgencyInformation } from '../../models/agency.information.model';

@Component({
  selector: 'app-agencycreate',
  templateUrl: './agencycreate.component.html',
  styleUrls: ['./agencycreate.component.css']
})
export class AgencyCreateComponent implements OnInit {

  //Form Groups 
  public createForm: FormGroup;

  //Form visible  
  isCreateFormDisplayed: boolean = false;
  isIndicatorsFormDisplayed: boolean = false; 

  agencyInformation: AgencyInformation[];

  constructor(private formBuilder: FormBuilder, public agencyService: AgencyInformationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      agencyCode: ['', Validators.required],
      agencyName: [''],
      agencyPreferences: [''],
      suspendDate: [''],
      closeDate: [''],
      ivansYAccount: [''],
      ivansUserId: [''],
      ivansOriginalAddress: [''],
      emailAddress: [''],
      amsProduct: [''],
      amsVersion: [''],
      lastModifiedDate: [''],
      address1: [''],
      address2: [''],
      phoneNumber: [''],
      formalAddress: [''],
      informalAddress: [''],
      destinationAddress: [''],
      contractNumber: [''],
      password: [''],
      messageSeq: [''],
      tranSeq: [''],
      initialLoad: [''],
      format: [''],
      acordCSIOCompression: [''],
      crlf: [''],
      ebcdic: [''],
      communications: ['']
    });
  }

  submitAgencyCreate() {
    this.agencyService.postAgencyCreate(this.createForm.value)
      .subscribe((res: string) => {
        console.log(res);
      });
    this.agencyInformation.values = null;
    this.createForm.reset();
    this.createForm.disable();
  }
  
  showIndicatorsForm() {
    if (this.isCreateFormDisplayed){
      this.isCreateFormDisplayed = false;
      this.isIndicatorsFormDisplayed = true;
    }
  }

  showAgencyCreateForm() {
    if (this.isIndicatorsFormDisplayed){
      this.isCreateFormDisplayed = true;
      this.isIndicatorsFormDisplayed = false;
    } 
  }

  clear() {
  
  }

}
