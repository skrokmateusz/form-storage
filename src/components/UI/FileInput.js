import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storage } from '../firebase/firebase'
import { ref, uploadBytes, listAll, deleteObject } from 'firebase/storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { v4 } from 'uuid'

import { dataActions } from '../store/data'

import classes from './FileInput.module.css'

const FileInput = () => {
	const [files, setFiles] = useState(null)
	const [uploadedFiles, setUploadedFiles] = useState()
	const inputRef = useRef()
	const dispatch = useDispatch()
	const idInStore = useSelector(state => state.id)

	let idRegistration = ''
	if (!idRegistration && !idInStore) {
		idRegistration = v4()
		dispatch(dataActions.addId(idRegistration))
	} else if (!idRegistration && idInStore) {
		idRegistration = idInStore
	}

	const addFiles = event => {
		const arrayFiles = Array.from(event.target.files)
		setFiles(arrayFiles)
	}

	useEffect(() => {
		if (files) {
			files.forEach(file => {
				const fileRef = ref(storage, `images${idRegistration}/${file.name}${v4()}`)
				uploadBytes(fileRef, file).then(async snapshot => {
					setUploadedFiles(prev => [...prev, snapshot.metadata.name])
				})
			})
		}
		if (!files) {
			const uploadedFilesFunction = async () => {
				const imageListRef = ref(storage, `images${idRegistration}`)
				const response = await listAll(imageListRef)
				const data = await response.items.map(item => item.name)
				setUploadedFiles(data)
			}
			uploadedFilesFunction()
		}
	}, [files])

	const removeFile = id => {
		const newUploadedFiles = uploadedFiles.filter(item => item !== id)
		setUploadedFiles(newUploadedFiles)
		const fileListRef = ref(storage, `images${idRegistration}/${id}`)
		deleteObject(fileListRef)
	}

	return (
		<div className={classes.container}>
			<div className={classes.dragdrop} onClick={() => inputRef.current.click()}>
				<p className={classes.header}>
					<span>Wybierz</span> pliki z dysku
				</p>
				<input type="file" hidden multiple onChange={addFiles} ref={inputRef} />
			</div>

			<ul className={classes.list}>
				{uploadedFiles &&
					uploadedFiles.map(file => (
						<li key={file} id={file} >
							<p>{file.slice(0, -36)}</p>
							<span>{<FontAwesomeIcon icon={faXmark} onClick={() => removeFile(file)}/>}</span>
						</li>
					))}
			</ul>
		</div>
	)
}

export default FileInput
