import { MdAddBox } from "react-icons/md";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { ImSpinner10 } from "react-icons/im";
import { FaInbox } from "react-icons/fa";

import ContactCard from "../components/contactCard";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as API from "../api/api";
import AddContactModal from "../components/addContactModal";

import { socket } from "../socket";
import DeleteContactModal from "../components/deleteContactModal";

const ContactsPage = () => {
    
    if (!Cookies.get('jwt') || !socket) {
        window.location.href = '/landing';
    } else if (!socket.connected) {
        socket.connect();
    }

    const [contacts, setContacts] = useState(null);
    const [filteredContacts, setFilteredContacts] = useState(null); 
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const addNewContact = async (updatedContacts) => {
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
        document.querySelector('#search-bar').value = '';
        document.querySelector('#search-bar').blur();
        console.log(updatedContacts);
    }

    const deleteContact = async (updatedContacts) => {
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
        document.querySelector('#search-bar').value = '';
        document.querySelector('#search-bar').blur();
        console.log(updatedContacts);
    }

    const notify = (message) => {
        toast.success(message, {
            autoClose: 1000
        });
    }

    const handleClose = (message) => {
        setShowModalAdd(false);
        setShowModalDelete(false);

        if (message) {
            notify(message);
        }
    }

    const handleSearch = (searchValue) => {
        //filter contacts based on search value

        setFilteredContacts(contacts.filter(contact => contact.name.toLowerCase().includes(searchValue.toLowerCase())))
    }

    useEffect(() => {
        async function fetchContacts() {
            const res = await API.getUserContacts(Cookies.get('jwt'));
            
            setContacts(res.data.contacts);
            setFilteredContacts(res.data.contacts);
        }

        fetchContacts();

        socket.emit('get-users');

    }, []);

    return contacts ? (
        <div className="relative h-screen w-full bg-smoothWhite grid grid-rows-36"> {/* add grids if the screen size is desktop */}
            <ToastContainer position="top-left"/>
            <div className="w-full h-full bg-transparent flex flex-col p-1 row-start-1 row-span-5">
                <div className="flex">
                    <img src={require("../assets/smile-emoji.png")} width='50px' alt="smile emoji"/>
                    <span className="my-auto ml-2 font-irishGrover">Yahoo! Messenger</span>
                </div>
                <div className="flex justify-between mt-2">
                    <input id='search-bar' type="text" placeholder="Search contacts" className="mx-3 mt-2 my-auto w-full focus:outline-none focus:border-darkPurple border-2 border-lightPurple rounded-xl px-2 py-1" onChange={(e) => handleSearch(e.target.value)} />
                    <div className="w-1/2 flex justify-evenly">
                        <div className="bg-smoothWhite">
                            <MdAddBox className="w-full h-full text-darkPurple text-[40px]" onClick={() => (setShowModalAdd(!showModalAdd))}/>
                        </div>
                        <div className="bg-smoothWhite">
                            <MdIndeterminateCheckBox className="w-full h-full text-darkPurple text-[40px]" onClick={() => (setShowModalDelete(!showModalDelete))}/>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="w-full h-full pb-5 overflow-auto flex flex-col row-start-6 row-span-29">
                {
                    // render the contact cards
                    filteredContacts && filteredContacts.length > 0 && filteredContacts.map((contact) => (
                        <ContactCard key={contact._id} contact={contact} />
                    ))
                }
                { contacts && contacts.length === 0 && 
                    <div className="m-auto text-center">
                        <FaInbox className="text-darkPurple w-full h-full" />
                        <span className="text-darkPurple">You have no contacts</span>
                    </div>
                }
                { contacts && contacts.length > 0 && filteredContacts && filteredContacts.length === 0 && 
                    <div className="m-auto text-center">
                        <FaInbox className="text-darkPurple w-full h-full" />
                        <span className="text-darkPurple w-full">No contacts found</span>
                    </div>
                }
            </div>
            {/* render the contact view page if the screen size allows it */}
            {showModalAdd && 
                <div className="absolute w-full h-full bg-smoothGrey bg-opacity-50 z-10 flex justify-center px-10 py-60">
                    <AddContactModal isOpen={showModalAdd} onClose={(message) => handleClose(message)} updateContacts={(updatedContacts) => addNewContact(updatedContacts)} />
                </div>}
            {showModalDelete && 
                <div className="absolute w-full h-full bg-smoothGrey bg-opacity-50 z-10 flex justify-center px-10 py-60">
                    <DeleteContactModal isOpen={showModalDelete} onClose={(message) => handleClose(message)} updateContacts={(updatedContacts) => deleteContact(updatedContacts)} />
                </div>}
        </div>
    ) : (
        <div className="h-screen w-full flex justify-center bg-smoothWhite">
            <div className="flex flex-col w-1/4 h-1/4 m-auto">
                <div>
                    <ImSpinner10 className="w-full h-full text-darkPurple animate-spin"/>
                </div>
                <label className="w-full h-full text-md mt-2 text-darkPurple text-center">Loading...</label>
            </div>
        </div>
    )
};

export default ContactsPage