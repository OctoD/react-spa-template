import { createReducer } from 'redux-aar';
// @ts-ignore
import * as locale from 'locales'
import * as actions from './actions';
import { obj } from 'tiinvo';

interface State {
  current: string;
  locales: string[][];
}

const initialstate = (): State => ({
  current: locale.defaultlanguage,
  locales: obj.entries(locale.languagesObject),
})

const reducer = createReducer(initialstate());

reducer.on(actions.set, (state, current) => ({ ... state, current }));

export default reducer.reduce();
