import { EventEmitter } from "events";
class gptEventEmitter extends EventEmitter {}
export const gptEmitter = new gptEventEmitter();
