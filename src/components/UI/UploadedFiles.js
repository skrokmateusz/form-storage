import LoadingSpinner from './LoadingSpinner'

import classes from './FileInput.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const UploadedFiles = props => {
    console.log(props.uploadFiles);
	return (
		<ul>
			{props.uploadFiles.map((file, idx) => (
				<li key={idx}>
					<p>{file}</p>
					<span>
						{
							// <LoadingSpinner
							// 	classNameContainer={classes['spinner-container']}
							// 	classNameSpinner={classes['loading-spinner']}
							// />
						}
						{<FontAwesomeIcon id={idx} icon={faXmark} />}
					</span>
				</li>
			))}
		</ul>
	)
}

export default UploadedFiles
