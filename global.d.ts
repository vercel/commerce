import it from './messages/it.json';

type Messages = typeof it;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
