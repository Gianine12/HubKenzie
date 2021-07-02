import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const ButtonGrenn = ({ chindren }) => {
  return (
    <ColorButton
      style={{ width: "45ch", margin: "7px" }}
      variant="contained"
      color="primary"
      type="submit"
    >
      {chindren}
    </ColorButton>
  );
};

export default ButtonGrenn;
