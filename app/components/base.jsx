import React from 'react';

export default class BaseComponent extends React.Component {
  /*registerMethods(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }*/
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
}
