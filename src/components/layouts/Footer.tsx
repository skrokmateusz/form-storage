import classes from './Footer.module.css'

const Footer: React.FC<{ className: string; children: any }> = props => {
	return <div className={`${classes.footer} ${props.className}`}>{props.children}</div>
}

export default Footer
