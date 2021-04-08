import { Box, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { LocaleSelector } from './LocaleSelector';

export interface AppProps {
  
}

export const App: FC<AppProps> = ({

}) => {
  return (
    <Box marginY="10" marginX="auto" maxW="container.sm" textAlign="center">
      <Heading marginBottom="10">
        <FormattedMessage 
          defaultMessage="Hello world"
          id="app.helloworld"
        />
      </Heading>
      <LocaleSelector />
    </Box>
  );
}