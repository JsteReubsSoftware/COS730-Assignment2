import { useEffect, useState, useRef, Fragment } from "react";
import Cookies from 'js-cookie';
import * as API from "../api/api";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { MdAddBox } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { ImSpinner10 } from "react-icons/im";

import { socket } from "../socket";

const ViewContactPage = () => {  
    if (!Cookies.get('jwt') || !socket) {
        window.location.href = '/landing';
    } else if (!socket.connected) {
        socket.connect();
    }

    const messagesContainerRef = useRef(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [viewedUser, setViewedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messagesSent, setMessagesSent] = useState([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    // eslint-disable-next-line
    const [timerId, setTimerId] = useState(null);
    const [spinnerText, setSpinnerText] = useState("Loading...");
    const [isTyping, setIsTyping] = useState(false);
    const [userStatus, setUserStatus] = useState(false);

    const handleSendMessage = async (event, text) => {
        const res = await API.sendMessage(Cookies.get('jwt'), viewedUser._id, text);

        if (res.success) {
            setMessage("");
            document.getElementById("message-input").focus();
            document.getElementById("message-input").value = "";

            // use socket to emit message
            socket.emit('private-message', res.data.receiverId, Cookies.get('jwt'), text, new Date(res.data.messageTime).getTime());
        } else {
            console.log(res.message);
        }
        // socket.emit('private-message', viewedUser._id, Cookies.get('jwt'), text, new Date().getTime());
        // const msgInput = document.getElementById("message-input"); 
        // msgInput.value = "";
        // msgInput.focus();

        event.stopPropagation();
    }

    const formatTime = (time) => {
    //     // Test cases: Today
    //     const todayTestTime = new Date().getTime();

    //     // Test cases: Yesterday
    //     const yesterdayTestTime = new Date().getTime() - (1000 * 60 * 60 * 24); // Subtract a day in milliseconds

    //     // Test cases: This week (Monday to Sunday)
    //     const thisWeekTestTime = new Date().getTime() - (1000 * 60 * 60 * 24 * 2); // Subtract 2 days

    //     // Test cases: More than a week ago
    //     const moreThanWeekTestTime = new Date().getTime() - (1000 * 60 * 60 * 24 * 8); // Subtract 8 days

        const messageTime = new Date(time); // Create a Date object from the timestamp
        const now = new Date(); // Get the current date and time

        // Calculate the difference in days between the message time and now
        //eslint-disable-next-line
        const daysDifference = Math.floor((now - messageTime) / (1000 * 60 * 60 * 24));

        let formattedTime;
        const hours = messageTime.getHours();
        const minutes = messageTime.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero if needed
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format (12 for midnight)

        formattedTime = `${formattedHours}:${minutes} ${amPm}`;

        return formattedTime;
    }

    const handleChange = (event) => {
        setMessage(event.target.value)

        socket.emit('activity', viewedUser._id);
    }

    useEffect(( ) => {
        const updateMessage = () => {
            let newMessage;
            const currentTime = Date.now();
      
            if (currentTime - startTime < 2000) {
              newMessage = 'Loading...';
            } else if (currentTime - startTime < 5000) {
              newMessage = 'Almost there...';
            } else if (currentTime - startTime < 10000) {
              newMessage = 'Taking longer than usual';
            } else {
              newMessage = 'Loading...';
              startTime = currentTime; // Reset timer after full cycle
            }
      
            setSpinnerText(newMessage);
        };
    
        let startTime = Date.now(); // Initial start time
        const timer = setInterval(updateMessage, 1000); // Update every second
    
        setTimerId(timer);


        if (Cookies.get('jwt')) {
            const getStates = async () => {
                const urlSearchString = window.location.search;       
                const params = new URLSearchParams(urlSearchString);    

                const res = await API.getUserById(Cookies.get('jwt'), params.get('id'));
                
                if (res.user) {
                    setViewedUser(res.user);

                    const newRes = await API.getMessages(Cookies.get('jwt'), res.user._id);

                    if (newRes && newRes.success) {
                        // format all the messages' times
                        newRes.data.forEach(message => {
                            message.formattedTime = formatTime(message.messageTime);
                        });
                        setMessagesSent(newRes.data);
                        setMessagesLoaded(true);
                        clearInterval(timer);
                    } else if (newRes) {
                        console.log(newRes.message);
                    }
                }
            };
    
            getStates();

            const messageContainer = document.querySelector('.message-list'); // Replace with actual class
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
            }
        } 
        else {
            window.location.href = "/landing";
        }

        socket.on('private-message', async (receiver, sender, content, time) => {
            // translate message to our preferred language
            // const res = await API.translateMessage(Cookies.get('jwt'), content);

            // if (res && !res.success) {
            //     console.log(res.message);
            //     return;
            // }

            //censor text
            const res = await API.censorText(Cookies.get('jwt'), content);

            if (res && !res.success) {
                console.log(res.message);
                return;
            }

            content = res.data.censored_text;

            if (content) {
                const formattedTime = formatTime(time);
                setMessagesSent(messagesSent => [...messagesSent, 
                    {
                        receiverId: receiver, 
                        senderId: sender,
                        text: content, 
                        messageTime: time,
                        formattedTime: formattedTime 
                    }
                ]);
            }
        });

        let activityTimer;
        socket.on('activity', () => {
            setIsTyping(true);

            // Clear after 3 seconds 
            clearTimeout(activityTimer)
            activityTimer = setTimeout(() => {
                setIsTyping(false);
            }, 3000)
        })

        return ( ) => { socket.off('disconnect') };

    //eslint-disable-next-line
    }, []);

    useEffect(() => {
        socket.on('users-connected', (users) => {
            if (viewedUser && users.find(user => user.userId === viewedUser._id)) {
                setUserStatus(true);
            } else {
                setUserStatus(false);
            }
        });

        socket.emit('get-users');
    }, [viewedUser]);

    useEffect(() => {
        // Scroll to bottom whenever messages update
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth' // Animate the scroll
        });

        if (!hasScrolled && viewedUser && document.querySelector('.message-list')) {
            document.querySelector('.message-list').scrollTop = document.querySelector('.message-list').scrollHeight;
            setHasScrolled(true);
        }
    }, [messagesSent, hasScrolled, viewedUser]); // Re-run effect only when messagesSent changes

    const getDateLabel = (time) => {

        const messageTime = new Date(time); // Create a Date object from the timestamp
        // set current date and time to start of today at 00:00:00
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        now.setMilliseconds(0);

        // Calculate the difference in days between the message time and now
        const daysDifference = Math.floor((now - messageTime) / (1000 * 60 * 60 * 24));

        let formattedTime;
        //eslint-disable-next-line
        const hours = messageTime.getHours();
        // const minutes = messageTime.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero if needed
        // const amPm = hours >= 12 ? 'PM' : 'AM';
        // const formattedHours = hours % 12 || 12; // Convert to 12-hour format (12 for midnight)

        if (daysDifference === 0) {
            // Today
            formattedTime = `Today`;
        } else if (daysDifference === 1) {
            // Yesterday
            formattedTime = `Yesterday`;
        } else if (daysDifference <= 7) {
            // This week (Monday to Sunday)
            const weekday = new Intl.DateTimeFormat([], { weekday: 'long' }).format(messageTime);
            formattedTime = `${weekday}`;
        } else {
            // More than a week ago
            const formattedDate = messageTime.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            formattedTime = formattedDate;
        }

        return formattedTime;
    }

    return viewedUser && messagesLoaded ? (
        <div className="h-screen w-full grid grid-rows-36" style={{backgroundImage: `url(${require('../assets/chat-bg.jpg')})`}}>
            <div className="row-start-1 row-span-3 bg-darkPurple grid grid-cols-12">
                <div className="col-start-1 col-span-1 w-full h-full">
                    <IoArrowBackOutline className=" text-smoothWhite text-4xl h-full ml-2" onClick={() => window.history.back()} />
                </div>
                <div className="col-start-2 col-span-9 grid grid-cols-12 w-full h-full">
                    <img src={viewedUser.profileImg} alt="profile" className="col-start-1 col-span-3 ml-2 rounded-full p-2"/>
                    
                    <div className="flex flex-col pl-3 col-start-4 col-span-9">
                        <div className="w-full h-full my-auto text-2xl text-smoothWhite mt-2">{viewedUser.name}</div>
                        
                        <div className="w-full h-full pt-2">
                            <div className="flex pr-3 justify-start font-bold">
                                <GoDotFill className={`my-auto ${userStatus ? "text-green-400" : "text-smoothGrey"}`}/>
                                <span className={`text-sm my-auto ${userStatus ? "text-green-400" : "text-smoothGrey"}`}>{userStatus ? 'Online' : 'Offline'}</span>
                                <span className={`ml-3 text-lightPurple italic text-sm ${isTyping ? 'opacity-100' : 'opacity-0'}`}>typing...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-11 col-span-2">
                    <MdCall className=" text-smoothWhite text-4xl h-full mx-auto opacity-50" />
                </div>
            </div>
            <div className="relative row-start-4 row-span-30 bg-opacity-80 bg-smoothWhite">
                <div key={0} ref={messagesContainerRef} id="message-list" className="h-full w-full flex flex-col pt-3 overflow-y-scroll scroll-smooth">
                    {messagesSent.map((message, index) => {
                        return (
                            <Fragment key={`${message.formattedTime + index + viewedUser._id}`}>
                                {index === 0 && index !== messagesSent.length - 1 && getDateLabel(message.messageTime) !== getDateLabel(messagesSent[index + 1].messageTime) && (
                                    <div key={message.formattedTime + `${index}`} className="text-smoothWhite text-sm bg-lightPurple rounded-lg mx-auto p-1">
                                        {getDateLabel(message.messageTime)}
                                    </div>
                                )}
                                <div key={`${message.messageTime} + ${index}`} className={`px-3 py-1 w-fit h-auto my-1 mx-2 rounded-xl ${message.senderId === viewedUser._id ? "self-start bg-slate-300" : "self-end bg-lightPurple"}`}>
                                    <div className="w-fit max-w-80 break-words">{message.text}</div>
                                    <div className={`${message.senderId === viewedUser._id ? "text-smoothGrey" : "text-whitePurple"} text-[10px] font-bold text-end`}>{message.formattedTime}</div>
                                </div>
                                {index > 0 && index !== messagesSent.length - 1 && getDateLabel(message.messageTime) !== getDateLabel(messagesSent[index + 1].messageTime) && (
                                    <div key={message.formattedTime + `${index}`} className="text-smoothWhite text-sm bg-lightPurple rounded-lg mx-auto p-1">
                                        {getDateLabel(message.messageTime)}
                                    </div>
                                )}
                            </ Fragment>
                        );
                    })}
                </div>
                
            </div>
            <div className="w-full row-start-34 row-span-3 grid grid-cols-36 bg-darkPurple ">
                <div className="h-full w-full col-start-1 col-span-7 flex justify-evenly">
                    <MdAddBox className="text-smoothWhite text-4xl h-full mx-auto"/>
                    <FaRegImage className="text-smoothWhite text-4xl h-full mx-auto"/>
                </div>
                <div className="h-[50px] col-start-8 col-span-29 mx-2 my-auto bg-smoothWhite flex justify-between rounded-xl border-2 border-darkPurple">
                    <input id="message-input" type="text" placeholder="Type a message" className="text-lg w-full h-full bg-transparent outline-none border-none px-2 py-1" onChange={(e) => handleChange(e)}/>
                    <IoSend className={`mx-2 text-darkPurple text-2xl h-full my-auto ${message !== "" ? "cursor-pointer" : "opacity-60"}`} onClick={(e) => message !== "" && handleSendMessage(e, message)}/>
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
                <label className="w-full h-full text-md mt-2 text-darkPurple text-center">{spinnerText}</label>
            </div>
        </div>
    )
}

export default ViewContactPage;