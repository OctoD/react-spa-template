import { ChakraProvider } from '@chakra-ui/react';
import { createElement } from 'react';
import { theme } from 'theme';
import { UnaryHOC } from 'types/HOC';

export const withChakraProvider: UnaryHOC = component => props => 
  createElement(
    ChakraProvider,
    {
      theme
    },
    createElement(component, props)
  );