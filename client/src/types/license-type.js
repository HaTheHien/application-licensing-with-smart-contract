import PropTypes from "prop-types";

export const licenseType = PropTypes.shape({
  appId: PropTypes.string,
  dateCreated: PropTypes.number,
  dateExpired: PropTypes.number,
});
