import {v4 as uuidv4} from 'uuid'


export class ContactCard {
  uuid: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  phone?: number;
  notes?: string;

}

export default ContactCard