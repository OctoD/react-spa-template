import { createElement } from 'react';
import { Provider } from 'react-redux';
import { UnaryHOC } from 'types/HOC';
import { store } from 'store';

export const withStoreConfig: UnaryHOC = component => props =>
  createElement(
    Provider,
    {
      store,
    },
    createElement(component, props)
  )
  ;