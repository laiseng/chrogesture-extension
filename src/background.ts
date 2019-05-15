import { GestureTypes, SendMessage, MessageTypes } from "./lib/cg-main";

chrome.runtime.onMessage.addListener(
  (message: SendMessage, sender, sendResponse: Function) => {
    switch (message.type) {
      case MessageTypes.Gesture:
        exeGesture(message.value as GestureTypes[], sender, sendResponse);
        break;
      case MessageTypes.Url:
        exeOpenLink(message.value as string, sender, sendResponse);
        break;
    }
  }
);

function exeOpenLink(payload: string, sender, sendResponse: Function) {
  console.log("OpeningLink", payload);
  chrome.tabs.create({ url: payload });
}
function exeGesture(payload: GestureTypes[], sender, sendResponse: Function) {
  if (arraysEqual(payload, [GestureTypes.Down])) {
    chrome.tabs.remove(sender.tab.id);
  }

  if (arraysEqual(payload, [GestureTypes.Up])) {
    chrome.tabs.create({ url: "chrome://newtab" });
  }

  if (arraysEqual(payload, [GestureTypes.Left])) {
    chrome.tabs.executeScript(null, { code: "window.history.back()" });
  }

  if (arraysEqual(payload, [GestureTypes.Right])) {
    chrome.tabs.executeScript(null, { code: "window.history.forward()" });
  }
  if (arraysEqual(payload, [GestureTypes.Up, GestureTypes.Down])) {
    // chrome.history.
    chrome.sessions.restore();
  }
}

function arraysEqual(a, b) {
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
