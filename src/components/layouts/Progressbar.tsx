import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { dataActions } from '../store/data'

import classes from '../layouts/Progressbar.module.css'

const Progressbar = () => {
	const location = useLocation()
	const param = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const pathname = location.pathname

	const backHomePage = () => {
		navigate('..')
		dispatch(dataActions.defaultData())
	}

	const step1 = (
		<ol className={classes.steps}>
			<li className={`${classes.step} ${classes['is-active']}`} data-step="1"></li>
			<li className={classes.step} data-step="2"></li>
			<li className={classes.step} data-step="3"></li>
		</ol>
	)

	const step2 = (
		<ol className={classes.steps}>
			<li
				className={`${classes.step} ${classes['is-complete']}`}
				data-step="1"
				onClick={() => {
					navigate('..')
				}}></li>
			<li className={`${classes.step} ${classes['is-active']}`} data-step="2"></li>
			<li className={classes.step} data-step="3"></li>
		</ol>
	)

	const step3 = (
		<ol className={classes.steps}>
			<li className={`${classes.step} ${classes['is-complete']}`} data-step="1" onClick={backHomePage}></li>
			<li
				className={`${classes.step} ${classes['is-complete']}`}
				data-step="2"
				onClick={() => {
					navigate(`/${param.typeId}`)
				}}></li>
			<li className={`${classes.step} ${classes['is-active']}`} data-step="3"></li>
		</ol>
	)

	return (
		<div className={classes.container}>
			<p>Step:</p>
			{pathname === '/' && step1}
			{pathname === `/${param.typeId}` && step2}
			{pathname === `/${param.typeId}/submission` && step3}
		</div>
	)
}

export default Progressbar
