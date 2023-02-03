import { screen } from '@testing-library/react';

import { serverRequests } from './serverRequests';

// Mocking API requests
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
	// Mocking fetch request returning an error
	rest.put(`http://localhost:3000/200`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ response: 'success' }), ctx.delay(150));
	}),
	
    rest.put(`http://localhost:3000/500`, (req, res, ctx) => {
		return res(ctx.status(500), ctx.json({ response: 'failure' }), ctx.delay(150));
	}),
];
const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

it('catches thrown errors', async () => {
	const reqPath = '/somepath';
	const reqMethod = 'GET';
	const reqBody = {error: 'error'};
	const CSRF_token = '';
	const serverFailureAction = () => 'serverFailure';

	const response = await serverRequests(reqPath, reqMethod, reqBody, CSRF_token, serverFailureAction);
	expect(response).toBe('serverFailure'); 
});

it('returns a successful fetch', async () => {
	const reqPath = '/200';
	const reqMethod = 'PUT';
	const reqBody = {};
	const CSRF_token = '';
	const serverFailureAction = () => 'serverFailure';

	const response = await serverRequests(reqPath, reqMethod, reqBody, CSRF_token, serverFailureAction);
	const result = await response.json();
	expect(result.response).toBe('success');
});

it('handles other failure statuses', async () => {
	const reqPath = '/500';
	const reqMethod = 'PUT';
	const reqBody = {};
	const CSRF_token = '';
	const serverFailureAction = () => 'serverFailure';

	const response = await serverRequests(reqPath, reqMethod, reqBody, CSRF_token, serverFailureAction);
	expect(response).toBe('serverFailure');
});
