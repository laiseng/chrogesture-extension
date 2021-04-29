export class StorageUtil {
  static async getSyncValue<T>(param: string) {
    return new Promise<T>((resolve, reject) => {
      try {
        chrome.storage.sync.get(param, (storeVal) => {
          console.log(`Get StorageSync : ${param}=`, storeVal[param]);
          resolve(storeVal[param] as T);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static settSyncValue(setVal: unknown) {
    chrome.storage.sync.set(setVal);
  }
}
