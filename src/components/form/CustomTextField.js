import TextField from '@mui/material/TextField';
import { withStyles } from '@material-ui/core/styles';

const CustomTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#90908E'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#7480FF'
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#90908E'
		},
		'& .MuiFormLabel-root': {
			color: '#90908E'
		},
		'& .MuiFormLabel-root.Mui-disabled': {
			color: '#90908E'
		},
		'&.MuiFormControl-root': {
			display: 'flex',
			width: '100%'
		},
		'&': {
			backgroundColor: 'transparent'
		}
	}
})(TextField);

export default CustomTextField;
