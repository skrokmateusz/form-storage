import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleQuestion, faMessage } from '@fortawesome/free-solid-svg-icons'

import classes from './MainFirstPage.module.css'

const MainFirstPage: React.FC<{ onChosenBox: any }> = props => {
	const [isBoxClicked, setIsBoxClicked] = useState<string>('')

	const choiceHandler = (event: any) => {
		const chosenBox = event.target.closest('div').id
		props.onChosenBox(chosenBox)
		setIsBoxClicked(chosenBox)
	}

	const classesComplainBox = isBoxClicked === 'complain' ? classes['choice-box-clicked'] : classes['choice-box']
	const classesQuestionBox = isBoxClicked === 'question' ? classes['choice-box-clicked'] : classes['choice-box']
	const classesCommentBox = isBoxClicked === 'comment' ? classes['choice-box-clicked'] : classes['choice-box']

	return (
		<div className={classes.container}>
			<div onClick={choiceHandler} className={classesComplainBox} id="complain">
				<FontAwesomeIcon icon={faCircleExclamation} className={classes.icon} />
				<p>Reklamacja produktowa</p>
			</div>
			<div onClick={choiceHandler} className={classesQuestionBox} id="question">
				<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
				<p>Pytanie dotyczące produktu, składników, itd.</p>
			</div>
			<div onClick={choiceHandler} className={classesCommentBox} id="comment">
				<FontAwesomeIcon icon={faMessage} className={classes.icon} />
				<p>Opinie, sugestie dotyczące produktów</p>
			</div>
		</div>
	)
}

export default MainFirstPage
