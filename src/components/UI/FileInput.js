import { useState, useRef, useEffect, Suspense } from 'react'
import { Await, useRouteLoaderData, useLoaderData } from 'react-router-dom'
import UploadedFiles from './UploadedFiles'

import { storage } from '../firebase/firebase'
import { ref, uploadBytes, listAll } from 'firebase/storage'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons'

// import { ref, listAll } from 'firebase/storage'
// import { storage } from '../firebase/firebase'

import classes from './FileInput.module.css'

const FileInput = props => {
	// const uploadedDataRoute = useRouteLoaderData('loadedFiles')
	// console.log(uploadedDataRoute);
	const uploadedData = useLoaderData()
	console.log(uploadedData)
	// const [isSubmitting, setIsSubmitting] = useState(false)
	// const [didSubmit, setDidSubmit] = useState(false)
	const [files, setFiles] = useState(null)
	// const [imageList, setImageList] = useState([])

	const inputRef = useRef()
	// const imageListRef = ref(storage, 'images/')

	const handleDragOver = event => {
		event.preventDefault()
	}

	const handleDrop = event => {
		event.preventDefault()
		const arrayFiles = event.dataTransfer.files
		setFiles(Array.from(arrayFiles))
	}

	const addFiles = event => {
		const arrayFiles = Array.from(event.target.files)
		console.log('odpala funckej')
		if (files == null) {
			setFiles(arrayFiles)
		} else {
			setFiles(prev => {
				return [...prev, ...arrayFiles]
			})
			console.log('files nie jest pusty')
		}
	}

	//Upload files
	useEffect(() => {
		if (files != null) {
			// setIsSubmitting(true)
			files.forEach(file => {
				const fileRef = ref(storage, `images/${file.name}`)
				// setImageList(prev => [...prev, file.name])
				uploadBytes(fileRef, file).then(() => {
					// setIsSubmitting(false)
					// setDidSubmit(true)
				})
			})
		} else {
			return
		}
	}, [files])

	return (
		<div className={classes.container}>
			<div
				className={classes.dragdrop}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => inputRef.current.click()}>
				<p className={classes.header}>
					<span>Wybierz</span> z dysku lub przeciągnij pliki tutaj
				</p>
				<input type="file" hidden multiple onChange={addFiles} ref={inputRef} />
			</div>

			<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
				<Await resolve={uploadedData}>{loadedFiles => <UploadedFiles uploadFiles={loadedFiles} />}</Await>
			</Suspense>
		</div>
	)
}

export default FileInput

export const loader = async () => {
	const imageListRef = ref(storage, 'images')
	const response = await listAll(imageListRef)
	const data = response.items.map(item => item.name)

	return data
}
