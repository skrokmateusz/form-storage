import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const UploadedFiles = props => {
	return (
		<ul>
			{props.uploadFiles && props.uploadFiles.map((file, idx) => (
				<li key={idx}>
					<p>{file}</p>
					<span>
						{<FontAwesomeIcon id={idx} icon={faXmark} />}
					</span>
				</li>
			))}
		</ul>
	)
}

export default UploadedFiles
