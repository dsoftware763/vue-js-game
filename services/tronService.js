import TronWeb from 'tronweb';
import { PRIVATE_KEY, EVENT_SERVER } from '../config/config';

const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider(EVENT_SERVER);
const solidityNode = new HttpProvider(EVENT_SERVER);
const eventServer = EVENT_SERVER;
const privateKey = PRIVATE_KEY;

export const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey
);

export let windowObj = window;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function stripHexPrefix(str) {
  if (str.startsWith("0x")) {
    return str.slice(2);
  }
  return str;
}