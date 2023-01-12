using {
  cuid,
  managed
} from '@sap/cds/common';

namespace requestspace;

entity requests : managed {
  key id                 : Integer;
      name               : String;
      differenciators    : String;
      benchmark          : String;
      price_from         : String;
      tec_spec           : String;
      hs_code            : String;
      image              : String;
      expected           : String;
      market_obj         : String;
      market_exp         : String;
      channel            : String;
      market_dif         : String;
      nif                : String;
      country            : String;
      email              : String;
      telephone          : String;
      empl_num           : String;
      sales_from         : String;
      sales_to           : String;
      industry           : String;
      target             : String;
      status             : String;
      type               : String;
      date               : String;
      simulationcompany  : String;
      simulationproduct  : String;
      simulationproposal : String;
}

entity companies : managed {
  key id              : Integer;
      name            : String;
      nif             : String;
      country         : String;
      email           : String;
      telephone       : String;
      empl_num        : String;
      sales_from      : String;
      sales_to        : String;
      industry        : String;
      target          : String;
      date            : String;
}

entity products : managed {
  key id                 : Integer;
      name               : String;
      differenciators    : String;
      benchmark          : String;
      price_from         : String;
      tec_spec           : String;
      hs_code            : String;
      image              : String;
      expected           : String;
      market_obj         : String;
      market_exp         : String;
      channel            : String;
      market_dif         : String;
}
