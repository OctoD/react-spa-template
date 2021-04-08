import { createElement, useEffect, useLayoutEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { obj } from 'tiinvo';
import { UnaryHOC } from 'types/HOC';

const mapdefault = obj.mapkey(`default`);

const languageselector = (state: ApplicationState) => state.locale.current

export const withLocaleConfig: UnaryHOC = component => props => {
  const [messages, setmessages] = useState({});
  const locale = useSelector(languageselector);

  useEffect(() => {
    import(`../lang/${locale}.json`).then(mapdefault).then(setmessages)
  }, [locale]);

  useLayoutEffect(() => {
    document.getElementsByTagName(`html`)[0].lang = locale;
  }, [locale])
  
  return createElement(
    IntlProvider,
    {
      messages,
      locale,
    },
    createElement(component, props),
  );
}
