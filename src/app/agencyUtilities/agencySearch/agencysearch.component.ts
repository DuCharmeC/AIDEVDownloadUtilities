import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
//local dependencies
import { AgencyInformationService } from '../../rest.service'
import { AgencyInt, Hero, AgencyInformation } from '../../models/agency.information.model';
import { AgencyIndicators, Topic } from '../../models/agency.indicators.model';


@Component({
  selector: 'app-agencysearch',
  templateUrl: './agencysearch.component.html',
  styleUrls: ['./agencysearch.component.css']
})
export class AgencySearchComponent implements OnInit {
  //Form Groups
  public searchForm: FormGroup;
  public editForm: FormGroup;
  public indicatorsForm: FormGroup;

  //Form visible
  isEditFormDisplayed: boolean = false;
  isIndicatorsFormDisplayed: boolean = false; 

  agencyInformation: AgencyInformation[];
  agencyIndicators: AgencyIndicators[];
  _topics: Topic;
  editField : string;
  indicatorsList: [ 'commercialPackageAnnual', 'commercialPackageMultiYear', 'commercialEdocsPolicyPdf', 
  'commercialEdocsOden', 'commercialOdenEmessagesOnly', 'crimeAndInlandMarine', 'commercialWorkersCompensation', 'customerCarePackageAnnual'];

  constructor(private formBuilder: FormBuilder, public agencyService: AgencyInformationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
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
    })

    this.searchForm = this.formBuilder.group({
      agencyCode: ['', Validators.required]
    })

    this.indicatorsForm = this.formBuilder.group({
      name: [''],
      transactionTypes: [''],
      topics: [''],
      multiyear: [''],
      documentFormat: ['']
    })
    //service call 
    //this.user = this.agencyService.loadUser();
  }

  //convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  //Search for an agency via agency code
  submitAgencySearch(agencyCode: string) {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    console.log('postAgencyInformationSearch');
    this.agencyService.postAgencyInformationSearch(agencyCode)
      .subscribe((res: AgencyInformation[]) => {
        console.log(res[0]);
          this.editForm.patchValue(res[0]);
          this.agencyInformation = res;
          //Did we receive a valid result?
          if (res[0].agencyCode != null) {
            this.isEditFormDisplayed = true;
            this.editForm.enable();
          }
      });
  }

  //Edit agency information
  submitAgencyEdit() {
    console.log('postAgencyInformationEdit');
    this.agencyService.postAgencyInformationEdit(this.editForm.value)
      .subscribe((res: AgencyInformation[]) => {
          this.editForm.patchValue(res[0]);
      });
    this.agencyInformation.values = null;
    this.editForm.reset();
    this.searchForm.reset();
    this.editForm.disable();
  }

  showAgencyEditForm() {
    if (this.isIndicatorsFormDisplayed){
      this.isEditFormDisplayed = true;
      this.isIndicatorsFormDisplayed = false;
    } 
  }
  //Indicators
  showIndicatorsForm(agencyCode: string) {
    if (this.isEditFormDisplayed){
      this.isEditFormDisplayed = false;
      this.agencyService.postRetrieveAgencyIndicators(agencyCode)
      .subscribe((res: AgencyIndicators[]) => {
        console.log(res[0]);
          this.indicatorsForm.patchValue(res);
          this.agencyIndicators = res;
          if (this.agencyIndicators[0].name != null){
            this.isIndicatorsFormDisplayed = true;
          }
        });
      }
  }
  removeIndicator(indicator: AgencyIndicators) {
  
  }
  onIndicatorNameSelect() {
  this.agencyIndicators = this.indicatorsForm.value;
  }
  //Old
  /*
  submitSearch(agencyCode: string) {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    console.log('postAgencyInformationSearch');
    this.agencyService.postAgencyInformationSearch(agencyCode)
      .subscribe(agency =>
        this.agencyInformation = agency
        );
  } */

  //Old 
  postAgencyInformationSearch(agencyCode: string): void {
    agencyCode = agencyCode.trim();
    if (!agencyCode) { return; }
    console.log('postAgencyInformationSearch');
    this.agencyService.postAgencyInformationSearch(agencyCode)
      .subscribe(agency =>
        this.agencyInformation = agency
        );
  }
  updateList(property: string, event: any) {
    const editField = event.target.textContent;
    console.log(editField);
    //this.agencies[0].agencyCode = editField;
  }

  changeValue(property: string, event: any) {
    this.editField = event.target.textContent;
    //this.agencies[0].agencyCode = this.editField;
    //console.log(this.agencies[0].agencyCode);
  }
  clear() {
    this.agencyInformation.values = null;
    this.editForm.reset();
    this.searchForm.reset();   
  }
  submitAgencyDelete() {

  }

}
