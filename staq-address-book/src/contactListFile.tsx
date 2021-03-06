import {firstNames, surNames as lastNames} from './names'
import ContactCard from './classes';
import {v4 as uuidv4} from 'uuid'

export function getRandomContacts(num){
    //initialize contact container
    let contacts: ContactCard[] = [];

    //generate 'num' new contact cards with first and sur names only
    for (let i = 0; i < num; i++) {
        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        let email=lastName.toLowerCase() + "." + firstName.toLowerCase() + Math.floor(Math.random()*1000) + "@gmail.com";
        let contact = new ContactCard();
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.uuid = uuidv4();
        //add new random contact to contact container
        contacts.push(contact);
    }
    return contacts
}

export let contacts = getRandomContacts(50);

require('fs').writeFile('./contactList.json', JSON.stringify(contacts),
    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
);

