import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props: {
      visible
    }} = this;
    return <div>
      {visible && <CircularProgress/>}
    </div>
  }
}
