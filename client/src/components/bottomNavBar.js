import { FaUserCog } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";

const BottomNavBar = ({ currentTab }) => {

    return (
        <div className="bg-smoothWhite h-[70px] w-full absolute bottom-0 grid grid-rows-1 grid-cols-3">
            <Link 
                className={`transition duration-75 col-start-1 col-span-1 border-b-[6px] ${currentTab === 'chatroom' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                to={"/chatroom"}
            >
                <GrGroup className={`${currentTab === 'chatroom' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </Link>
            <Link 
                className={`transition duration-75 col-start-2 col-span- border-b-[6px] ${currentTab === 'contacts' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                to={"/contacts"}
            >
                <IoChatboxEllipses className={`${currentTab === 'contacts' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </Link>
            <Link 
                className={`transition duration-75 col-start-3 col-span-1 border-b-[6px] ${currentTab === 'profile' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                to={"/profile"}
            >
                <FaUserCog className={`${currentTab === 'profile' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </Link>
        </div>
    );
};

export default BottomNavBar;