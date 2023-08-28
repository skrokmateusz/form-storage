import React from 'react'

const LoadingSpinner: React.FC<{ classNameContainer: string; classNameSpinner: string }> = props => {
	return (
		<div className={`${props.classNameContainer}`}>
			<div className={`${props.classNameSpinner}`}></div>
		</div>
	)
}

export default LoadingSpinner
