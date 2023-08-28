import classes from './DateInput.module.css'
import { OptionInputType } from '../models/input';

const DateInput: React.FC<{
	input: OptionInputType
	label: string
}> = props => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input type="date" className={`${classes.dateinput}`} {...props.input} />
		</div>
	)
}

export default DateInput
