import io from 'socket.io-client'
import Cookies from 'js-cookie'

class SocketClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.socket = null;
    this.connected = false;
  }

  connect() {
    try {
      this.socket = io(this.serverUrl);
      this.connected  = true;

      this.socket.on('connect', () => {
        console.log('connected');
        this.socket.emit('user-connected', Cookies.get('jwt'));
      });

      // Handle other events as needed (disconnection, errors, etc.)
    } catch (error) {
      console.error('Socket connection error:', error);
      // Implement error handling or retry logic (optional)
    }
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  off(event, callback) {
    this.socket.off(event, callback);
  }

  emit(event, ...args) {
    this.socket.emit(event, ...args);
  }

  // Add other methods for sending/receiving messages if needed

  // Optional: Implement a disconnect method if required
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
    }
  }
}

// Usage in other components:
// export const socket = new SocketClient("https://rj-automated-api.onrender.com");
export const socket = new SocketClient(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`);
