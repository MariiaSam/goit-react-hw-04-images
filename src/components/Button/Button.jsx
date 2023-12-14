import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

export const Button = ({ onLoadMore }) => {

return (
    <ButtonLoad type='submit' onClick={onLoadMore}> Load More</ButtonLoad>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
  };