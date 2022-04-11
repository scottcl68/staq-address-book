import React, {useState, useEffect, Component} from 'react';
import  ContactCard from './classes';
// import {contacts as externalContacts} from './contactListFile'
import data from './contactList.json'
import './App.css';


interface SearchBarProps {
    filterList: any
    showSearchBar: boolean
}
class SearchBar extends Component<SearchBarProps, {}> {
    handleChange = (event) => {
        this.props.filterList(event.target.value);
        event.preventDefault();
    }
    render() {
        if (this.props.showSearchBar) {
            return(
                <input
                    type="text"
                    className='search-bar'
                    placeholder='Search by name or email...'
                    onChange={this.handleChange}
                >
                </input>
            )
        } else { 
            return
        };
    }
}

interface SortByDropdownProps {
    sortList: any
    showSortDropDown: boolean
}
class SortByDropdown extends Component<SortByDropdownProps, {}> {
    handleChange = (event) => {
        this.props.sortList(event.target.value);
        event.preventDefault();
    }
    render() {
        if (this.props.showSortDropDown){
            return(
                <div>
                    <label className='select-label' htmlFor='select-sort' >Sort by:</label>
                    <select
                        className='select-sort'
                        id='select-sort'
                        onChange={this.handleChange}
                    >
                          <option value="firstNameAscending">First Name, Ascending</option>
                          <option value="firstNameDescending">First Name, Descending</option>
                          <option value="lastNameAscending">Last Name, Ascending</option>
                          <option value="lastNameDescending">Last Name, Descending</option>
                          <option value="emailAscending">Email, Ascending</option>
                          <option value="emailDescending">Email, Descending</option>
                    </select>
                </div>
            )
        } else {
            return
        }

    }
}

interface ListEntryProps {
    name: string
    email: string
}
interface ListEntryState {
    expanded: boolean
    wrapperRef: any
}
class ListEntry extends Component<ListEntryProps, ListEntryState> {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            wrapperRef: React.createRef(),
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    open =()=>{
        this.setState({expanded: true})
    }
    handleClickOutside(event) {
        if (this.state.wrapperRef && !this.state.wrapperRef.current.contains(event.target)) {
            this.setState({expanded: false});
        };
    }
    toggleExpand(){
            this.setState({expanded: !this.state.expanded})
    }
    render() {
        return (
            <div>
                <div ref={this.state.wrapperRef}
                    className='contact-list-entry'
                    onClick={this.open}
                    >
                    <div>
                        <div >{this.props.name}</div>
                        <div className='contact-list-entry-email'>-{this.props.email}</div>
                        <div className='contact-expansion'>
                            {this.state.expanded ? (
                                <div>
                                <button className='contact-expansion-button'>Edit</button>
                                <button className='contact-expansion-button-delete'color='red'>Delete</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}


interface ContactListProps {
    contactList: ContactCard[]
    showContactList: boolean
}
class ContactList extends Component<ContactListProps, any> {
    render() {
        if (this.props.showContactList){
            return (
                <div className='contact-list-body'>
                {this.props.contactList.slice().map(contact =>
                    <ListEntry
                        name={contact.lastName + ", " + contact.firstName}
                        email={contact.email}
                    />
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
class AddContactForm extends Component<AddContactFormProps, {}> {
    handleSubmit = (event) => {
        const contactFromForm = new ContactCard;
        contactFromForm.firstName = event.target.firstName.value;
        contactFromForm.lastName = event.target.lastName.value;
        contactFromForm.email = event.target.email.value;
        contactFromForm.address = event.target.address.value;
        contactFromForm.phone = event.target.phone.value;
        contactFromForm.notes = event.target.notes.value;
        this.props.addContact(contactFromForm);
        event.preventDefault();
    }
    render() {
        if (this.props.showAddContactForm) {
            return(
                <div>
                    <div
                        className='add-contact-form'
                    >
                        <form
                            onSubmit={this.handleSubmit}
                        >
                            <input className='add-contact-input-text' type="text" name="firstName" placeholder='First Name' required />
                            <input className='add-contact-input-text' type="text" name="lastName" placeholder='Last Name' />
                            <input className='add-contact-input-text' type="text" name="email" placeholder='Email'  />
                            <input className='add-contact-input-text' type="text" name="address" placeholder='Address'  />
                            <input className='add-contact-input-text' type="text" name="phone" placeholder='Phone Number'  />
                            <textarea className='add-contact-text-area' name="notes" placeholder='Add Notes Here...'/>
                            <button className='fill-button' type="submit" onClick={this.handleSubmit}>Add Contact</button>
                            <button className='fill-button' type='reset'>Reset</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return
        }
    }
}

interface CancelbuttonProps {
    showCancelButton: boolean
    showContactList: any
}
class Cancelbutton extends Component<CancelbuttonProps,{}> {
    render() {
        if (this.props.showCancelButton) {
            return (
                    <button
                        className='bottom-button'
                        onClick={() => this.props.showContactList(true)}
                    >
                    Cancel
                    </button>
            );
        } else {
            return
        }
    }
}

interface AddContactButtonProps {
    showAddContactButton: boolean
    showAddContactForm: any
}
class AddContactButton extends Component<AddContactButtonProps, {}> {
    render () {
        if (this.props.showAddContactButton) {
            return (
                <button
                    className='bottom-button'
                    onClick={() => {this.props.showAddContactForm(true)}}
                >
                Add Contact
                </button>
            );
        } else {
            return
        }
    }
}

interface AppState {
    updateState: number
    sortOption: string
    showContactList: boolean
    showAddContactForm: boolean
    showCancelbutton: boolean
    showSortDropDown: boolean
    showSearchBar: boolean
    showAddContactButton: boolean
    contactList: ContactCard[]
    contactListFiltered: ContactCard[]
}
class App extends Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            updateState: 0,
            sortOption: "lastNameAscending",
            showContactList: true,
            showAddContactForm: false,
            showCancelbutton: false,
            showSortDropDown: true,
            showSearchBar: true,
            showAddContactButton: true,
            contactList: this.externalContacts,
            contactListFiltered: this.externalContacts,
        };
    }
    externalContacts: ContactCard[] = data;
    

    handleAddContact = (contactFromForm) => {
        let newContactList = this.state.contactList.slice();
        newContactList.push(contactFromForm);
        this.setState({contactListFiltered: newContactList});
        this.setState({contactList: newContactList});
        this.showAddContactForm(false);
    }

    searchContactList = (searchString) => {
        searchString = searchString.slice().toLowerCase();
        const filtered = this.state.contactList.slice().filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(searchString)));
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
    showSearchBar(showSearchBar) {
        this.setState({showSearchBar: showSearchBar})
    }
    showSortDropDown(showSortDropDown) {
        this.setState({showSortDropDown: showSortDropDown})
    }
    showContactList(showContactList) {
        this.setState({showSearchBar: showContactList})
        this.setState({showSortDropDown: showContactList})
        this.setState({showContactList: showContactList})
        this.setState({showAddContactButton: showContactList})
        this.setState({showAddContactForm: !showContactList})
        this.setState({showCancelbutton: !showContactList})
    }
    handleShowContactList = (showContactList) => {
        this.showContactList(showContactList)
    }
    showAddContactForm(showAddContactForm) {
        this.setState({showAddContactForm: showAddContactForm})
        this.setState({showCancelbutton: showAddContactForm})
        this.setState({showSearchBar: !showAddContactForm})
        this.setState({showSortDropDown: !showAddContactForm})
        this.setState({showContactList: !showAddContactForm})
        this.setState({showAddContactButton: !showAddContactForm})
    }
    handleShowAddContactForm = (showAddContactForm) => {
        this.showAddContactForm(showAddContactForm)
    }
    showCancelButton(showCancelButton) {
        this.setState({showCancelbutton: showCancelButton})
    }
    showAddContactButton(showAddContactButton) {
        this.setState({showAddContactButton: showAddContactButton})
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
                    <div className='contact-list-head'>
                        Contacts
                    </div>
                    <SearchBar
                        filterList={this.searchContactList}
                        showSearchBar={this.state.showSearchBar}
                    />
                    <SortByDropdown
                        sortList={this.handleSortOption}
                        showSortDropDown={this.state.showSortDropDown}
                    />
                    <ContactList
                        contactList={this.sortedContactList(this.state.sortOption, this.state.contactListFiltered.slice())}
                        showContactList={this.state.showContactList}
                    />
                    <AddContactForm
                        showAddContactForm={this.state.showAddContactForm}
                        addContact={this.handleAddContact}
                    />
                    <Cancelbutton
                        showCancelButton={this.state.showCancelbutton}
                        showContactList={this.handleShowContactList}
                    />
                    <AddContactButton
                        showAddContactButton={this.state.showAddContactButton}
                        showAddContactForm={this.handleShowAddContactForm}
                    />
                </div>
            </div>

        );
    }
}

export default App;
