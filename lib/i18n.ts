export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/**
 * A field that can carry one value per launched locale. English is mandatory;
 * additional locales are added to `locales` and filled in per field.
 */
export type Localized<T = string> = { en: T } & Partial<
  Record<Exclude<Locale, 'en'>, T>
>

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function localize<T>(
  value: Localized<T>,
  locale: Locale = defaultLocale,
): T {
  const byLocale = value as Partial<Record<Locale, T>>
  return byLocale[locale] ?? value[defaultLocale]
}

export function localePath(path: string, locale: Locale = defaultLocale) {
  return locale === defaultLocale ? path : `/${locale}${path}`
}
