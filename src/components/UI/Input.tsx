import React from 'react'

import classes from './Input.module.css'

import InputType from '../models/input'

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

// import React from 'react'

// import classes from './Input.module.css'

// const Input = React.forwardRef((props, ref) => {
//     return (
//         <div className={classes.input}>
//             <label htmlFor={props.input.id}>{props.label}</label>
//             <input ref={ref} {...props.input} />
//         </div>
//     )
// })

// export default Input
