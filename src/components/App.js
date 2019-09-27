import React, { Component } from 'react';
import MainPage from './Mainpage';
import Post from './Post';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = {
  appBar: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    top: 'auto',
    bottom: 0,
    backgroundColor: 'teal'
  }
};

export default class App extends Component {
  componentDidMount() {
    console.log('App has mounted');
  }
  render() {
   return <Router>
     <div>
       <Route exact path="/" component={MainPage} />
       <Route exact path="/post/:id" component={Post} />
     </div>
     <div>
       <AppBar position="fixed" style={styles.appBar}>
         <Toolbar>
           <Typography>
             &copy; 2019
           </Typography>
         </Toolbar>
       </AppBar>
     </div>
   </Router> 
  }
}