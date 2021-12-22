const config = {
    BASE_URL: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.API_IP as string : 'http://localhost:5000',
    SOCKET_PATH: '/socket.io'
};

export default config;