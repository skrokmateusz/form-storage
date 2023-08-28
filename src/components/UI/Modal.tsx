import React from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const Backdrop: React.FC<{ onClick: () => void }> = props => {
	return <div className={classes.backdrop} onClick={props.onClick} />
}

const ModalOverlay: React.FC<{ children: any }> = props => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	)
}

const portalElement: any = document.getElementById('overlays')

const Modal: React.FC<{onClick: () => void, children: any}> = props => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
		</React.Fragment>
	)
}

export default Modal
