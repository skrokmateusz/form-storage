import classes from './DateInput.module.css'

const DateInput: React.FC<{
	input: { types: string; id: string; value: string; onChange: () => void; onBlur: () => void }
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
