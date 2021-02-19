import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link} from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import d1 from '../images/d1.jpg'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({product}) {
  const classes = useStyles();
// console.log("product details",product)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={'/product/'+product._id}>

        <CardMedia
          className={classes.media}
          image={d1}
          title="Contemplative Reptile"
        />
        </Link>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.brand}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Typography gutterBottom variant="h6" component="h6">
            {`${product.rating} stars`}
          </Typography>
      
      </CardActions>
    </Card>
  );
}