import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export async function setStorage(key: string, value: any): Promise<void> {
  await Storage.set({
    key,
    value: JSON.stringify(value)
  });
}

export async function getStorage(key: string): Promise<any> {
  const item = await Storage.get({ key });
  return JSON.parse(item.value);
}

export async function removeStorage(key: string): Promise<void> {
  await Storage.remove({
    key
  });
}

export async function clearStorage(): Promise<void> {
  await Storage.clear();
}
