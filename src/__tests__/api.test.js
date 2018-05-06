// Mock the api calls for testing, see ../__mocks__/api.js
jest.mock('../api');

import Api from '../api';

it('returns initital state', async () => {
  const data = await new Api().initialState();
  expect(data).toEqual({test: 'test'});
});
