import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { setItems, getItems } from "../../helpers/localStorage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "100px",
    maxWidth: 200,
    paddingTop: 0,
  },

  media: {
    height: 100,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const [movie] = useState(getItems("movie"));
  const [favorite, setFavorite] = useState([]);

  const handleFavorite = (id, title, poster_path, overview) => (ev) => {
    setItems("favorite", [...favorite, { id, title, poster_path, overview }]);
    setFavorite([...favorite, { id, title, poster_path, overview }]);
  };

  return (
    <div style={{ height: "50px" }}>
      {movie.map((item) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} />
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt="Movie"
              key={item.id}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                key={item.id}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key={item.id}
              >
                {item.overview}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={handleFavorite(
                item.id,
                item.title,
                item.poster_path,
                item.overview
              )}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
