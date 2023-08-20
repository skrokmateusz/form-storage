import classes from './OptionInput.module.css'
import { ChangeEvent } from 'react'

const OptionInput: React.FC<{
	label: string
	name: string
	className: string
	value: string | undefined
	onChange: (event: ChangeEvent<HTMLSelectElement> ) => void
	options: string[]
}> = props => {
	return (
		<div className={classes.input}>
			<label htmlFor="">{props.label}</label>
			<select
				name={props.name}
				className={`${props.className} ${classes.options}`}
				value={props.value}
				onChange={props.onChange}>
				<option value="none" hidden>
					Wybierz...
				</option>
				{props.options.map((option: string) => (
					<option key={option} value={option}>{option}</option>
				))}

				{/* <option value={props.option1}>{props.option1}</option>
				<option value={props.option2}>{props.option2}</option>
				<option value={props.option3}>{props.option3}</option>
				<option value={props.option4}>{props.option4}</option> */}
			</select>
		</div>
	)
}

export default OptionInput
