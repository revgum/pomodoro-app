// @flow
export default class Api {
  initialState = async () => {
    let response = await fetch('/api/state/init');
    if (response.ok) return await response.json();
    throw new Error(response.status);
  }
}
