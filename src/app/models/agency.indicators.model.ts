export interface AgencyIndicators {
    transactionTypes: string[];
    topics: Topic[];
    multiyear: string;
    name: string;
    businessSystem: string[];
    documentFormat: string;
  }
  
  export interface Topic {
    eclas?: string[];
    eVolve?: string[];
  }