import { MdAddBox } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";

import ContactCard from "../components/contactCard";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as API from "../api/api";
import AddContactModal from "../components/addContactModal";

import { socket } from "../socket";

const ContactsPage = () => {
    
    if (!Cookies.get('jwt') || !socket) {
        window.location.href = '/landing';
    } else if (!socket.connected) {
        socket.connect();
    }

    const [contacts, setContacts] = useState(null); 
    const [showModal, setShowModal] = useState(false);

    const addNewContact = async (updatedContacts) => {
        setContacts(updatedContacts);
        console.log(updatedContacts);
    }

    const notify = (message) => {
        toast.success(message, {
            autoClose: 1000
        });
    }

    const handleClose = (message) => {
        setShowModal(false);

        if (message) {
            notify(message);
        }
    }

    useEffect(() => {
        async function fetchContacts() {
            const res = await API.getUserContacts(Cookies.get('jwt'));
            
            setContacts(res.data.contacts);
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
                    <input type="text" placeholder="Search contacts" className="mx-3 mt-2 my-auto w-full focus:outline-none focus:border-darkPurple border-2 border-lightPurple rounded-xl px-2 py-1" />
                    <div className="w-1/2 flex justify-evenly">
                        <div className="bg-smoothWhite">
                            <MdAddBox className="w-full h-full text-darkPurple text-[40px]" onClick={() => (setShowModal(!showModal))}/>
                        </div>
                        <div className="bg-smoothWhite">
                            <IoFilter className="w-full h-full text-darkPurple text-[40px]"/>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="w-full h-full pb-5 overflow-auto flex flex-col row-start-6 row-span-29">
                {
                    // render the contact cards
                    contacts.map((contact) => (
                        <ContactCard key={contact._id} contact={contact} />
                    ))
                }
            </div>
            {/* render the contact view page if the screen size allows it */}
            {showModal && 
                <div className="absolute w-full h-full bg-smoothGrey bg-opacity-50 z-10 flex justify-center px-10 py-60">
                    <AddContactModal isOpen={showModal} onClose={(message) => handleClose(message)} updateContacts={(updatedContacts) => addNewContact(updatedContacts)} />
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