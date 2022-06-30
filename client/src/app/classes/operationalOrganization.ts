export class OperationalOrganization {
  orgId: string;
  name: string;
  abbreviation: string;
  constructor(orgId, name, abbreviation) {
    this.orgId = orgId ? orgId : null;
    this.name = name ? name : null;
    this.abbreviation = abbreviation ? abbreviation : null;
  }
}
