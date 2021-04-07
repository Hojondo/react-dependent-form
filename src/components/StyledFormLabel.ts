import { FormLabel, withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
  root: {
    fontSize: '0.75rem',
    // zIndex: 6,
    // pointerEvents: 'none',
    // background: '#FFF',
    padding: "0 5px",
    width: "auto",
    textAlign: "left",
  },
}))(FormLabel);
