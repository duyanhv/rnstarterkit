import {MMKV} from 'react-native-mmkv';
export const _storage = new MMKV();
const get = async <T = string | Object>(key: string, needDeserialized: boolean = true): Promise<T | undefined> => {
  try {
    const value = _storage.getString(key);
    if (!value) {
      return undefined;
    }
    return value && needDeserialized ? JSON.parse(value as string) : value;
  } catch (e) {
    // saving error
    return undefined;
  }
};

const set = async <T = string | Object>(key: string, value: T): Promise<void> => {
  try {
    _storage.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    // getting error
  }
};

const remove = async (key: string): Promise<void> => {
  try {
    _storage.delete(key);
  } catch (e) {
    // getting error
  }
};

export const storage = {
  get,
  set,
  remove,
};
