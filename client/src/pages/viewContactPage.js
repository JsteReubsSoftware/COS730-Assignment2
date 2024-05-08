import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import * as API from "../api/api";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { MdAddBox } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";

const ViewContactPage = () => {  
    const [viewedUser, setViewedUser] = useState(null);

    useEffect(( ) => {

        if (Cookies.get('jwt')) {
            const getStates = async () => {
                const urlSearchString = window.location.search;       
                const params = new URLSearchParams(urlSearchString);    

                const res = await API.getUserById(Cookies.get('jwt'), params.get('id'));
                
                if (res.user) {
                  setViewedUser(res.user);
                }
            };
    
            getStates();
        } 
        else {
            window.location.href = "/landing";
        }

    }, [ ]);

    return viewedUser ? (
        <div className="h-screen w-full grid grid-rows-36" style={{backgroundImage: `url(${require('../assets/chat-bg.jpg')})`}}>
            <div className="row-start-1 row-span-3 bg-darkPurple grid grid-cols-12">
                <div className="col-start-1 col-span-1 w-full h-full">
                    <IoArrowBackOutline className=" text-smoothWhite text-4xl h-full ml-2" onClick={() => window.history.back()} />
                </div>
                <div className="col-start-2 col-span-9 grid grid-cols-12 w-full h-full">
                    <img src={viewedUser.profileImg} alt="profile" className="col-start-1 col-span-3 ml-2 rounded-full p-2"/>
                    
                    <div className="flex flex-col pl-3 col-start-4 col-span-9">
                        <div className="w-full h-full my-auto text-2xl text-smoothWhite mt-2">{viewedUser.name}</div>
                        
                        <div className="w-full h-full pt-2 italic ">
                            <div className="flex pr-3 justify-start font-bold">
                                <GoDotFill className="text-green-400"/>
                                <span className="text-sm text-green-400">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-11 col-span-2">
                    <MdCall className=" text-smoothWhite text-4xl h-full mx-auto" />
                </div>
            </div>
            <div className="relative row-start-4 row-span-33 bg-opacity-80 bg-smoothWhite">
                <div className="absolute bottom-0 w-full h-[70px] grid grid-cols-36 bg-darkPurple ">
                    <div className="h-full w-full col-start-1 col-span-7 flex justify-evenly">
                        <MdAddBox className="text-smoothWhite text-4xl h-full mx-auto"/>
                        <FaRegImage className="text-smoothWhite text-4xl h-full mx-auto"/>
                    </div>
                    <div className="h-[50px] col-start-8 col-span-29 mx-2 my-auto bg-smoothWhite flex justify-between rounded-xl border-2 border-darkPurple">
                        <input type="text" placeholder="Type a message" className="text-lg w-full h-full bg-transparent outline-none border-none px-2 py-1"/>
                        <IoSend className=" mx-2 text-darkPurple text-2xl h-full my-auto"/>
                    </div>
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
}

export default ViewContactPage;