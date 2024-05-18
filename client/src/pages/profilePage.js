import { FaRegEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImSpinner10 } from "react-icons/im";
import { MdOutlineClose, MdDone } from "react-icons/md";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import Toggle from 'react-toggle';
import { LANGUAGES } from "../utils/languages";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import * as API from "../api/api";
import { socket } from '../socket';
import ConfirmDeleteModal from "../components/confirmDeleteModal";


const ProfilePage = () => {
    if (!Cookies.get('jwt') || !socket) {
        window.location.href = '#/landing';
    } else if (!socket.connected) {
        socket.connect();
    }

    const [language, setLanguage] = useState(null);
    const [blurText, setBlurText] = useState(false);
    const [username, setUsername] = useState(null);
    const [prevUsername, setPrevUsername] = useState(null);
    const [editingUsername, setEditingUsername] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const options = Object.keys(LANGUAGES).map((key) => ({ value: key, label: LANGUAGES[key][0].toUpperCase() + LANGUAGES[key].slice(1) }));

    const customStyles = {
        control: (provided) => ({ // class attribute : class=" css-i32vvf-control"
          ...provided,
          background: '#F5F5F5',
          display: 'flex',
          flexWrap: 'nowrap',
          borderRadius: '0.75rem',
          border: 'none',
          height: '100%',
          width: '100%',
        }),
        menu: (provided) => ({ // 'menu' is from the div class too.
          ...provided,
          background: '#F5F5F5',
          width: '100%',
          height: '100px',
          overflow: 'auto'
        }),
    };

    const notify = (message) => {
        if (message.includes('Something went wrong')) {
            toast.error(message, {
                autoClose: 1000
            });
            return;
        }

        toast.success(message, {
            autoClose: 1000
        });
    }

    const handleLogout = () => {
        Cookies.remove('jwt');
        window.location.href = '#/landing';
    }

    const handleClose = (message) => {
        setShowConfirmModal(false);

        if (message) {
            notify(message);
        }
    }

    const deleteAccount = async () => {
        const userRes = await API.deleteAccount(Cookies.get('jwt'));

        if (userRes && userRes.success) {
            handleLogout();
        }
        else {
            notify('Something went wrong. Unable to delete account');
        }
    }

    const handleLangChange = async (e) => {
        const userRes = await API.getUserByEmail(Cookies.get('jwt'));
                
        if (userRes.user) {

            const res = await API.updateUserLanguage(Cookies.get('jwt'), e.value, userRes.user.email);

            if (res && res.success) {
                setLanguage(res.data.user.language);

                notify('Language Preference Updated');
            }
        }
    }

    const handleBlurTextChange = async () => {
        const userRes = await API.getUserByEmail(Cookies.get('jwt'));
                
        if (userRes.user) {
            const res = await API.updateUserBlurText(Cookies.get('jwt'), !userRes.user.censorText, userRes.user.email);

            if (res && res.success) {
                setBlurText(res.data.user.censorText);

                notify('Censor Text Preference Updated');
            }
        }
    }

    const handleUpdateUsername = async () => {
        const userRes = await API.getUserByEmail(Cookies.get('jwt'));

        if (userRes.user) {
            const res = await API.updateUsername(Cookies.get('jwt'), username, userRes.user.email);

            if (res && res.success) {
                setEditingUsername(false);
                setUsername(res.data.user.name);
                setPrevUsername(res.data.user.name);
                notify('Username Updated');
            }
            else {
                setEditingUsername(false);
                notify('Something went wrong. Please try again.');
            }
        }
    }

    useEffect(() => {
        if (Cookies.get('jwt')) {
            const getStates = async () => {
                const res = await API.getUserByEmail(Cookies.get('jwt'));
                
                if (res.user) {
                  setLanguage(res.user['language']);
                  setBlurText(res.user['censorText']);
                  setUsername(res.user['name']);
                  setPrevUsername(res.user['name']);
                  setProfileImage(res.user['profileImg']);
                  setEmail(res.user['email']);
                }
            };
    
            getStates();
        } 
        else {
            window.location.href = "#/landing";
        }
    }, [])

    useEffect(() => {
        // Add event listener for clicks
        const handleOutsideClick = (event) => {
            const inputElement = document.getElementById("username-input");
            const editUsernameBTN = document.getElementById("edit-username-btn");

            // Check if clicked outside the input element
            if (!event.target.matches('#username-input') && !inputElement?.value.includes(event.target) && editingUsername) {
                inputElement.blur();
                setEditingUsername(false);
                setUsername(prevUsername);
            }

            // if we clicked on the edit button we are allowed to edit the username
            else if (event.target === editUsernameBTN) {
                setEditingUsername(true);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        // Cleanup function to remove event listener on unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };

    });
      

    const getDefaultValue = () => {
        return options.filter((option) => option.value === language)[0];
    }

    const getDefaultBlurText = () => {
        return blurText != null ? blurText : false;
    }

    return language && (blurText === true || blurText === false) && profileImage ? (
        <div className="h-screen w-full bg-smoothWhite grid grid-rows-36">
            <ToastContainer position="top-left"/>
            <div className="w-full h-full flex flex-col p-1 row-start-1 row-span-11">
                <div className="flex">
                    <img src={require("../assets/smile-emoji.png")} width='50px' alt="smile emoji"/>
                    <span className="my-auto ml-2 font-irishGrover">Yahoo! Messenger</span>
                </div>
                <div className="m-auto my-4 flex flex-col justify-center w-full">
                    <img src={`${profileImage}`} width='150px' alt="profile" className="rounded-full self-center"/>
                    <span className="self-center text-center mt-2 text-2xl font-bold w-[400px]">{username.length > 20 ? username.slice(0, 20) + "..." : username}</span>
                </div>
            </div>
            <div className="row-start-12 row-span-22">
                <label className="text-darkPurple text-xl font-bold m-2 pl-2">Profile Settings</label>
                <div className={`${!editingUsername ? "mx-10" : "ml-10 mr-3"} my-4 flex flex-col`}>
                    <label className="text-lg">Username</label>
                    <div className="flex my-2">
                        <input id="username-input" type="text" value={username} readOnly={!editingUsername} disabled={!editingUsername} onChange={(e) => {setUsername(e.target.value)}} className="text-smoothGrey w-full focus:outline-none border-2 border-darkPurple rounded-xl h-[35px] p-2 overflow-x-hidden"/>
                        <div className="ml-3">
                            {!editingUsername 
                                ? <div className="flex justify-center">
                                    <FaRegEdit id="edit-username-btn" className="m-auto text-[40px] text-darkPurple"/>
                                </div>
                                : <div className="flex justify-between">
                                    <MdOutlineClose className="w-full h-full m-auto text-[40px] text-red-500 border-2 border-red-500 mx-2" onClick={() => setEditingUsername(true)}/>
                                    <MdDone className="w-full h-full m-auto text-[40px] text-green-500 border-2 border-green-500 mx-2" onClick={handleUpdateUsername}/>
                                </div>
                            }
                        </div>                        
                    </div>
                </div>
                <div className="mx-10 my-4 flex flex-col">
                    <label className="text-lg">Email Address <span className="text-smoothGrey italic text-sm mx-2">(cannot change email)</span></label>
                    <div className="flex my-2">
                        <input type="text" value={email} readOnly disabled className="text-smoothGrey w-full focus:outline-none border-2 border-darkPurple rounded-xl h-[35px] p-2"/>                       
                    </div>
                </div>
                <div className="mx-10 my-4 flex flex-col">
                    <label className="text-lg">Language Preference<span className="text-smoothGrey italic text-sm mx-2">(for messages only)</span></label>
                    <div className="flex my-2 h-12 border-2 border-darkPurple rounded-xl">
                        <Select defaultValue={getDefaultValue()} options={options} styles={customStyles} onChange={handleLangChange} className="w-full h-full"/>                
                    </div>
                </div>
                <div className="mx-10 my-4 flex justify-between">
                    <div className="flex flex-col">
                        <label className="text-lg">Blur Sensitive Text</label>
                        <span className="text-smoothGrey italic text-sm mx-2">(for messages only)</span>
                    </div>
                    <Toggle
                            defaultChecked={getDefaultBlurText()}
                            className='bg-darkPurple self-center '
                            onChange={handleBlurTextChange} 
                        />
                </div>
                <div className="m-10 flex justify-center" onClick={handleLogout}>
                    <div className="ml-3 mr-2">
                        <BiLogOut className="w-full h-full m-auto text-[40px] text-darkPurple"/>
                    </div>
                    <label className="self-center text-md text-darkPurple">Log out</label>
                </div>
                <div className="m-10 flex justify-center" onClick={() => setShowConfirmModal(true)}>
                    <div className="ml-3 mr-2">
                        <RiDeleteBinLine className="w-full h-full m-auto text-[30px] text-red-500"/>
                    </div>
                    <label className="self-center text-sm text-red-500">Delete Account</label>
                </div>
            </div>
            {showConfirmModal && 
                <div className="absolute w-full h-full bg-smoothGrey bg-opacity-50 z-10 flex justify-center px-10 py-60">
                    <ConfirmDeleteModal isOpen={showConfirmModal} onClose={(message) => handleClose(message)} deleteAccount={() => deleteAccount(email)} />
                </div>}
        </div>
    ) :
    (
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

export default ProfilePage