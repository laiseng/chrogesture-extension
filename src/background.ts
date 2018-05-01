import { GestureTypes, Gestures } from "./cgesture";

chrome.runtime.onMessage.addListener((message: Gestures, sender, sendResponse: Function) => {

    if (arraysEqual(message.gestures, [GestureTypes.Down])) {
        chrome.tabs.remove(sender.tab.id);
    }

    if (arraysEqual(message.gestures, [GestureTypes.Up])) {
        chrome.tabs.create({ url: 'chrome://newtab' });
    }
    
    if (arraysEqual(message.gestures, [GestureTypes.Left])) {
        chrome.tabs.executeScript(null,{"code": "window.history.back()"});
    }
    
    if (arraysEqual(message.gestures, [GestureTypes.Right])) {
        chrome.tabs.executeScript(null,{"code": "window.history.forward()"});
    }
    if (arraysEqual(message.gestures, [GestureTypes.Up, GestureTypes.Down])) {
        // chrome.history.
        chrome.sessions.restore();
        console.log("updown triggered -undo close tab");
    }
})

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