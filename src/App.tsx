import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import CartTypeAction from './components/pages/CartTypeAction'
import CartRegistration from './components/pages/CartRegistration'
import CartSubmissionComplain from './components/pages/CartSubmissionComplain'
import { loader as loaderFiles } from './components/UI/FileInput'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{ index: true, element: <CartTypeAction /> },
			{
				path: ':typeId',
				element: <CartRegistration />,
				loader: loaderFiles,
			},
			{ path: ':typeId/submission', element: <CartSubmissionComplain /> },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
