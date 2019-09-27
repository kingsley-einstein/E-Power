import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class ButtonComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props } = this;
    return <div>
      <Button 
      variant={props.variant} 
      onClick={props.handler} 
      disabled={props.disabled}
      style={props.style}
      >
        {props.text}
      </Button>
    </div>
  }
}
