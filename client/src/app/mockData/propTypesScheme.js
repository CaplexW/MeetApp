import PropTypes from 'prop-types';

export const userScheme = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  bookmark: PropTypes.arrayOf(PropTypes.string),
  profession: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
};
export const qualityScheme = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export const professionScheme = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export const commentScheme = {
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  created_at: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
};

export const nodesType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
