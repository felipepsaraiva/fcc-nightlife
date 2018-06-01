import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  name: {
    color: theme.palette.primary.contrastText,
    opacity: 0.87,
    fontWeight: 500,
  },
});

const Details = ({ classes, business }) => (
  <div>
    <Typography variant="display2" align="center" className={classes.name}>
      {business.name}
    </Typography>

    {/* name
    image
    price
    rating/reviewCount/url
    phone
    hours
    is_open_now
    location */}
  </div>
);

Details.propTypes = {
  business: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);
