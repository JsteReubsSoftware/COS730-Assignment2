import { FaRegEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImSpinner10 } from "react-icons/im";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import Toggle from 'react-toggle';
import { LANGUAGES } from "../utils/languages";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import * as API from "../api/api";


const ProfilePage = () => {
    const [language, setLanguage] = useState(null);
    const [blurText, setBlurText] = useState(false);
    
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
        toast.success(message, {
            autoClose: 1000
        });
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
            const res = await API.updateUserBlurText(Cookies.get('jwt'), !userRes.user.censoreText, userRes.user.email);

            if (res && res.success) {
                setBlurText(res.data.user.censoreText);

                notify('Censore Text Preference Updated');
            }
        }
    }

    useEffect(() => {
        if (Cookies.get('jwt')) {
            const getStates = async () => {
                const res = await API.getUserByEmail(Cookies.get('jwt'));
                
                if (res.user) {
                  setLanguage(res.user.language);
                  setBlurText(res.user.censoreText);
                }
            };
    
            getStates();
        } 
        else {
            window.location.href = "/landing";
        }
    }, [])

    const getDefaultValue = () => {
        return options.filter((option) => option.value === language)[0];
    }

    const getDefaultBlurText = () => {
        return blurText != null ? blurText : false;
    }

    return language && (blurText === true || blurText === false) ? (
        <div className="h-screen w-full bg-smoothWhite grid grid-rows-36">
            <ToastContainer position="top-left"/>
            <div className="w-full h-full flex flex-col p-1 row-start-1 row-span-11">
                <div className="flex">
                    <img src={require("../assets/smile-emoji.png")} width='50px' alt="smile emoji"/>
                    <span className="my-auto ml-2 font-irishGrover">Yahoo! Messenger</span>
                </div>
                <div className="m-auto my-4 flex flex-col justify-center">
                    <img src={require("../assets/profile-pic.jpg")} width='150px' alt="profile" className="rounded-full"/>
                    <span className="text-center mt-2 text-2xl font-bold">Username</span>
                </div>
            </div>
            <div className="row-start-12 row-span-22">
                <label className="text-darkPurple text-xl font-bold m-2 pl-2">Profile Settings</label>
                <div className="mx-10 my-4 flex flex-col ">
                    <label className="text-lg">Username</label>
                    <div className="flex my-2">
                        <input type="text" value="Username" readOnly disabled className="text-smoothGrey w-full focus:outline-none border-2 border-darkPurple rounded-xl h-[35px] p-2"/>
                        <div className="ml-3">
                            <FaRegEdit className="w-full h-full m-auto text-[40px] text-darkPurple"/>
                        </div>                        
                    </div>
                </div>
                <div className="mx-10 my-4 flex flex-col">
                    <label className="text-lg">Email Address <span className="text-smoothGrey italic text-sm mx-2">(cannot change email)</span></label>
                    <div className="flex my-2">
                        <input type="text" value="joostereuben0830@gmail.com" readOnly disabled className="text-smoothGrey w-full focus:outline-none border-2 border-darkPurple rounded-xl h-[35px] p-2"/>                       
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
                <div className="m-10 flex justify-center">
                    <div className="ml-3 mr-2">
                        <BiLogOut className="w-full h-full m-auto text-[40px] text-darkPurple"/>
                    </div>
                    <label className="self-center text-md text-darkPurple">Log out</label>
                </div>
                <div className="m-10 flex justify-center">
                    <div className="ml-3 mr-2">
                        <RiDeleteBinLine className="w-full h-full m-auto text-[30px] text-red-500"/>
                    </div>
                    <label className="self-center text-sm text-red-500">Delete Account</label>
                </div>
            </div>
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