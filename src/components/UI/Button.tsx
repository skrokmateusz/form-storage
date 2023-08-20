import { Link } from 'react-router-dom'

import classes from './Button.module.css'

const Button: React.FC<{ to: string, className: string, title: string }> = props => {
	return (
		<Link to={props.to}>
			<button className={`${classes.button} ${props.className}`}>{props.title}</button>
		</Link>
	)
}

export default Button
