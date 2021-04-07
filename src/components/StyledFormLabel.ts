import { FormLabel, withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    // fontSize: '0.75em',
    transform: 'translate(0, -50%)',
    zIndex: 6,
    // pointerEvents: 'none',
    background: '#FFF',
    padding: '0 5px',
    position: 'absolute',
    top: 0,
    left: '8px',
    display: 'inline-block',
    width: 'auto',
  },
}))(FormLabel);
