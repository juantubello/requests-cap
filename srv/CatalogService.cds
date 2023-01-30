using {requestspace} from '../db/data-model';

service CatalogService @(path : '/Service') {
    entity requests   as projection on requestspace.requests;
    entity companies  as projection on requestspace.companies;
    entity products   as projection on requestspace.products;
    entity industries as projection on requestspace.industries;
    entity countries  as projection on requestspace.countries;
}
