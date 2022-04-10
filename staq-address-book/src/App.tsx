import React, {useState, useEffect} from 'react';
import  ContactCard from './classes';
// import {contacts as externalContacts} from './contactListFile'
import data from './contactList.json'
import './App.css';

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
    showContactList: boolean
}
class ContactList extends React.Component<ContactListProps, any> {
    render() {
        if (this.props.showContactList){
            return (
                <div className='contact-list-body'>
                {this.props.contactList.slice().map(contact =>
                    <div>
                        <ListEntry
                        name={contact.lastName + ", " + contact.firstName}
                        email={contact.email}
                        />
                    </div>
                )}
                </div>
            )
        } else {
            return
        }
    }
}

interface AddContactFormProps {
    showAddContactForm: boolean
    addContact: any
}
class AddContactForm extends React.Component<AddContactFormProps, {}> {

    addContact = (event) => {
        const contactFromForm = new ContactCard;
        contactFromForm.firstName = event.target.firstName.value;
        contactFromForm.lastName = event.target.lastName.value;
        this.props.addContact(contactFromForm);
        event.preventDefault();
    }
    render() {
        if (this.props.showAddContactForm) {
            return(
                <div>
                    <form
                        onSubmit={this.addContact}
                    >
                        <input type="text" name="firstName" placeholder='First Name' required />
                        <input type="text" name="lastName" placeholder='Last Name' required />
                        <input type="text" name="email" placeholder='Email'  />
                        <input type="text" name="address" placeholder='Address'  />
                        <input type="text" name="phone" placeholder='Phone Number'  />
                        <div>
                            <textarea id="notes" placeholder='Notes'/>
                        </div>
                        
                        <button type="submit">Add Contact</button>
                        <button type='reset'>Reset</button>
                    </form>
                    <button type='button'>Cancel</button>
                </div>
            )
        } else {
            return
        }
    }
}

interface SortByDropdownProps {
    sortList: any
}
interface SortByDropdownState {
    value: string
}
class SortByDropdown extends React.Component<SortByDropdownProps, SortByDropdownState> {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        this.props.sortList(event.target.value)
        event.preventDefault();
    }
    render() {
        return(
            <select
                className='select-sort'
                onChange={this.handleChange}
            >
                  <option value="firstNameAscending">First Name, Ascending</option>
                  <option value="firstNameDescending">First Name, Descending</option>
                  <option value="lastNameAscending">Last Name, Ascending</option>
                  <option value="lastNameDescending">Last Name, Descending</option>
                  <option value="emailAscending">Email, Ascending</option>
                  <option value="emailDescending">Email, Descending</option>
            </select>
        )
    }
}
interface SearchBarProps {
    filterList: any
}
class SearchBar extends React.Component<SearchBarProps, {}> {
    handleChange = (event) => {
        this.props.filterList(event.target.value);
        event.preventDefault();
    }
    render() {
        return (
            <div
                className='search-bar-col'
            >
                <input
                type="text"
                className='search-bar'
                placeholder='Search by name or email...'
                onChange={this.handleChange}
                >
                </input>
            </div>
        );
    }
}

interface AppState {
    updateState: number
    sortOption: string
    showContactList: boolean
    showAddContactForm: boolean
    addContact: ContactCard
    contactList: ContactCard[]
    contactListFiltered: ContactCard[]
}

class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            updateState: 0,
            sortOption: "lastNameDescending",
            showContactList: true,
            showAddContactForm: false,
            addContact: new ContactCard,
            contactList: this.externalContacts,
            contactListFiltered: this.externalContacts,
        };
        // this.handleSelect = this.handleSelect.bind(this);
        // this.handleAddContact = this.handleAddContact.bind(this)
    }
    externalContacts: ContactCard[] = data;

    handleAddContact(contactFromForm: ContactCard) {
        this.externalContacts.push(contactFromForm);
        this.setState({updateState: this.state.updateState})
    }

    searchContactList = (searchString) => {
        searchString = searchString.slice().toLowerCase();
        const filtered = this.state.contactList.slice().filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchString)));
        this.setState({contactListFiltered: filtered})
    }

    sortedContactList(sortBy, contactListToSort) {
        let contactList = contactListToSort.slice();
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

    changeContactListVisibility() {
        const showContactList = !this.state.showContactList
        this.setState({showContactList: showContactList})
    }
    showAddContactForm() {
        const showAddContactForm = !this.state.showAddContactForm
        this.changeContactListVisibility()
        this.setState({showAddContactForm: showAddContactForm})
    }
    handleSortClick() {
        const sortOption = this.state.sortOption;
        if (sortOption ==="lastNameAscending"){
            this.setState({sortOption: "lastNameDescending"})
        } else {
            this.setState({sortOption: "lastNameAscending"})
        }
    }
    handleSortOption = (sortOptionFromDropDown) =>  {
        this.setState({sortOption: sortOptionFromDropDown});
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
                            <SearchBar
                                filterList={this.searchContactList}
                            />
                        </div>
                        <div className='contact-list-sub-header'>
                            <SortByDropdown
                                sortList={this.handleSortOption}
                            />
                            <div className='contact-list-sub-header-col'>
                                <button
                                className='add-contact-button'
                                onClick={() => {this.showAddContactForm();}}
                                >
                                    Add Contact
                                </button>
                            </div>
                        </div>
                        {/* <div>
                            <button
                            className='toggle-sort-by-last-name-ascending/descending'
                                onClick={()=> {this.handleSortClick()}}>toggle sort ascending/descending
                            </button>
                            {this.state.sortOption}
                        </div> */}
                        <ContactList
                            contactList={this.sortedContactList(this.state.sortOption, this.state.contactListFiltered.slice())}
                            showContactList={this.state.showContactList}
                        />
                        <AddContactForm
                            showAddContactForm={this.state.showAddContactForm}
                            addContact={this.handleAddContact}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
