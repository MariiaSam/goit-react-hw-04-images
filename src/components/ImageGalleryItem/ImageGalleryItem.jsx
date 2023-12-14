import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tags, id, modalUrl, onClick }) => {
  const handleClick = () => {
    onClick(modalUrl);
  };

  return (
    <GalleryItem key={id} onClick={handleClick}>
      <Img src={url} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
};
