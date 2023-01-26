import { t } from "i18next";

export const serverRequests = async (reqPath, reqMethod, reqBody, serverFailureAction) => {
	let response
	try {
		response = await fetch(`https://mygrocerylists.up.railway.app${reqPath}`, {
			method: reqMethod,
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify(reqBody),
		});
	} catch (error) {
		window.location.href = 'https://mygrocerylists.netlify.app/home/error'
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
		window.location.href = 'https://mygrocerylists.netlify.app/signin'
	} else {
		serverFailureAction();
		window.alert(t('warnings.ServerError'));
	}
};
