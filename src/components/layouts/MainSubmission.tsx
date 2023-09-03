import { useState, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, useParams, useNavigate, useNavigation } from 'react-router-dom'

import Input from '../UI/Input'
import useInput from '../hooks/use-input'
import CartResult from '../pages/CartResult'

import { dataActions } from '../store/data'

import classes from './MainProductComplain.module.css'

const regE =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const MainSubmission: React.FC<{}> = props => {
	const [sendFormClicked, setSendFormClicked] = useState<boolean>(false)
	const [showCartResult, setShowCartResult] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const dispatch = useDispatch()
	const param = useParams()
	const navigate = useNavigate()
	const navigation = useNavigation()

	const previousData = useSelector((state: any) => state)

	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: hasNameError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value: string) => value !== '', previousData.userData.nameSurname)

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: hasEmailError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value: string) => value.match(regE), previousData.userData.email)

	const userData = {
		nameSurname: enteredName,
		email: enteredEmail,
	}

	const correctContent = enteredNameIsValid && enteredEmailIsValid

	const submitFormHandler = (e: FormEvent) => {
		e.preventDefault()

		setSendFormClicked(true)
		if (!correctContent) {
			return
		}
		setShowCartResult(true)

		dispatch(dataActions.addUserData({ ...userData }))
		const newData = { id: previousData.id, ...previousData.registrationData, ...userData }

		const sendData = async () => {
			const response = await fetch(
				`https://form-17894-default-rtdb.europe-west1.firebasedatabase.app/${param.typeId}.json`,
				{
					method: 'POST',
					body: JSON.stringify(newData),
				}
			)
			if (!response.ok) {
				setIsError(true)
			}
		}
		sendData()
	}

	const previousButtonHandler = () => {
		dispatch(dataActions.addUserData({ ...userData }))
		navigate(`../${param.typeId}`)
	}

	const hideResultCart = () => {
		setShowCartResult(false)
		dispatch(dataActions.addId(''))
		dispatch(dataActions.defaultData())
		navigate('..')
	}

	return (
		<>
			<Form method="POST" onSubmit={submitFormHandler}>
				<div className={classes.container}>
					<Input
						className={`${hasNameError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}
						label="First name and last name *"
						tips=""
						input={{
							types: 'text',
							name: 'name',
							value: enteredName,
							onChange: nameChangeHandler,
							onBlur: nameBlurHandler,
						}}
					/>
					<div className={classes['invalid-input']}>
						{hasNameError || (sendFormClicked && !enteredName) ? <p>* Filling out this field is required</p> : ''}
					</div>
					<Input
						className={`${hasEmailError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}
						label="Email address *"
						tips=""
						input={{
							types: 'text',
							name: 'email',
							value: enteredEmail,
							onChange: emailChangeHandler,
							onBlur: emailBlurHandler,
						}}
					/>
					<div className={classes['invalid-input']}>
						{sendFormClicked && !enteredEmail ? <p>* Filling out this field is required</p> : ''}
						{hasEmailError ? <p>* The email address is invalid</p> : ''}
					</div>

					<p className={classes['need-inputs']}>Fields marked with an asterisk (*) are required</p>
				</div>
				<div className={classes.buttons}>
					<button className={classes.prevButton} onClick={previousButtonHandler}><span>Previous step</span></button>
					<button>Submit the form</button>
				</div>
			</Form>
			{showCartResult && <CartResult onClick={hideResultCart} currectState={navigation.state} isError={isError} />}
		</>
	)
}

export default MainSubmission
