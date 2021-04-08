import { App } from 'app';
import { withApplicationInit } from 'hocs/withApplicationInit';
import React from 'react';
import { render } from 'react-dom';

const element = document.getElementById(`root`);

const ConfiguredApp = withApplicationInit(App);

const node = (
  <React.StrictMode>
    <ConfiguredApp />
  </React.StrictMode>
);

render(node, element);
