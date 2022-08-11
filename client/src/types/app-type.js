import PropTypes from "prop-types";

export const appType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.number,
  contentHash: PropTypes.string,
  owner: PropTypes.string,
  version: PropTypes.number,
  price: PropTypes.string,
});
