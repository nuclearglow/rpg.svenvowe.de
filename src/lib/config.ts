import { dev } from '$app/environment';
import type { Menu } from './types';

/** Metadata */
export const title = 'Plot';
export const description = 'Rooollenspiel';
export const timelineTitle = 'Zeit';

/** Menu */
export const menu: Menu = {
  campaign: [
    {
      text: 'Plot',
      url: '/',
      icon: 'hearth',
      category: 'campaign',
    },
    {
      text: 'Zeit',
      url: '/timeline',
      icon: 'timeline',
      category: 'campaign',
    },
  ],
  lore: [
    {
      text: 'Gruppe',
      url: '/chars',
      icon: 'sheet',
      category: 'lore',
    },
    {
      text: 'Karten',
      url: '/map',
      icon: 'map',
      category: 'lore',
    },
    {
      text: 'Suchen',
      url: '/search',
      icon: 'sheet',
      category: 'lore',
    },
  ],
};

/** Transition Options */
export const transitionDelay = 111;
export const transitionDuration = 666;

/** Search */
export const searchNoResults = 'Nix gefunden';

/** Server */
export const url = dev ? 'http://localhost:5173/' : 'https://rpg.svenvowe.de/';
