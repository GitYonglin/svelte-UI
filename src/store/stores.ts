import { writable } from 'svelte/store';

export const menus = writable<Array<string>>([]);
export const showName = writable<String>('AutoInput');
export const sysId = writable<number>(0);
