import React, { Component } from 'react';
import { StyledApp } from './App.styled';

import { getImages } from 'serviсes/getImages';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '', //Зберігає поточний запит для пошуку.
    gallery: [],
    page: 1,
    error: null,
    isLoading: false,//Вказує, чи в даний момент відбувається завантаження зображень.
    showModal: false,
    largeImage: '',
    loadMore: false,//Вказує, чи є ще зображення для завантаження
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { query, page } = this.state;
      const prevQuery = prevState.query;
      const prevPage = prevState.page;

      if (query !== prevQuery || page !== prevPage) {
        await this.createImgGallery();//Якщо відбулася зміна, він викликає метод createImgGallery.

      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSearch = query => {
    this.setState({
      query,
      gallery: [],
      page: 1,
    });
  };

  createImgGallery = async () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;

    try {
      const { hits, totalHits } = await getImages(query, page);

      console.log(totalHits)

      if (hits.length === 0) {
        this.setState({
          gallery: [],
          error: 'Invalid input. Please enter a valid value.',
        });
        return;
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
        error: null,
      }));
    } catch (error) {
      console.log(error);
      this.setState({
        gallery: [],
        error: 'Message Err',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMoreImage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onOpenModal = largeImage => {
    if (largeImage) {
      this.setState({ largeImage });
      this.toggleModal();
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, //Змінює стан showModal між true і false
    }));
  };

  render() {
    const { isLoading, showModal, largeImage, gallery, error, loadMore } =
      this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery galleryImg={gallery} onClick={this.onOpenModal} />
        {isLoading && <Loader />}
        {showModal && <Modal onClick={this.toggleModal} url={largeImage} />}
        {error !== null ? <div>{error}</div> : null}
        {loadMore && <Button onLoadMore={this.onLoadMoreImage} />}
      </StyledApp>
    );
  }
}


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
// Якщо відбулася зміна, він викликає метод createImgGallery.


//handleSearch:
// Скидає стан при новому запиті.
// Очищає поточний gallery, скидає page на 1 та оновлює query

//createImgGallery:
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


//toggleModal

//Метод рендеру:
