
import { useState } from "react";
import { MdOutlineClose, MdDone } from "react-icons/md";

import Cookies from 'js-cookie';

import * as API from "../api/api";

const AddContactModal = ({ isOpen, onClose, updateContacts}) => {
    const [inputValue, setInputValue] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    if (!isOpen) return null;

    const handleAddContact = async (email) => {
        const res = await API.getUserByEmail(Cookies.get('jwt'), email);

        if (res &&!res.user) {
            setValidEmail(false);
        }
        else {
            const res2 = await API.addContact(Cookies.get('jwt'), res.user.email);

            if (res2 && res2.success) {
                onClose('Contact Added');
                updateContacts(res2.data.user.contacts);
            }
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setValidEmail(true);
    }

    
    
    return (        
        <div className="relative opacity-100 bg-lightPurple max-w-[1024px] w-full h-full flex flex-col justify-center border-2 border-darkPurple rounded-xl">
            <MdOutlineClose onClick={onClose} className="absolute top-1 right-1 text-3xl text-black"/>
            <div className="flex flex-col h-full m-2 justify-between">
                <label className="self-center text-2xl font-bold">Add Contact</label>
                <div className="mx-2">
                    <label className="text-lg">Contact Email Address:</label><br/>
                    {!validEmail && inputValue && <label className="text-sm text-smoothWhite bg-red-500 rounded-lg px-1 ">Email address does not exist</label>}
                    <input type="text" placeholder="something@gmail.com" className="w-full h-10 px-2 rounded-xl focus:outline-none" value={inputValue} onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className={`mx-10 mb-5 flex justify-center bg-whitePurple p-2 rounded-xl ${validEmail && inputValue ? 'hover:cursor-pointer opacity-100' : 'opacity-60'}`} onClick={() => validEmail && inputValue && handleAddContact(inputValue)}>
                    <MdDone className="text-3xl"/>
                    <label className="text-lg">Add new contact</label>
                </div>
            </div>
        </div>
    )
}

export default AddContactModal;