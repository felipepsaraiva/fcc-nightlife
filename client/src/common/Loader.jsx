import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const Loader = ({ className, render, typography }) => {
  if (!render) return null;
  return (
    <Typography {...typography} className={className} component="p">
      <i className="fas fa-fw fa-spinner fa-pulse" />
      <span className="sr-only">Loading...</span>
    </Typography>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  render: PropTypes.bool,
  typography: PropTypes.object,
};

Loader.defaultProps = {
  className: '',
  render: true,
  typography: {
    align: 'center',
    variant: 'display2',
  },
};

export default Loader;
