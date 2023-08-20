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

	const previousData = useSelector((state: any) => state.data)

	const {
		value: enteredName,
		isValid: enteredNameIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasNameError, //do ustawienia klasy czy błędzie
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value: string) => value !== '', previousData.data.userData.nameSurname)

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasEmailError, //do ustawienia klasy czy błędzie
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value: string) => value.match(regE), previousData.data.userData.email)

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
		const newData = { ...previousData.data.registrationData, ...userData }

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
		navigate('..')
		dispatch(dataActions.defaultData())
	}

	return (
		<>
			<Form method="POST" onSubmit={submitFormHandler}>
				<div className={classes.container}>
					<Input
						className={`${hasNameError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}
						label="Imię i nazwisko *"
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
						{hasNameError || (sendFormClicked && !enteredName) ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
					</div>
					<Input
						className={`${hasEmailError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}	
						label="Adres e-mail *"
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
						{sendFormClicked && !enteredEmail ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
						{hasEmailError ? <p>* Adres email jest nieprawidłowy</p> : ''}
					</div>

					<p className={classes['need-inputs']}>* Pola oznaczone gwiazdką są wymagane</p>
				</div>
				<div className={classes.buttons}>
					<button onClick={previousButtonHandler}>Poprzedni krok</button>
					<button>Wyślij formularz</button>
				</div>
			</Form>
			{showCartResult && <CartResult onClick={hideResultCart} currectState={navigation.state} isError={isError} />}
		</>
	)
}

export default MainSubmission
