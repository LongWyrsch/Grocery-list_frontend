export const serverRequests = async (reqPath, reqMethod, reqBody, navigate, path, serverFailureAction) => {
	let response
	try {
		response = await fetch(`http://localhost:3000${reqPath}`, {
			method: reqMethod,
			credentials: 'include',
			headers: {
				'Content-type': 'application/json',
			},
			// We convert the React state to JSON and send it as the POST body
			body: JSON.stringify(reqBody),
		});
	} catch (error) {
		navigate('/home/error')
		serverFailureAction();
	} 
	if (response.status === 200) {
		return response.json()
	} else if (response.status === 401) {
		window.alert('Failed to authenticate');
		navigate(path);
		console.log('failed')
	} else {
		serverFailureAction();
		window.alert('Server error. Please try again.');
	}
};
