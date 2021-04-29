import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageUtil } from './lib/storage';
import { OptionStorageModel } from './models/options-storage.model';

export class CgPopup {
  upOpenLinkElement = document.querySelector<HTMLInputElement>('#upopenlink');
  forceOverIframe = document.querySelector<HTMLInputElement>('#forceoveriframe');
  async run() {
    await this.checkForStorageOptions();
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

  async checkForStorageOptions() {
    //set default value
    this.upOpenLinkElement.checked = await StorageUtil.getSyncValue<boolean>('UpOpenLink');
    if (this.upOpenLinkElement.checked == undefined) {
      this.upOpenLinkElement.checked = true;
      chrome.storage.sync.set({ UpOpenLink: this.upOpenLinkElement.checked });
    }

    //set default value
    this.forceOverIframe.checked = await StorageUtil.getSyncValue<boolean>('ForceOverIFrame');
    if (this.forceOverIframe.checked == undefined) {
      this.forceOverIframe.checked = true;
      chrome.storage.sync.set({ UpOpenLink: true });
    }
    console.log('this is what i get UpOpenLink', this.upOpenLinkElement.checked);
    console.log('this is what i get ForceOverIFrame', this.forceOverIframe.checked);
  }
}

let options = new CgPopup();
options
  .run()
  .then(() => {
    console.log('Popup run completed');
  })
  .catch((err) => {
    console.log('Popup run with error:', err);
  });
