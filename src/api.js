export default class Api {
  initialState = async () => {
    let response = await('/api/state/init');
    if (response.ok) return await response.json();
    throw new Error(response.status);
  }
}
