import { useState, useEffect } from 'react';
import Modal from './/Modal/Modal.js';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './/ImageGallery/ImageGallery.js';
import ImageGalleryItem from './/ImageGalleryItem/ImageGalleryItem.js';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore.js';
import css from './/App.module.css';
import { ColorRing } from 'react-loader-spinner';
import Notiflix from 'notiflix';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isBtnLoadVisible, setIsBtnLoadVisible] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function foo() {
      try {
        setLoading(true);
         await fetch(
          `https://pixabay.com/api/?q=${query}&key=36926934-069e003b546c638e37e68c3ce&image_type=photo&page=${page}&orientation=horizontal&per_page=12`
        )
          .then(response => {
            return response.json();
          })
          .then(response => {
            if (!response.hits.length) {
              Notiflix.Notify.failure('There are not any images....');
              setIsBtnLoadVisible(false);
              return;
            }

            setImages(prevImages => [
              ...prevImages,
              ...getNormalizedImages(response.hits),
            ]);

            setIsBtnLoadVisible(page < Math.ceil(response.total / 12));
            
          });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    foo();
  }, [query, page]);

  //получаем массив с необходимыми свойствами
  const getNormalizedImages = array => {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = ({ largeImageURL, tags }) => {
    setIsShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setIsShowModal(false);
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length !== 0 && (
        <ImageGallery>
          <ImageGalleryItem dataArr={images} onImageClick={handleImageClick} />
        </ImageGallery>
      )}

      {loading && (
        <div className={css.spiner}>
          <p>LOADING...</p>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}

      {isBtnLoadVisible && !loading && (
        <ButtonLoadMore onLoadMoreClick={handleLoadMoreClick} />
      )}
      {isShowModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default App;







// import { Component } from 'react';
// import Modal from './/Modal/Modal.js';
// import Searchbar from './Searchbar/Searchbar.js';
// import ImageGallery from './/ImageGallery/ImageGallery.js';
// import ImageGalleryItem from './/ImageGalleryItem/ImageGalleryItem.js';
// import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore.js';
// import css from './/App.module.css';
// // import * as ImageService from '..//service/img-service.js';
// // import * as basicLightbox from 'basiclightbox';
// import { ColorRing } from 'react-loader-spinner';
// import Notiflix from 'notiflix';

// export default class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     loading: false,
//     isBtnLoadVisible: false,
//     isShowModal: false,
//     dataForModal: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;

//     if (
//       (prevState.query !== query && query !== '') ||
//       prevState.page !== page
//     ) {
//       try {
//         this.setState({ loading: true });
//         //1 вариант
//         // const { hits } = await ImageService.getImage({ query, page });
//         // this.setState({ images: hits });

//         // const images = await ImageService.getImage({ query, page });
//         // this.setState({ images });

//         //2 вариант через Fetch
//       await fetch(
//         `https://pixabay.com/api/?q=${query}&key=36926934-069e003b546c638e37e68c3ce&image_type=photo&page=${page}&orientation=horizontal&per_page=12`
//       )
//         .then(response => {
//           return response.json();
//         })
//         .then(response => {
//           if (!response.hits.length) {
//             Notiflix.Notify.failure('There are not any images....');
//             this.setState({ isBtnLoadVisible: false });
//             return;
//           }

//           this.setState(prevState => ({
//             images: [
//               ...prevState.images,
//               ...this.getNormalizedImages(response.hits),
//             ],
//             isBtnLoadVisible: page < Math.ceil(response.total / 12),
//           }));
//         });
//     } catch (error) {
//     } finally {
//       this.setState({ loading: false });
//     }

//     }

//   }

//   //получаем массив с необходимыми свойствами
//   getNormalizedImages(array) {
//     return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
//       id,
//       webformatURL,
//       largeImageURL,
//       tags,
//     }));
//   }

//   handleLoadMoreClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = query => {
//     this.setState({ query, images: [], page: 1 });
//   };

//   handleImageClick = ({ largeImageURL, tags }) => {
//     this.setState({
//       isShowModal: true,
//       dataForModal: { largeImageURL, tags },
//     });
//   };

//   toggleModal = () => {
//     // this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
//     this.setState(({ isShowModal }) => ({ isShowModal: false }));
//   };

//   render() {
//     return (
//       <div
//         style={{
//           // height: '100vh',
//           // display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {this.state.images.length !== 0 && (
//           <ImageGallery>
//             <ImageGalleryItem
//               dataArr={this.state.images}
//               onImageClick={this.handleImageClick}
//             />
//           </ImageGallery>
//         )}

//         {this.state.loading && (
//           <div className={css.spiner}>
//             <p>LOADING...</p>
//             <ColorRing
//               visible={true}
//               height="80"
//               width="80"
//               ariaLabel="blocks-loading"
//               wrapperStyle={{}}
//               wrapperClass="blocks-wrapper"
//               colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//             />
//           </div>
//         )}

//         {this.state.isBtnLoadVisible && !this.state.loading && (
//           <ButtonLoadMore onLoadMoreClick={this.handleLoadMoreClick} />
//         )}
//         {this.state.isShowModal && (
//           <Modal
//             dataForModal={this.state.dataForModal}
//             onClose={this.toggleModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

// toggleModal = () => {
//   this.setState(state => ({isShowModal: !state.isShowModal}))
// }

// toggleModal = () => {
//   this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
// };
