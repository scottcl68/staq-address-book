import React, { useState } from 'react';
import { render } from "react-dom";
import {firstNames, surNames as lastNames} from './names'
import {ContactCard, Address} from './classes';
import './App.css';

import ReactTable from "react-table";
// import "react-table/react-table.css";


//initialize contact container
let contacts = new Map<string, ContactCard>();

//generate 25 new contact cards with first and sur names only
for (let i = 0; i < 25; i++) {
  let firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  let lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  let contact = new ContactCard();
  contact.firstName = firstName;
  contact.lastName = lastName;
  //add new random contact to contact container
  contacts.set(contact.key, contact)
}


function addNewContact(newContact: ContactCard){
  contacts.set(newContact.key, newContact)
}



function App() {
  const [users, setUsers] = useState(Array.from(contacts.values()));
  return (
    <div>
        <div className='page-header'>
            <h1>STAQ ADDRESS BOOK</h1>
        </div>
        <div className="contact-list">
            <h3 className="contact-list-header">Contact List</h3>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.key}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default App;
