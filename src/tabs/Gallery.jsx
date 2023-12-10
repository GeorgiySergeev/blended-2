import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loadMore: false,
    error: null,
  };
  componentDidMount() {
    ImageService.getImages('car', 2);
  }

  fatchImages = async () => {
    const { query, page } = this.state;

    try {
      const images = await ImageService.getImages(query, page);
      console.log(images);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.photos],
        loadMore: images.page < Math.ceil(images.total_results/images.per_page)
      }));

    } catch (error) {
      this.setState({
       error: error.message,
     })
    }
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fatchImages();
    }
  }

  onFormSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
      error: null,
    });

  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    })
  }

  render() {
    const { images, loadMore, error } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => {
            return <GridItem key={id}>
                       <CardItem color={avg_color}>
                          <img src={src.large} alt={alt} />
                      </CardItem>
                 </GridItem>
          })}

        </Grid>
        {loadMore && <Button type="button" onClick={this.onLoadMore}>Load More</Button>}
        {error && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}

      </>
    );
  }
}
