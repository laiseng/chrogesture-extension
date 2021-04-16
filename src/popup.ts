import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OptionStorageModel } from './models/options-storage.model';

export class CgPopup {
  upOpenLinkElement = document.querySelector<HTMLInputElement>('#upopenlink');
  forceOverIframe = document.querySelector<HTMLInputElement>('#forceoveriframe');
  run() {
    chrome.storage.sync.get('UpOpenLink', (x) => {
      console.log('this is what i get UpOpenLink', x.UpOpenLink);
      this.upOpenLinkElement.checked = x.UpOpenLink as boolean;
    });

    chrome.storage.sync.get('ForceOverIFrame', (x) => {
      console.log('this is what i get ForceOverIFrame', x.ForceOverIFrame);
      this.forceOverIframe.checked = x.ForceOverIFrame as boolean;
    });

    merge(fromEvent(this.upOpenLinkElement, 'click'), fromEvent(this.forceOverIframe, 'click'))
      .pipe(
        tap((tapitem) => {
          console.log(tapitem);
        })
      )
      .subscribe((ev) => {
        console.log('Combined checkbox event', {
          UpOpenLink: this.upOpenLinkElement.checked,
          ForceOverIFrame: this.forceOverIframe.checked,
        });

        chrome.storage.sync.set({
          UpOpenLink: this.upOpenLinkElement.checked,
          ForceOverIFrame: this.forceOverIframe.checked,
        } as OptionStorageModel);
      });
  }
}
let options = new CgPopup();
options.run();
