require('dotenv').config(); // Load environment variables from .env file
import Server from './Server.js';
const server = new Server();
server.start();