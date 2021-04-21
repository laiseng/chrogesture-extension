import { merge, combineLatest, fromEvent } from "rxjs";
import { OptionStorageModel } from "./models/options-storage.model";

export class CgOption {
  upOpenLinkElement = document.querySelector<HTMLInputElement>("#upopenlink");
  forceOverIframe = document.querySelector<HTMLInputElement>(
    "#forceoveriframe"
  );
  run() {
    chrome.storage.sync.set({
      UpOpenLink: true,
      ForceOverIFrame: true,
    } as OptionStorageModel);
    console.log(document.querySelector("#upopenlink"));

    merge([
      fromEvent(this.upOpenLinkElement, "click"),
      fromEvent(this.forceOverIframe, "click"),
    ]).subscribe((x) => {
      console.log("Combined checkbox event", {
        UpOpenLink: this.upOpenLinkElement.checked,
        ForceOverIFrame: this.forceOverIframe.checked,
      });

      chrome.storage.sync.set({
        UpOpenLink: this.upOpenLinkElement.checked,
        ForceOverIFrame: this.forceOverIframe.checked,
      } as OptionStorageModel);
    });

    // document.querySelector("#upopenlink").addEventListener("click", (e) => {});
    // document
    //   .querySelector("#forceoveriframe")
    //   .addEventListener("click", (e) => {
    //     chrome.storage.sync.set({
    //       ForceOverIFrame: (e.target as HTMLInputElement).checked,
    //     } as OptionStorageModel);
    //   });

    // chrome.storage.sync.get((o) => {
    //   console.log("[From Background]", o);
    //   (document.querySelector(
    //     "#upopenlink"
    //   ) as HTMLInputElement).checked = (o as OptionStorageModel).UpOpenLink;
    // });
  }
}

let options = new CgOption();
options.run();

// import * as moment from 'moment';
// import * as $ from 'jquery';

// // Saves options to chrome.storage.sync.
// function save_options() {
//   var color = $('#color').val();
//   var likesColor = $('#like').prop('checked');
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = $('#status');
//     status.text('Options saved.');
//     setTimeout(function() {
//       status.text('');
//     }, 750);
//   });
// }

// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items: {favoriteColor, likesColor}) {
//     $('#color').val(items.favoriteColor);
//     $('#like').prop('checked', items.likesColor);
//   });
// }

// $('#save').click(save_options);
// $(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);
