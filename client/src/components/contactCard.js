import { GoDotFill } from "react-icons/go";

const ContactCard = () => {

    return (
        <div className=" h-[90px] border-b-2 border-b-whitePurple mx-2 grid grid-cols-10 gap-1">
            <div className="col-start-1 col-span-2 py-2 pl-1">
                <img src={require("../assets/profile-pic.jpg")} alt="profile" className="rounded-full w-full h-full "/>
            </div>
            <div className="col-start-3 col-span-5 flex flex-col pl-3 justify-evenly">
                <div className="">Username</div>
                <div className="flex">
                    <GoDotFill className="my-auto text-green-400"/>
                    <span className="text-sm my-auto text-green-400">Online</span>
                </div>
            </div>
            <div className="col-start-8 col-span-3 flex flex-col">
                <span className="text-xs text-smoothGrey ml-auto mr-1 mt-2">30min ago</span>
                <div className="flex justify-evenly h-full">
                    <span className="text-lightPurple italic mt-auto mb-2">typing...</span>
                    <div className="text-smoothWhite rounded-full bg-darkPurple w-[25px] h-[25px] text-sm text-center pt-[1px] mt-auto mb-2">2</div>
                </div>
            </div>
        </div>
    )
};

export default ContactCard;