import { Suspense } from 'react'
import { useParams, useLoaderData, Await } from 'react-router-dom'

import Card from '../UI/Card'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

import MainProductComplain from '../layouts/MainProductComplain'
import MainProduct from '../layouts/MainProduct'

// import { ref, uploadBytes, deleteObject, listAll, getDownloadURL } from 'firebase/storage'
// import { storage } from '../firebase/firebase'

import classes from './CartRegistration.module.css'
// import { dataActions } from '../../store/data'

const CartRegistration: React.FC = () => {
	const param = useParams()
	// const {data} = useLoaderData() as {data: string[]}
	// console.log('pobieranie danych')
	// console.log(data)

	return (
		<div>
			<Card>
				<Header normalTitle="do porpawy" highlightedTitle="Dane produktowe" />
				{param.typeId === 'complain' ? <MainProductComplain /> : null}
				{param.typeId === 'question' || param.typeId === 'comment' ? <MainProduct /> : null}
			</Card>
			<Footer className={classes.footer}> </Footer>
		</div>
	)
}

export default CartRegistration

// export const loader = async () => {
// 	const imageListRef = ref(storage, 'images')
// 	const response = await listAll(imageListRef)
// 	const data = response.items.map(item => item.name)

// 	return {data}
// }

