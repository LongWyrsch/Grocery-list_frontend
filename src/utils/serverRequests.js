export const serverRequests = async (reqPath, reqMethod, reqBody, navigateAction, serverFailureAction) => {
	const response = await fetch(`http://localhost:3000${reqPath}`, {
		method: reqMethod,
		credentials: 'include',
		headers: {
			'Content-type': 'application/json',
		},
		// We convert the React state to JSON and send it as the POST body
		body: JSON.stringify(reqBody),
	});
	if (response.status === 200) {
		// Not need to do anything. Slice equals databaase.
		// dispatch(getRecipes());
	} else if (response.status === 401) {
		console.log('failed')
		window.alert('Failed to authenticate');
		navigateAction();
	} else {
		serverFailureAction();
		window.alert('Server error. Please try again.');
	}
};
