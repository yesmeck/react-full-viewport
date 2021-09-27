import * as React from 'react';
import getScrollBarSize from './getScrollBarSize';

const fullViewportStyle = {
  position: 'fixed',
  zIndex: 1000,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

interface FullViewportArgs {
  enter: () => void;
  exit: () => void;
  toggle: () => void;
  style: React.CSSProperties;
  isFull: boolean;
}

interface FullViewportProps {
  children?: (args: FullViewportArgs) => React.ReactNode;
  render?: (args: FullViewportArgs) => React.ReactNode;
}

interface FullViewportState {}

export default class FullViewport extends React.Component<
  FullViewportProps,
  FullViewportState
> {
  state = {
    isFull: false,
  };

  bodyIsOverflowing: boolean;
  scrollbarWidth: number;
  originalPaddingRight: string | null;
  originalOverflow: string | null;

  componentDidUpdate() {
    if (this.state.isFull) {
      this.addScrollingEffect();
    } else {
      this.removeScrollingEffect();
    }
  }

  checkScrollbar = () => {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth =
        documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    if (this.bodyIsOverflowing) {
      this.scrollbarWidth = getScrollBarSize();
    }
  };

  setScrollbar = () => {
    this.originalPaddingRight = document.body.style.paddingRight;
    if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  };

  addScrollingEffect = () => {
    this.checkScrollbar();
    this.setScrollbar();
    this.originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  };

  removeScrollingEffect = () => {
    document.body.style.overflow = this.originalOverflow!;
    this.resetScrollbar();
  };

  resetScrollbar = () => {
    document.body.style.paddingRight = this.originalPaddingRight!;
  };

  enter = () => {
    this.setState({ isFull: true });
  };

  exit = () => {
    this.setState({ isFull: false });
  };

  toggle = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  getArgs = () => {
    const { isFull } = this.state;
    const style = isFull ? fullViewportStyle : {};
    return {
      enter: this.enter,
      exit: this.exit,
      toggle: this.toggle,
      style,
      isFull,
    };
  };

  render() {
    const { children, render } = this.props;
    if (children) {
      return children(this.getArgs());
    } else if (render) {
      return render(this.getArgs());
    }
    return children;
  }
}
