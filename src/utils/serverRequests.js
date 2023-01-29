import { t } from "i18next";
import { config } from '../constants';

export const serverRequests = async (reqPath, reqMethod, reqBody, CSRF_token, serverFailureAction) => {
	let response
	try {
		response = await fetch(`${config.server_url}${reqPath}`, {
			method: reqMethod,
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify({...reqBody, CSRF_token: CSRF_token}),
		});
	} catch (error) {
		window.location.href = `${config.client_url}/home/error`
		serverFailureAction();
	} 
	if (response.status === 200) {
		if (reqPath === '/recipes/join' && reqMethod ==='POST') {
			try {
				return await response.json()
			} catch(e) { 
				console.log('serverRequest() failed to return response.json()')
				return 
			}
		} else {
			return response
		}
	} else if (response.status === 401) {
		window.alert(t('warnings.AuthError'));
		window.location.href = `${config.client_url}/signin`
	} else {
		serverFailureAction();
		window.alert(t('warnings.ServerError'));
	}
};
