import id from '@/dictionaries/id.json';
import en from '@/dictionaries/en.json';

const dictionaries = {
  id,
  en,
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof id; // Since both should have the same structure

export const getDictionary = (locale: Locale | string): Dictionary => {
  return dictionaries[locale as Locale] || dictionaries.id;
};
