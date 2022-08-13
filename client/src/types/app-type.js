import PropTypes from "prop-types";

export const appType = PropTypes.shape({
  id: PropTypes.string,
  price: PropTypes.string,
  contentHash: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.number,
  version: PropTypes.number,
  totalSold: PropTypes.number,
  owner: PropTypes.string,
});
