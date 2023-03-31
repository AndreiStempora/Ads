import {atomWithStorage} from 'jotai/utils';

const skipPageAtom = atomWithStorage("skip page",false);

export default skipPageAtom;