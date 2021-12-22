const config = {
    BASE_URL: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : process.env.API_IP,
    SOCKET_PATH: '/socket.io',
}

export default config;