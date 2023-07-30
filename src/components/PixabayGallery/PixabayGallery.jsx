import React from 'react';
import Notiflix from 'notiflix';
import { getImages } from 'components/API services/ApiService';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';

class PixabayGallery extends React.Component {
  state = {
    search: '',
    page: 1,
    totalPages: 0,
    arrayImages: [],
    loader: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ search: query, page: 1, arrayImages: [] });
  };

  imagesNormalize = imagesArray => {
    return imagesArray.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
  };

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = async () => {
    const { search, page } = this.state;
    try {
      this.setState({ loader: true });

      const data = await getImages(search, page);

      const dataValuable = this.imagesNormalize(data.hits);
      this.setState(prevState => ({
        arrayImages: [...prevState.arrayImages, ...dataValuable],
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch {
      Notiflix.Notify.failure('Oops..., Somthing went wrong!');
    } finally {
      this.setState({ loader: false });
    }
  };

  render() {
    const { arrayImages, totalPages, page, loader } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {loader && <Loader />}

        <ImageGallery images={arrayImages} />
        {arrayImages.length > 0 && totalPages !== page && !loader && (
          <LoadMoreButton onClick={this.LoadMore} />
        )}
      </div>
    );
  }
}

export default PixabayGallery;
