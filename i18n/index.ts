import { createTranslator } from 'next-intl';
import enMessages from './en.json';
import viMessages from './vi.json';

const messages = { en: enMessages, vi: viMessages };

export function getTranslator(locale: 'en' | 'vi') {
  return createTranslator({ locale, messages: messages[locale] });
}
