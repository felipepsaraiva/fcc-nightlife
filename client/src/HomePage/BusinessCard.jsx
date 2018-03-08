import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

import YelpRating from '../common/YelpRating';

// TODO: Change button position to right

const styles = theme => ({
  img: { height: 200 },
  title: {
    ...theme.typography.headline,
    outline: 'none',
    textDecoration: 'none',
  },
});

const BusinessCard = ({ classes, business }) => (
  <Card raised>
    <Link href to={`/${business.id}`}>
      {business.image_url ?
        <CardMedia className={classes.img} image={business.image_url} />
        : <div className={classes.img} />
      }
    </Link>
    <CardContent>
      <Typography variant="headline" component="h3" gutterBottom noWrap>
        <Link className={classes.title} href to={`/${business.id}`}>{business.name}</Link>
      </Typography>

      <Grid container>
        <Grid item xs={6}>
          <Typography variant="caption">Price</Typography>
          <Typography>{business.price}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Distance</Typography>
          <Typography>{(business.distance / 1000).toFixed(2)} Km</Typography>
        </Grid>
      </Grid>

      <YelpRating
        rating={business.rating}
        reviewCount={business.review_count}
        url={business.url}
      />
    </CardContent>
  </Card>
);

BusinessCard.propTypes = {
  classes: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessCard);
