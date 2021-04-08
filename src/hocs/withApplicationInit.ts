import { createElement } from 'react';
import { pipe } from 'tiinvo';
import { UnaryHOC } from 'types/HOC';
import { withBrowserRouterConfig } from './withBrowserRouterConfig';
import { withChakraProvider } from './withChakraProvider';
import { withErrorBoundary } from './withErrorBoundary';
import { withLocaleConfig } from './withLocaleConfig';
import { withStoreConfig } from './withStoreConfig';

const masterhoc = pipe(
  withLocaleConfig,
  withStoreConfig,
  withBrowserRouterConfig,
  withChakraProvider,
  withErrorBoundary,
) as UnaryHOC;

export const withApplicationInit: UnaryHOC = component => masterhoc((props: any) => createElement(component, props));