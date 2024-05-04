import io from 'socket.io-client'

// export const socket = io.connect(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`);
export const socket = io.connect("https://rj-automated-api.onrender.com");