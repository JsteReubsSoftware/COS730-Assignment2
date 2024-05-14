import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import * as API from "../api/api";

const ContactCard = ({ contact }) => {
    if (!Cookies.get('jwt') || !socket) {
        window.location.href = '/landing';
    } else if (!socket.connected) {
        socket.connect();
    }

    const [isTyping, setIsTyping] = useState(false);
    const [newMessages, setNewMessages] = useState(0);
    const [userStatus, setUserStatus] = useState(false);
    const [timeAgo, setTimeAgo] = useState('');
    const navigate = useNavigate();

    const handleOnClick = (contact) => {
        setNewMessages(0);
        navigate(`/contacts/view?id=${contact._id}`);
        // window.location.href = `/contacts/view?id=${contact._id}`;
    }

    const getTimeLabel = (timestampMs) => {
        const now = new Date();
        const messageTime = new Date(timestampMs);
      
        // Calculate difference in milliseconds
        const timeDiffMs = now - messageTime;
      
        // Calculate difference in seconds
        const secondsDiff = Math.floor(timeDiffMs / 1000);
      
        // Define thresholds for seconds, minutes, hours, and a day
        const oneMinute = 60;
        const oneHour = oneMinute * 60;
        const oneDay = oneHour * 24;
      
        // Determine appropriate label based on time difference
        if (secondsDiff < oneMinute) {
          return `${secondsDiff} sec ago`;
        } else if (secondsDiff < oneHour) {
          const minutesDiff = Math.floor(secondsDiff / oneMinute);
          return `${minutesDiff} min ago`;
        } else if (secondsDiff < oneDay) {
          const hoursDiff = Math.floor(secondsDiff / oneHour);
          return `${hoursDiff} hour(s)ago`;
        } else if (secondsDiff < oneDay * 2) {  // Check for yesterday within 24 hours
          return `Yesterday at ${messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
          // Format date for messages older than a day
          return messageTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        }
      }

    useEffect(() => {
        let activityTimer;
        socket.on('activity', () => {
            setIsTyping(true);

            // Clear after 3 seconds 
            clearTimeout(activityTimer)
            activityTimer = setTimeout(() => {
                setIsTyping(false);
            }, 3000)
        })

        socket.on('new-message', () => {
            setNewMessages(prev => prev + 1);
        })

        socket.on('users-connected', (users) => {
            if (users.find(user => user.userId === contact._id)) {
                setUserStatus(true);
            } else {
                setUserStatus(false);
            }
        })

        socket.emit('get-users');

        const getLastMessageTime = async () => {
            const res = await API.getMessages(Cookies.get('jwt'), contact._id);

            if (res && res.success) {
                const lastMessageTime = res.data[res.data.length-1].messageTime;

                const time = new Date(lastMessageTime).getTime();

                setTimeAgo(getTimeLabel(time));
            }
        }

        getLastMessageTime();
    //eslint-disable-next-line
    }, []);

    return (
        <div className=" h-[90px] border-b-2 border-b-whitePurple mx-2 grid grid-cols-10 gap-1" onClick={() => handleOnClick(contact)}>
            <div className="col-start-1 col-span-2 py-1 pl-1">
                <img src={contact.profileImg} alt="profile" className="rounded-full w-full h-full "/>
            </div>
            <div className="col-start-3 col-span-5 flex flex-col pl-3 justify-evenly">
                <div className="">{contact.name}</div>
                <div className="flex">
                    <GoDotFill className={`my-auto ${userStatus ? "text-green-400" : "text-smoothGrey"}`}/>
                    <span className={`text-sm my-auto ${userStatus ? "text-green-400" : "text-smoothGrey"}`}>{userStatus ? 'Online' : 'Offline'}</span>
                </div>
            </div>
            <div className="col-start-8 col-span-3 flex flex-col">
                <span className="text-xs text-smoothGrey ml-auto mr-1 mt-2">{timeAgo}</span>
                <div className="flex justify-evenly h-full">
                    <span className={`text-lightPurple italic mt-auto mb-2 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>typing...</span>
                    <div className={`text-smoothWhite rounded-full bg-darkPurple w-[25px] h-[25px] text-sm text-center pt-[1px] mt-auto mb-2 ${newMessages ? 'opacity-100' : 'opacity-0'}`}>{newMessages}</div>
                </div>
            </div>
        </div>
    )
};

export default ContactCard;