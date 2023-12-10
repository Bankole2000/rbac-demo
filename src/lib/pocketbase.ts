// import { config } from "../utils/config";

const PocketBase = require('pocketbase/cjs');
// import PocketBase from 'pocketbase'

let pb: typeof PocketBase;

export const setPB = async (url: string) => {
  pb = new PocketBase(url);
}

export const getPB = () => pb;