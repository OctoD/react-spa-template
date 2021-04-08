import { prefix } from 'redux-aar';

const create = prefix(`locale`);

export const set = create<string>(`set`);
