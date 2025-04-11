import type { OutgoingMessageHandler, OutgoingMessageType } from "@darrenkuro/pong-core";
import { createStore } from "../../global/store";

// What other data should be stored? start time? duration? names?
type WsState = {
    isConnected: boolean;
    conn: WebSocket | null;
    handlers: Map<OutgoingMessageType, OutgoingMessageHandler<OutgoingMessageType>>;
};

export const emptyWsState: WsState = {
    isConnected: false,
    conn: null,
    handlers: new Map(),
};

export const wsStore = createStore<WsState>(emptyWsState);
