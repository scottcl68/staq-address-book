import React from 'react';
import  ContactCard from './classes';
import contacts from './contactListFile'
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
    contactList: ContactCard[] ,
    sortBy: string,
}

class ContactList extends React.Component<ContactListProps, any> {
    
    sortedContactList(sortBy) {
        let contactList = this.props.contactList.slice();
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
        return contactList.slice();
    }
    
    render() {
        const contactList = this.props.contactList;
        return (
            <div className='contact-list-body'>
            {this.sortedContactList(this.props.sortBy).map(contact =>
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




class App extends React.Component<{}, {contactList: ContactCard[]}> {
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
                        <div className='contact-list-sub-header'>
                            <div className='contact-list-sub-header-col'><button className='add-contact-button'>Add Contact</button></div>
                            <div className='contact-list-sub-header-col'><button className='add-contact-button'>Add Contact</button></div>
                            
                        </div>
                        <div className='search-bar-sub-header'>
                            <div className='search-bar-col'><input type="text" className='search-bar' placeholder='Search by name or email...'></input></div>
                            {/* <div className='search-bar-col'><button className='add-contact-button'>Go</button></div> */}
                        </div>
                        <ContactList
                            contactList={contacts}
                            sortBy={'firstNameAscending'}
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
