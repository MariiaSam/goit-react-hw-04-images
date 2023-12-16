import React, { useEffect, useState } from 'react';
import { StyledApp } from './App.styled';

import { getImages } from 'serviсes/getImages';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);

    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setGallery([]);
          setError('Invalid input. Please enter a valid value.');
          return;
        }

        setGallery((prevState) => [...prevState, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
        setError(null);
      })

      .catch((error) => {
        console.log(error);
        setGallery([]);
        setError('Message Err');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setGallery([]);
    setPage(1);
  };

  const onLoadMoreImage = () => {
    setPage(page => page + 1);
  };

  const onOpenModal = largeImage => {
    if (largeImage) {
      setLargeImage(largeImage);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery galleryImg={gallery} onClick={onOpenModal} />
      {isLoading && <Loader />}
      {showModal && <Modal onClick={toggleModal} url={largeImage} />}
      {error !== null ? <div>{error}</div> : null}
      {loadMore && <Button onLoadMore={onLoadMoreImage} />}
    </StyledApp>
  );
};



//query: Зберігає поточний запит для пошуку.
// gallery: Зберігає масив отриманих зображень від API.
// page: Визначає поточну сторінку результатів.
// error: Містить повідомлення про помилку, пов'язану з пошуком.
// isLoading: Вказує, чи в даний момент відбувається завантаження зображень.
// showModal: Відповідає за видимість модального вікна.
// largeImage: Містить URL великого зображення для відображення в модальному вікні.
// loadMore: Вказує, чи є ще зображення для завантаження.


//componentDidUpdate
// Цей метод життєвого циклу викликається кожного разу, коли компонент оновлюється.
// Він порівнює поточні значення query і page з попередніми значеннями.


//handleSearch:
// Скидає стан при новому запиті.
// Очищає поточний gallery, скидає page на 1 та оновлює query

// Встановлює isLoading в true перед отриманням зображень.
// Отримує зображення за допомогою функції getImages.
// Якщо зображення не отримані, встановлює повідомлення про помилку.
// Додає нові зображення до існуючого gallery.
// Визначає, чи є ще сторінки для завантаження (loadMore).
// Відловлює будь-які помилки під час процесу і встановлює повідомлення про помилку.
// У блоку finally встановлює isLoading в false після завершення операції.


//onLoadMoreImage:
//Збільшує значення page, коли натискається кнопка "Завантажити ще".


//onOpenModal:
// Відкриває модальне вікно з вказаним URL largeImage.
// Викликає toggleModal для оновлення стану showModal.



