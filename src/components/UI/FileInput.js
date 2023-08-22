import { useState, useRef, useEffect } from 'react'

import { storage } from '../firebase/firebase'
import { ref, uploadBytes, listAll, deleteObject } from 'firebase/storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import classes from './FileInput.module.css'

const FileInput = () => {
	const [files, setFiles] = useState(null)
	const [uploadedFiles, setUploadedFiles] = useState()
	const inputRef = useRef()

	useEffect(() => {
		if (files) {
			files.forEach(file => {
				const fileRef = ref(storage, `images/${file.name}`)
				uploadBytes(fileRef, file)
			})

			setTimeout(() => {
				const imageListRef = ref(storage, 'images')
				const uploadedFilesFunction = async () => {
					// const fileRef = ref(storage, `images/${files[0].name}`)
					// await uploadBytes(fileRef, files[0])
					const response = await listAll(imageListRef)
					const data = await response.items.map(item => item.name)
					setUploadedFiles(data)
				}
				uploadedFilesFunction()
			}, 2000)
		}
		if (!files) {
			const uploadedFilesFunction = async () => {
				const imageListRef = ref(storage, 'images')
				const response = await listAll(imageListRef)
				const data = await (response.items.map(item => item.name))
				setUploadedFiles(data)
			}
			uploadedFilesFunction()
		}
	}, [files])

	const addFiles = event => {
		const arrayFiles = Array.from(event.target.files)
		if (files == null) {
			setFiles(arrayFiles)
		} else {
			setFiles(prev => {
				return [...prev, ...arrayFiles]
			})
		}
	}

	const removeFile = id => {
		const newUploadedFiles = uploadedFiles.filter(item => item !== id)
		setUploadedFiles(newUploadedFiles)
		const fileListRef = ref(storage, `images/${id}`)
		deleteObject(fileListRef)
	}

	return (
		<div className={classes.container}>
			<div className={classes.dragdrop} onClick={() => inputRef.current.click()}>
				<p className={classes.header}>
					<span>Choose</span>
				</p>
				<input type="file" hidden multiple onChange={addFiles} ref={inputRef} />
			</div>

			<ul>
				{uploadedFiles &&
					uploadedFiles.map(file => (
						<li key={file} id={file} onClick={() => removeFile(file)}>
							<p>{file}</p>
							<span>{<FontAwesomeIcon icon={faXmark} />}</span>
						</li>
					))}
			</ul>
		</div>
	)
}

export default FileInput
