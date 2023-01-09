using { requestspace } from '../db/data-model';

service CatalogService @( path : '/Service'){

    entity requests as projection on requestspace.requests;
    entity companies as projection on requestspace.companies;
    
}