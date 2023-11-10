import { dev } from '$app/environment';

/** Metadata */
export const title = 'Plot';
export const description = 'Rooollenspiel';
export const timelineTitle = 'Zeit';

/** Menu */
export const menuItemChars = 'Gruppe';
export const menuItemMap = 'Karten';
export const menuItemSearch = 'Suchen';
export const campaignUrls = ['/', 'timeline'];

/** Search */
export const searchNoResults = 'Nix gefunden';

/** Server */
export const url = dev ? 'http://localhost:5173/' : 'https://rpg.svenvowe.de/';
