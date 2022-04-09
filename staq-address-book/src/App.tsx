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
for (let i = 0; i < 50; i++) {
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

function ListEntry (props) {
    return (
        <div
            className='list-entry'
            // onClick={}
        >
            {props.name} 
        </div>
    );
}



class App extends React.Component {
    render() {
        const users = Array.from(contacts.values());
        return (
            <div className='page'>
                <div className='page-header'>
                    <h1 className='page-header-text'>STAQ FINANCE ADDRESS BOOK</h1>
                </div>
                <div className="contact-list">
                    <div>
                        <div className='contact-list-head'>Contacts</div>
                        <div className='contact-list-body'>
                            {users.map(user =>
                                <div className='contact-list-entry' key={user.key}>
                                    {user.lastName + ", " + user.firstName}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
