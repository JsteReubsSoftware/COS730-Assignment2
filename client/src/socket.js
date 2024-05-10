import io from 'socket.io-client'
import Cookies from 'js-cookie'

export const socket = io.connect(`ws://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
    extraHeaders: {
        'token': Cookies.get('jwt'),
    }
});

socket.on('connect', () => {
    console.log('connected');
    socket.emit('user-connected');
});
// export const socket = io.connect("https://rj-automated-api.onrender.com");