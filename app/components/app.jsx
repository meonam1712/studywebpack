import React from 'react';
import BaseComponent from './base';

export default class AppView extends BaseComponent {
  render() {
    return (
      <div id="app-view">
        {this.props.children}
      </div>
    );
  }
}
