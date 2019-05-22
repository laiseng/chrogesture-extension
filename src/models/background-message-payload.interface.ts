import { MessageTypes } from "./message-types.enum";
import { GestureTypes } from "./gesture-types.enum";
export interface BackgroundMessagePayload {
  type: MessageTypes;
  gestures: GestureTypes[];
  url: string;
}
