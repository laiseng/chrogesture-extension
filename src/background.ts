import { GestureTypes } from "./models/gesture-types.enum";
import { BackgroundMessagePayload } from "./models/background-message-payload.interface";
import { MessageTypes } from "./models/message-types.enum";
import { GestureCommandTypes } from "./models/gesture-command-types.model";
import { OptionStorageModel } from "./models/options-storage.model";

export class CgBackground {
  enableUpOpenLink = false;
  constructor() {
    chrome.storage.sync.get(o => {
      console.log("[From Background]", o);
      this.enableUpOpenLink = (o as OptionStorageModel).UpOpenLink;
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (var key in changes) {
        var storageChange = changes[key];
        console.log(
          'Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
          key,
          namespace,
          storageChange.oldValue,
          storageChange.newValue
        );
        console.log("[From Background OnChange]", changes["UpOpenLink"]);
        this.enableUpOpenLink = changes["UpOpenLink"].newValue;
      }
    });
  }

  run() {
    chrome.runtime.onMessage.addListener(
      (message: BackgroundMessagePayload, sender, sendResponse: Function) => {
        let detectedCommand = this.detectGestureCommand(message);
        this.exeGesture(detectedCommand, message, sender, sendResponse);
      }
    );
  }

  exeGesture(
    command: GestureCommandTypes,
    message: BackgroundMessagePayload,
    sender,
    sendResponse: Function
  ) {
    switch (command) {
      case GestureCommandTypes.CloseTab:
        chrome.tabs.remove(sender.tab.id);
        break;
      case GestureCommandTypes.HistoryBack:
        chrome.tabs.executeScript(null, { code: "window.history.back()" });
        break;
      case GestureCommandTypes.HistoryForward:
        chrome.tabs.executeScript(null, { code: "window.history.forward()" });
        break;
      case GestureCommandTypes.NewEmptyTab:
        chrome.tabs.create({ url: "chrome://newtab" });
        break;
      case GestureCommandTypes.OpenLinkInBackground:
        chrome.tabs.create({ url: message.url, active: false });
        break;
      case GestureCommandTypes.UndoCloseTab:
        chrome.sessions.restore();
        break;
    }
  }

  detectGestureCommand(payload: BackgroundMessagePayload): GestureCommandTypes {
    if (this.arraysEqual(payload.gestures, [GestureTypes.Down])) {
      return GestureCommandTypes.CloseTab;
    }

    if (
      this.arraysEqual(payload.gestures, [GestureTypes.Up]) &&
      payload.type == MessageTypes.Gesture
    ) {
      return GestureCommandTypes.NewEmptyTab;
    }

    if (
      this.arraysEqual(payload.gestures, [GestureTypes.Up]) &&
      payload.type == MessageTypes.Url
    ) {
      return this.enableUpOpenLink
        ? GestureCommandTypes.OpenLinkInBackground
        : GestureCommandTypes.NewEmptyTab;
    }

    if (this.arraysEqual(payload.gestures, [GestureTypes.Left])) {
      return GestureCommandTypes.HistoryBack;
    }

    if (this.arraysEqual(payload.gestures, [GestureTypes.Right])) {
      return GestureCommandTypes.HistoryForward;
    }
    if (
      this.arraysEqual(payload.gestures, [GestureTypes.Up, GestureTypes.Down])
    ) {
      return GestureCommandTypes.UndoCloseTab;
    }
  }

  arraysEqual(a: GestureTypes[], b: GestureTypes[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

let background = new CgBackground();
background.run();
