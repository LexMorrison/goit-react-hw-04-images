import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { getImages } from 'components/API services/ApiService';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';

function PixabayGallery() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoader(true);

        const data = await getImages(search, page);

        const dataValuable = imagesNormalize(data.hits);
        setArrayImages(prevImg => [...prevImg, ...dataValuable]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        Notiflix.Notify.failure('Oops..., Somthing went wrong!');
      } finally {
        setLoader(false);
      }
    };

    fetchImages();
  }, [search, page]);

  const handleFormSubmit = query => {
    setSearch(query);
    setPage(1);
    setArrayImages([]);
  };

  const imagesNormalize = imagesArray => {
    return imagesArray.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
  };

  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {loader && <Loader />}

      <ImageGallery images={arrayImages} />
      {arrayImages.length > 0 && totalPages !== page && !loader && (
        <LoadMoreButton onClick={LoadMore} />
      )}
    </div>
  );
}

export default PixabayGallery;
