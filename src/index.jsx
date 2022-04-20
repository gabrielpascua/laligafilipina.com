// JS Goes here - ES6 supported
import "./css/main.css";

import { createElement, Component } from "react";
import { createRoot } from "react-dom/client";

'use strict';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return createElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#app :last-child');
const root = createRoot(domContainer);
root.render(createElement(LikeButton));