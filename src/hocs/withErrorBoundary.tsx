import React from 'react';
import { FC } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { UnaryHOC } from 'types/HOC';

const ErrorFallback: FC<FallbackProps> = ({
  error, 
  resetErrorBoundary,
}) => {
  console.log(error)
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export const withErrorBoundary: UnaryHOC = Component => props => {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Component {... props}/>
    </ErrorBoundary>
  )
}