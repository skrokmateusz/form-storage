import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import CartTypeAction from './components/pages/CartTypeAction'
import CartRegistration from './components/pages/CartRegistration'
import CartSubmissionComplain from './components/pages/CartSubmissionComplain'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{ index: true, element: <CartTypeAction /> },
			{
				path: ':typeId',
				element: <CartRegistration />,
	
			},
			{ path: ':typeId/submission', element: <CartSubmissionComplain /> },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
