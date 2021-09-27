# react-full-viewport

A React component that sets its children to full viewport.

## Installation

```bash
$ yarn add react-full-viewport
```

## Usage

```javascript
import FullViewport from 'react-full-viewport';

<FullViewport>
  {({ toggle, isFull, style }) => (
    <div style={style}>
      <button onClick={toggle}>
        {isFull ? 'Exit' : 'Enter'} full viewport
      </button>
    </div>
  )}
</FullViewport>
```


## License

[MIT](LICENSE)
