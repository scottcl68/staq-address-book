import React, {useState, useEffect} from 'react';
import  ContactCard from './classes';
import {contacts as externalContacts} from './contactListFile'
import './App.css';



function editSearchTerm(e) {
    this.setState({searchTerm: e.target.value})
}

function dynamicSearch () {
    return this.state.names.filter(
        name => name.toLowerCase().includes(
            this.state.searchTerm.toLowerCase()))
}

function SearchBar (props) {
    return (
        <div>
            <input
                type='text'
                placeholder='Search by name or email...'
                value={this.state.searchTerm}
                onChange={this.editSearchTerm}
            />

        </div>
    )
}

class AddContactButton extends React.Component {
    render() {
        return (
            0
        );
    }
}

function ListEntry (props) {
    return (
        <div
            className='contact-list-entry'
            // onClick={}
        >
            <div>{props.name}</div>
            <div className='contact-list-entry-email'>-{props.email}</div>
        </div>
    );
}

interface ContactListProps {
    contactList: ContactCard[]
}

class ContactList extends React.Component<ContactListProps, any> {
    render() {
        return (
            <div className='contact-list-body'>
            {this.props.contactList.map(contact =>
                <div>
                    <ListEntry
                    name={contact.lastName + ", " + contact.firstName}
                    email={contact.email}
                    />
                    {/* {user.lastName + ", " + user.firstName} */}
                </div>
            )}
            </div>
        )
    }
}

// function ContactList(props) {
//     return(
//         <div className='contact-list-body'>
//         {this.props.contactList.map(contact =>
//             <div>
//                 <ListEntry
//                 name={contact.lastName + ", " + contact.firstName}
//                 email={contact.email}
//                 />
//                 {/* {user.lastName + ", " + user.firstName} */}
//             </div>
//         )}
//         </div>
//     )
// }

function SortByDropdown(props) {
    return (
            <select
            className='select-sort'
            onChange={(e): void => this.props.onChange(e)}
            >
                  <option value="firstNameAscending">First Name, Ascending</option>
                  <option value="firstNameDescending">First Name, Descending</option>
                  <option value="lastNameAscending">Last Name, Ascending</option>
                  <option value="lastNameDescending">Last Name, Descending</option>                  <option value="firstNameAscending">First Name, Ascending</option>
                  <option value="emailAscending">Email, Ascending</option>
                  <option value="emailDescending">Email, Descending</option>
            </select>
    );
}




class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOption: "",
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        return
    }

    sortedContactList(sortBy) {
        let contactList = externalContacts.slice();
        if (sortBy){
            if (sortBy === 'firstNameAscending'){
                contactList.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
            } else if (sortBy === 'firstNameDescending') {
                contactList.sort((a, b) => (a.firstName > b.firstName ? -1 : 1));
            } else if (sortBy === 'emailAscending'){
                contactList.sort((a, b) => (a.email < b.email ? -1 : 1));
            } else if (sortBy === 'emailDescending') {
                contactList.sort((a, b) => (a.email > b.email ? -1 : 1));
            } else if (sortBy === 'lastNameAscending'){
                contactList.sort((a, b) => (a.lastName < b.lastName ? -1 : 1));
            } else if (sortBy === 'lastNameDescending') {
                contactList.sort((a, b) => (a.lastName > b.lastName ? -1 : 1));
            }
        }
        return contactList.slice();
    }

    render() {
        return (
            <div className='page'>
                <div className='page-header'>
                    <h1 className='page-header-text'>STAQ FINANCE ADDRESS BOOK</h1>
                </div>
                <div className="contact-list">
                    <div>
                        <div className='contact-list-head'>
                            Contacts
                        </div>
                        <div className='search-bar-sub-header'>
                            <div className='search-bar-col'><input type="text" className='search-bar' placeholder='Search by name or email...'></input></div>
                            {/* <div className='search-bar-col'><button className='add-contact-button'>Go</button></div> */}
                        </div>
                        <div className='contact-list-sub-header'>
                            {/* <div className='contact-list-sub-header-col'><button className='add-contact-button'>Add Contact</button></div> */}
                            <SortByDropdown
                                onChange={(e) => this.handleSelect(e)}
                            />
                            <div className='contact-list-sub-header-col'><button className='add-contact-button'>Add Contact</button></div>

                            
                        </div>

                        <ContactList
                            contactList={this.sortedContactList('lastNameAscending').slice()}
                            // sortBy={this.state.sortOption}
                            // sortBy={'lastNameAscending'}
                            // sortBy={'emailAscending'}
                            // sortBy={'firstNameDescending'}
                            // sortBy={'lastNameDescending'}
                            // sortBy={'emailDescending'}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
