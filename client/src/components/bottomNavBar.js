import { FaUserCog } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoChatboxEllipses } from "react-icons/io5";

const BottomNavBar = ({ currentTab }) => {
    console.log(currentTab);
    const navigate = (tab) => {
        switch(tab) {
            case "chatroom":
                return () => window.location.href = "/chatroom";
            case "contacts":
                return () => window.location.href = "/contacts";
            case "profile":
                return () => window.location.href = "/profile";
            default:
                return () => window.location.href = "/contacts";
        }
    }

    return (
        <div className="bg-smoothWhite h-[70px] w-full absolute bottom-0 grid grid-rows-1 grid-cols-3">
            <div 
                className={`transition duration-75 col-start-1 col-span-1 border-b-[6px] ${currentTab === 'chatroom' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                onClick={navigate("chatroom")}
            >
                <GrGroup className={`${currentTab === 'chatroom' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </div>
            <div 
                className={`transition duration-75 col-start-2 col-span- border-b-[6px] ${currentTab === 'contacts' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                onClick={navigate("contacts")}
            >
                <IoChatboxEllipses className={`${currentTab === 'contacts' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </div>
            <div 
                className={`transition duration-75 col-start-3 col-span-1 border-b-[6px] ${currentTab === 'profile' ? 'border-b-darkPurple' : 'border-b-smoothWhite'} border-t-2 border-darkPurple`}
                onClick={navigate("profile")}
            >
                <FaUserCog className={`${currentTab === 'profile' ? 'text-darkPurple' : 'text-lightPurple'} w-full h-full p-4`}/>
            </div>
        </div>
    );
};

export default BottomNavBar;