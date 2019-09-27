import React, { Component } from 'react';
import { Paper, AppBar, Toolbar, Typography, IconButton, Card, CardHeader, CardContent, CardMedia } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import Loader from './Loader';

const styles = {
  mainDiv: {
    paddingBottom: '80px'
  },
  appBar: {
    backgroundColor: 'teal'
  },
  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    marginTop: '70px',
    maxWidth: 700
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
};

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false
    };
  }
  goBackHome = () => {
    this.props.history.push('/');
  }
  getPost = () => {
    const { params } = this.props.match;
    let { isLoading } = this.state;
    isLoading = true;
    this.setState({
      isLoading
    });
    fetch(`https://epower.ng/wp-json/wp/v2/posts/${params.id}`)
      .then(res => res.json())
      .then(data => this.setState({
        data,
        isLoading: false
      }));
  }
  componentDidMount() {
    this.getPost();
  }
  render() {
    const { isLoading, data } = this.state;
    const dataNotNull = data !== null;
    return <div style={styles.mainDiv}>
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar style={styles.flex}>
          <IconButton edge="start" onClick={this.goBackHome}>
            <Home />
          </IconButton>
          <Typography variant="h6">
            {!dataNotNull && <span>Post title goes here</span>}
            {dataNotNull && <span>{data.title.rendered}</span>}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={styles.flex}>
      <Paper square style={styles.paper}>
        <div style={styles.flex}>
          <Loader visible={isLoading}/>
          {dataNotNull && <div>
            <CardHeader title={data.title.rendered} />
            <CardMedia image={data.featured_image_thumbnail} style={styles.media} />
            <CardContent>
              <Typography color="textPrimary">
                {data.meta._et_pb_old_content}
              </Typography>
            </CardContent>
          </div>}
        </div>
      </Paper>
      </div>
    </div>
  }
}
