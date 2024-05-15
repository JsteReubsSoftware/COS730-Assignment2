import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const ConfirmDeleteModal = ({ isOpen, onClose, deleteAccount}) => {

    if (!isOpen) return null;    
    
    return (        
        <div className="relative opacity-100 bg-lightPurple max-w-[1024px] w-full h-full flex flex-col justify-center border-2 border-darkPurple rounded-xl">
            <MdOutlineClose onClick={() => onClose()} className="absolute top-1 right-1 text-3xl text-black"/>
            <div className="flex flex-col h-full m-2 justify-between">
                <label className="self-center text-xl font-bold">Confirm Account Deletion</label>
                <div className="mx-10 text-center flex flex-col">
                    <label className="text-center text-lg">Are you sure you want to delete your account? </label>
                    <label className="italic text-sm mt-2">(This action cannot be undone)</label>
                </div>
                <div className="flex justify-evenly">
                    <div className={`mx-2 px-5 mb-5 flex justify-center bg-whitePurple p-2 rounded-xl`} onClick={() => onClose()}>
                        <label className="text-sm my-auto">Cancel</label>
                    </div>
                    <div className={`mx-2 mb-5 flex justify-center bg-whitePurple p-2 rounded-xl`} onClick={() => deleteAccount()}>
                        <RiDeleteBinLine className="text-3xl"/>
                        <label className="text-sm my-auto">Delete Account</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal;