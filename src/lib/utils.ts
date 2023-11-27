import { TIMELINE_OFFSET, TIMELINE_POSTFIX } from '$lib/constants';

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'de') {
  /** Safari is mad about dashes in the date */
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}

export function formatTimelineDate(date: string): string {
  return `${TIMELINE_OFFSET + Number.parseInt(date)} ${TIMELINE_POSTFIX}`;
}

/** Returns a slug of the filename and the file extension */
export function getSlug(path: string, extension: string): string {
  const ext = extension.startsWith('.') ? extension : `.${extension}`;
  return path.split('/').at(-1)?.replace(ext, '') ?? '';
}

/** Returns a SHA-256 in hex format of s */
export async function getHash(s: string) {
  const encoder = new TextEncoder().encode(s);

  return crypto.subtle.digest('SHA-256', encoder).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}

/**
 * Remove all html tags from a content string, with these exceptions:
 *
 * - P,h2 and li are replaced by double newlines for the search method
 */
export function stripTags(s: string): string {
  return s
    .replace(/<p.*?>/gi, '\n\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<h2.*?>/gi, '\n\n')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<li.*?>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n\n')
    .replace(/(<([^>]+)>)/gi, '');
}

/** Returns an array of string indices where a double newline occurs */
export function getAllParagraphIndices(content: string): number[] {
  const indices: number[] = [];
  content.replace(/\n\n/gis, (_, index) => {
    indices.push(index);
    return '';
  });
  indices.push(content.length - 1);
  return indices;
}

/**
 * With the ordered indices of paragraph starting points and an index which needs to be located,
 * return the neighboring array items that clamp the index
 */
export function getParagraphIndices(indices: number[], index?: number): number[] {
  if (!index || !indices?.length) {
    return [];
  }

  let previous: number;
  for (const [arrayIndex, i] of indices.entries()) {
    previous = indices?.[arrayIndex - 1];

    if (index <= i && index >= previous) {
      return [previous, i];
    }

    if (index > i && arrayIndex === indices.length - 1) {
      return [previous, i];
    }
  }

  return [];
}

/**
 * Takes the hash of the content and the content itself and returns true if the location hash
 * matches and searchTerm is found in the content, else false
 */
export function isHighlightedBySearchTerm(paragraphHash: string, paragraphContent: string) {
  let isHighlighted = false;

  const { search, hash } = window.location;

  const urlParams = new URLSearchParams(search);
  const searchTerm = urlParams.get('searchTerm') ?? '';

  if (paragraphHash === hash.substring(1) && searchTerm !== null) {
    isHighlighted = paragraphContent.toLowerCase().includes(searchTerm.toLowerCase());
  }
  return isHighlighted;
}

export function partitionBy<T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
) {
  return arr.reduce(
    (acc, item, index, array) => {
      acc[+!predicate(item, index, array)].push(item);
      return acc;
    },
    [[], []] as [T[], T[]],
  );
}
