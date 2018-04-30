import { GestureTypes } from "./cgesture";

// function polling() {
//     console.log('polling');
//     setTimeout(polling, 1000 * 30);
// }

// polling();


chrome.runtime.onMessage.addListener((message, sender, sendResponse: Function) => {
    let direction = message.direction as GestureTypes;
    switch (direction) {
        case GestureTypes.Up:
            chrome.tabs.create({ url: 'chrome://newtab' });
            break;
        case GestureTypes.Down:
            chrome.tabs.remove(sender.tab.id);
            break;
        case GestureTypes.Left:
            break;
        case GestureTypes.Right:
            break;
        default:
            break;
    }
})
