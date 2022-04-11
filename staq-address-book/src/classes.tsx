
export class Address {
    street?: string;
    unit?: string;
    city?: string;
    state?: string;
    zip?: number;
  }
  
export class ContactCard {
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: number;
  notes?: string;

}

export default ContactCard