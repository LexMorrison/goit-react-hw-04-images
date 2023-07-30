import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';
export const LoadMoreButton = ({ onClick }) => {
  return (
    <div>
      <LoadMore onClick={onClick} type="button">
        Load more
      </LoadMore>
    </div>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
