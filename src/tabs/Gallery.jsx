import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };
  componentDidMount() {
    ImageService.getImages('car', 2);
  }

  fatchImages = async () => {
    const { query, page } = this.state;

    try {
      const images = await ImageService.getImages(query, page);
      console.log(images);
      this.setState({ images: images.photos });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fatchImages();
    }
  }

  onFormSubmit = newQuery => {
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
