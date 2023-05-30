import { format } from 'date-fns';

const getLocale = (locale) => import(`date-fns/locale/${locale}/index.js`);

export const formatDate = async (date, formatStyle, locale) => {
  const localeModule = await getLocale(locale);
  return format(date, formatStyle, {
    locale: localeModule.default,
  });
};
