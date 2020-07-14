import { Time } from '@angular/common';

/*
export interface RootObject {
  result: Result[];
}
*/


export interface AgencyInt {
  agencyCode: string;
  agencyName: string;
  agencyPreferences: string;
  ivansYAccount: string;
  ivansUserId: string;
  emailAddress: string;
  amsProduct: string;
  amsVersion: string;
  isClosed: number;
  dateOfModification: string;
  agencyInformationModified: string;
}

export interface AgencyInformation {
  agencyCode: string;
  agencyName: string;
  agencyPreferences: string;
  suspendDate: string;
  closeDate: string;
  ivansYAccount: string;
  ivansUserId: string;
  ivansOriginalAddress: string;
  emailAddress: string;
  amsProduct: string;
  amsVersion: string;
  lastModifiedDate: string;
  address1: string;
  address2: string;
  phoneNumber: string;
  formalAddress: string;
  informalAddress: string;
  destinationAddress: string;
  contractNumber: string;
  password: string;
  messageSeq: string;
  tranSeq: string;
  initialLoad: string;
  format: string;
  acordCSIOCompression: string;
  crlf: string;
  ebcdic: string;
  communications: string;

}



export interface xmlInt {
  xmlString: string;
}

export interface Hero {
  id: number;
  name: string;
}

