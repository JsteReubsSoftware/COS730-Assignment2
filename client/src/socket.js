import io from 'socket.io-client'

export const socket = io.connect(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`);