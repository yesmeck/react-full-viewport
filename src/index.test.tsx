import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FullViewport from '.';

test('renders', () => {
  render(<FullViewport>{() => <div>hello</div>}</FullViewport>);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

test('toggle full viewport', () => {
  render(
    <FullViewport>
      {({ style, toggle, isFull }) => (
        <div data-testid="box" style={style}>
          <button onClick={toggle}>
            {isFull ? 'exit full' : 'enter full'}
          </button>
          <div>hello</div>
        </div>
      )}
    </FullViewport>
  );
  fireEvent.click(screen.getByText('enter full'));
  expect(screen.getByTestId('box')).toHaveStyle({
    position: 'fixed',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  });
  fireEvent.click(screen.getByText('exit full'));
  expect(screen.getByTestId('box')).toHaveAttribute('style', '');
});

test('config zIndex', () => {
  render(
    <FullViewport zIndex={500}>
      {({ style, toggle, isFull }) => (
        <div data-testid="box" style={style}>
          <button onClick={toggle}>
            {isFull ? 'exit full' : 'enter full'}
          </button>
          <div>hello</div>
        </div>
      )}
    </FullViewport>
  );
  fireEvent.click(screen.getByText('enter full'));
  expect(screen.getByTestId('box').style.zIndex).toBe('500');
});
