import React from 'react'

import InputType from '../models/input'

import classes from './Input.module.css'

const Input: React.FC<{
	input: InputType
	label: string
	tips: any
	className: string
}> = props => {
	return (
		<div className={`${classes.input}`}>
			<label htmlFor={props.input.name}>
				<div className={classes.description}>{props.label}</div>
				<div>{props.tips}</div>
			</label>
			<input className={`${props.className}`} {...props.input} />
		</div>
	)
}

export default Input
