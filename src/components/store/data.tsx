import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	data: {
		registrationData: {},
		userData: {},
		uploadFiles: [],
	},
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addData(state, action) {
			const newData = action.payload
			state.data.registrationData = {
				flavour: newData.flavour,
				expirationDate: newData.expirationDate,
				message: newData.message,
				purchasePlace: newData.purchasePlace,
				packageKept: newData.packageKept,
				packageType: newData.packageType,
				packageCapacity: newData.packageCapacity,
				packageState: newData.packageState,
				packageStorageBefore: newData.packageStorageBefore,
				firstOpen: newData.firstOpen,
				packageStorageAfter: newData.packageStorageAfter,
				productChange: newData.productChange,
			}
		},
		addUserData(state, action) {
			const newUserData = action.payload
			state.data.userData = {
				nameSurname: newUserData.nameSurname,
				email: newUserData.email,
				phoneNumber: newUserData.phoneNumber,
				adress: newUserData.adress,
				zipCode: newUserData.zipCode,
				city: newUserData.city,
			}
		},
		uploadFiles(state, action) {
			const newUploadfiles = action.payload
			state.data.uploadFiles = newUploadfiles
		},
		defaultData(state) {
			state.data.userData = {}
			state.data.registrationData = {}
		},
	},
})

export const dataActions = dataSlice.actions
export default dataSlice
