import Progressbar from './Progressbar'

import classes from './Header.module.css'

const Header: React.FC<{ normalTitle: string; highlightedTitle: string }> = props => {
	return (
		<header className={classes.header}>
			<div className={classes.title}>
				<p className={classes['normal-title']}>{props.normalTitle}</p>
				<p className={classes['highlighted-title']}>{props.highlightedTitle}</p>
			</div>
			<div className={classes.bar}>
				<Progressbar />
			</div>
		</header>
	)
}

export default Header
