const production = {
	client_url: 'https://mygrocerylists.netlify.app',
	server_url: 'https://grocery-list-backend-chf6hbgrgeh7f3bu.canadaeast-01.azurewebsites.net'
};

const development = {
	client_url: 'http://localhost:3001',
	server_url: 'http://localhost:3000'
};

export const config = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? development : production;