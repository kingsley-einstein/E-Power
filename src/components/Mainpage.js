import React, { Component } from 'react';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, IconButton, AppBar, Toolbar } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';
import Loader from './Loader';
import ButtonComponent from './Button';

const styles = {
  mainDiv: {
    paddingBottom: 80
  },
  flexStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px'
  },
  cardStyle: {
    maxWidth: 300,
    margin: '8px'
  },
  mediaStyle: {
    height: 0,
    paddingTop: '56.25%'
  },
  appBar: {
    backgroundColor: 'teal',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'teal',
    margin: '8px'
  }
};


export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      hasError: false,
      isLoading: false,
      totalPages: 0,
    };
  }
  incrementPageNumber = () => {
    let { page } = this.state;
    page = page + 1;
    this.setState({ page }, this.pingApi());
  }
  decreasePageNumber = () => {
    let { page } = this.state;
    page = page - 1;
    this.setState({ page }, this.pingApi());
  }
  pingApi = () => {
    let { page, isLoading } = this.state;
    isLoading = true;
    this.setState({ isLoading });
    fetch(`https://epower.ng/wp-json/wp/v2/posts?page=${page}&per_page=6`)
      .then(res => {
        const pages = res.headers.get('x-wp-totalpages');
        const totalPages = parseInt(pages, 10);
        this.setState({
          totalPages
        });
        return res.json();
      })
      .then((data) => this.setState({
        data,
        isLoading: false
      }));
  }
  navigateToPost = (post) => {
    this.props.history.push(`/post/${post.id}`);
  }
  componentDidMount() {
    this.pingApi();
  }
  render() {
    const { state } = this;
    const { data, isLoading, page, totalPages } = state;
    return <div style={styles.mainDiv}>
    <AppBar position="fixed" style={styles.appBar}>
      <Toolbar>
        <Typography variant="h6">
          EPOWER BLOG APP
        </Typography>
      </Toolbar>
    </AppBar>
      {data.length > 0 && <div style={styles.flexStyle}>
        {data.map((item, index) => {
          return (
            <Card key={index} raised style={styles.cardStyle}>
              <CardHeader 
              avatar={
                <Avatar>
                  <img src={item.featured_image_thumbnail} />
                </Avatar>
              } 
              title={item.title.rendered} />
              <CardMedia image={item.featured_image_thumbnail} title={item.title.rendered} style={styles.mediaStyle} />
              <CardContent>
                <Typography component="p" color="textSecondary">
                  {item.excerpt.rendered}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={() => this.navigateToPost(item)}>
                  <FolderOpen />
                </IconButton> 
              </CardActions>
            </Card>
          );
        })}
      </div>}
      {data.length === 0 && <div style={styles.flexStyle}>
        No data available
      </div>}
      <div style={styles.flexStyle}>
        <Loader visible={isLoading}/>
      </div>
      <div style={styles.flexStyle}>
        <ButtonComponent variant="contained" disabled={page === 1} text="Previous" handler={this.decreasePageNumber} style={styles.button} />
        <ButtonComponent variant="contained" disabled={page === totalPages} text="Next" handler={this.incrementPageNumber} style={styles.button} />
      </div>
    </div>
  }
}