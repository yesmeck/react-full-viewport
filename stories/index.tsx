import * as React from 'react';
import { storiesOf } from '@storybook/react';
import FullViewport from '../src';

storiesOf('Example', module).add('usage', () => (
  <div style={{ background: 'steelblue' }}>
    <div style={{ background: 'yellow' }}>Header</div>
    <FullViewport>
      {({ toggle, isFull, style }) => (
        <div style={{ width: '200px', height: '200px', background: 'red', ...style }}>
          <button onClick={toggle}>
            {isFull ? 'Exit' : 'Enter'} full viewport
          </button>
        </div>
      )}
    </FullViewport>
    <div style={{ height: '1024px' }} />
    <div style={{ background: 'blue' }}>Footer</div>
  </div>
));
