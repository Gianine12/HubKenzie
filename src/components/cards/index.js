import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";

import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Cards = ({ name, email, bio, contact, techs }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card
        style={{ width: "300px", margin: "20px 10px" }}
        className={classes.root}
      >
        <CardHeader
          style={{ backgroundColor: "#d1d1d1" }}
          title={name}
          subheader={email}
        />
        <CardContent style={{ backgroundColor: "#e1e1e1" }}>
          {contact}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            v
          </IconButton>
        </CardActions>
        <hr />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <p>{bio}</p>
            <p>{techs}</p>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Cards;
