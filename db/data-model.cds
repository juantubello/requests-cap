using {
  cuid,
  managed
} from '@sap/cds/common';

namespace requestspace;

entity requests : managed {
  key id               : Integer;
      email            : String;
      date             : String;
}

entity companies : managed {
  key id               : Integer;
      name             : String;
      address          : String;
      benchmark        : String;
      tax_id           : String;
      country          : String;
      employees_range  : String;
      industry_type    : String;
      industry_subtype : String;
      capacity         : String;
      capacity_expand  : String;
      c_iso            : Boolean;
      c_cosmos         : Boolean;
      c_halal          : Boolean;
      c_kosher         : Boolean;
      c_rspo           : Boolean;
      c_vegan          : Boolean;
      c_fda            : Boolean;
      c_health_canada  : Boolean;
      c_cofepris       : Boolean;
      c_invima         : Boolean;
      c_eu             : Boolean;
      c_ifs            : Boolean;
      c_others         : String;
      r_canada         : Boolean;
      r_usa            : Boolean;
      r_mexico         : Boolean;
      r_colombia       : Boolean;
      r_brasil         : Boolean;
      r_chile          : Boolean;
      r_spain_portu    : Boolean;
      r_france         : Boolean;
      r_italy          : Boolean;
      r_beneleux       : Boolean;
      r_germany        : Boolean;
      r_uk             : Boolean;
      r_nordics        : Boolean;
      r_east_europe    : Boolean;
      r_uae            : Boolean;
      committment_1    : Boolean;
      committment_2    : Boolean;
      committment_3    : Boolean;
      committment_4    : Boolean;
      committment_5    : Boolean;
      committment_6    : Boolean;
      committment_7    : Boolean;
      committment_8    : Boolean;
      committment_9    : Boolean;
      email            : String;
      date             : String;
}

entity products : managed {
  key id              : Integer;
      name            : String;
      differenciators : String;
      benchmark       : String;
      price_from      : String;
      tec_spec        : String;
      hs_code         : String;
      image           : String;
      expected        : String;
      market_obj      : String;
      market_exp      : String;
      channel         : String;
      market_dif      : String;
}

entity countries : managed {
  key country_id  : String;
      description : String;
}

entity industries : managed {
  key industry_type     : String;
  key industry_subtype  : String;
      industry_typed    : String;
      industry_subtyped : String;
}
