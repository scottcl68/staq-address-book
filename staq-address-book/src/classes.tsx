import {v4 as uuidv4} from 'uuid'

export class Address {
    street?: string;
    unit?: string;
    city?: string;
    state?: string;
    zip?: number;
  }
  
export class ContactCard {
  key: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  email?: string;
  phone?: number;
  notes?: string;

  constructor () {
    this.key = uuidv4();
  }
}

export default ContactCard