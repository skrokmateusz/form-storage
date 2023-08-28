import { ChangeEvent } from 'react'

import classes from './OptionInput.module.css'

const OptionInput: React.FC<{
	label: string
	name: string
	className: string
	value: string | undefined
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void
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
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	)
}

export default OptionInput
