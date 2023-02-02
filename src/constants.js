const production = {
	client_url: 'https://mygrocerylists.netlify.app',
	server_url: 'https://mygrocerylists.up.railway.app/'
};

const development = {
	client_url: 'http://localhost:3001',
	server_url: 'http://localhost:3000'
};

export const config = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? development : production;