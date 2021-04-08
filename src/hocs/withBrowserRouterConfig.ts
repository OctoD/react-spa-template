import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UnaryHOC } from 'types/HOC';

export const withBrowserRouterConfig: UnaryHOC = component => props =>
  createElement(
    BrowserRouter,
    {},
    createElement(component, props),
  );
  