import { MessageTypes } from './message-types.enum';
import { GestureTypes } from './gesture-types.enum';
import { Nullable } from '../types';
export interface IBackgroundMessagePayload {
  type: MessageTypes;
  gestures: GestureTypes[];
  url: Nullable<string>;
}
