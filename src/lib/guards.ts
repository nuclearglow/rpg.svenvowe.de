import type { MarkdownFile } from '$lib/types';

export const isMarkdownFile = (file: unknown): file is MarkdownFile =>
  Boolean(
    file !== undefined &&
      file !== null &&
      typeof file === 'object' &&
      'metadata' in file &&
      'default' in file &&
      file.default &&
      typeof file.default === 'object' &&
      'render' in file.default &&
      typeof file.default.render === 'function',
  );
