import { MdAddBox } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import ContactCard from "../components/contactCard";

const ContactsPage = () => {
    return (
        <div className="h-screen w-full bg-smoothWhite grid grid-rows-36"> {/* add grids if the screen size is desktop */}
            <div className="w-full h-full bg-transparent flex flex-col p-1 row-start-1 row-span-5">
                <div className="flex">
                    <img src={require("../assets/smile-emoji.png")} width='50px' alt="smile emoji"/>
                    <span className="my-auto ml-2 font-irishGrover">Yahoo! Messenger</span>
                </div>
                <div className="flex justify-between mt-2">
                    <input type="text" placeholder="Search contacts" className="mx-3 mt-2 my-auto w-full focus:outline-none focus:border-darkPurple border-2 border-lightPurple rounded-xl px-2 py-1" />
                    <div className="w-1/2 flex justify-evenly">
                        <div className="bg-smoothWhite">
                            <MdAddBox className="w-full h-full text-darkPurple text-[40px]"/>
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
                    Array.from({ length: 20 }).map((_, index) => <ContactCard key={index} />)
                }
            </div>
            {/* render the contact view page if the screen size allows it */}
        </div>
    )
};

export default ContactsPage