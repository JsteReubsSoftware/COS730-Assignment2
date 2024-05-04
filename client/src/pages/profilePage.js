import { FaRegEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import Select from 'react-select';
import Toggle from 'react-toggle';


const ProfilePage = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

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

    return (
        <div className="h-screen w-full bg-smoothWhite grid grid-rows-36">
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
                    <label className="text-lg">Email Address</label>
                    <div className="flex my-2">
                        <input type="text" value="joostereuben0830@gmail.com" readOnly disabled className="text-smoothGrey w-full focus:outline-none border-2 border-darkPurple rounded-xl h-[35px] p-2"/>
                        <div className="ml-3">
                            <FaRegEdit className="w-full h-full m-auto text-[40px] text-darkPurple"/>
                        </div>                        
                    </div>
                </div>
                <div className="mx-10 my-4 flex flex-col">
                    <label className="text-lg">Language Preference<span className="text-smoothGrey italic text-sm mx-2">(for messages only)</span></label>
                    <div className="flex my-2 h-12 border-2 border-darkPurple rounded-xl">
                        <Select defaultValue={options[0]} options={options} styles={customStyles} className="w-full h-full"/>                
                    </div>
                </div>
                <div className="mx-10 my-4 flex justify-between">
                    <div className="flex flex-col">
                        <label className="text-lg">Blur Sensitive Text</label>
                        <span className="text-smoothGrey italic text-sm mx-2">(for messages only)</span>
                    </div>
                    <Toggle
                            defaultChecked={false}
                            className='bg-darkPurple self-center '
                            // onChange={} 
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
    )
};

export default ProfilePage