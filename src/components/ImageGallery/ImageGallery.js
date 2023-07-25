import css from '../ImageGallery/ImageGallery.module.css';


export default function ImageGallery ({children}) {
    // const { children } = this.props;

    return (
      <ul className={css.imageGallery}>
      {children}
      </ul>
    );
  }


