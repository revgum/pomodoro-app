import { isNullOrUndefined } from "util";

const initialState = {
  test: 'test'
};

export default class Api {
  initialState = (error) => {
    if(!error) return initialState;
    throw new Error('mocked error');
  }
}
