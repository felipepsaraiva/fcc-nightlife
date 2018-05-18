import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  rating: {
    backgroundImage: 'url("//s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png")',
    width: 132,
    height: 24,
  },
  'rating-0': { backgroundPosition: '0 0' },
  'rating-1': { backgroundPosition: '0 -24px' },
  'rating-1.5': { backgroundPosition: '0 -48px' },
  'rating-2': { backgroundPosition: '0 -72px' },
  'rating-2.5': { backgroundPosition: '0 -96px' },
  'rating-3': { backgroundPosition: '0 -120px' },
  'rating-3.5': { backgroundPosition: '0 -144px' },
  'rating-4': { backgroundPosition: '0 -168px' },
  'rating-4.5': { backgroundPosition: '0 -192px' },
  'rating-5': { backgroundPosition: '0 -216px' },
  yelpLogo: {
    width: 100,
    height: 'auto',
  },
};

const YelpRating = ({
  classes,
  rating,
  reviewCount,
  url,
}) => (
  <Grid container justify="center" alignItems="center">
    <Grid item>
      <div
        className={`${classes.rating} ${classes[`rating-${rating}`]}`}
        title={`${rating} stars`}
      >
        <span className="sr-only">{rating} stars</span>
      </div>
      <Typography variant="caption">{reviewCount} reviews</Typography>
    </Grid>
    <Grid item>
      <a href={url} target="_blank">
        <img
          alt="Yelp Logo"
          className={classes.yelpLogo}
          src="//s3-media3.fl.yelpcdn.com/assets/srv0/styleguide/24e1fe240f00/assets/img/brand_guidelines/yelp_fullcolor_outline.png"
        />
        <span className="sr-only">Go to business page on Yelp</span>
      </a>
    </Grid>
  </Grid>
);

YelpRating.propTypes = {
  classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(YelpRating);
