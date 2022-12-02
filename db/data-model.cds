using {
  cuid,
  managed
} from '@sap/cds/common';

namespace requestspace;

entity requests : managed {
  id          : Integer;
  status      : String;
  description : String;
  cuit        : String;
  name        : String;
}
