import { OptionStorageModel } from "./models/options-storage.model";

export class CgPopup {
  run() {
    console.log(document.querySelector("#upopenlink"));
    document.querySelector("#upopenlink").addEventListener("click", e => {
      chrome.storage.sync.set({
        UpOpenLink: (e.target as HTMLInputElement).checked
      } as OptionStorageModel);
    });

    chrome.storage.sync.get(o => {
      console.log("[From Background]", o);
      (document.querySelector(
        "#upopenlink"
      ) as HTMLInputElement).checked = (o as OptionStorageModel).UpOpenLink;
    });
  }
}

let options = new CgPopup();
options.run();
