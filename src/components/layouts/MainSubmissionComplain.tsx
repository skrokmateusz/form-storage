/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigation, Form } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Input from '../UI/Input'
import useInput from '../hooks/use-input'
import useOptionInput from '../hooks/use-optionInput'
import CartResult from '../pages/CartResult'

import classes from './MainProductComplain.module.css'
import { dataActions } from '../store/data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

const regExpEmail =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const regExpNumber = /^\d{9}$/

const MainSubmissionComplain: React.FC = props => {
	const [sendFormClicked, setSendFormClicked] = useState<boolean>(false)
	const [showCartResult, setShowCartResult] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const param = useParams()
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
	} = useInput((value: string) => value.match(regExpEmail), previousData.data.userData.email)

	const {
		value: enteredNumber,
		isValid: enteredNumberIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasNumberError, //do ustawienia klasy czy błędzie
		valueChangeHandler: numberChangeHandler,
		inputBlurHandler: numberBlurHandler,
	} = useInput((value: string) => value.match(regExpNumber), previousData.data.userData.phoneNumber)

	const { value: enteredAdress, valueChangeHandler: adressHandler } = useOptionInput(previousData.data.userData.adress)
	const { value: enteredZipCode, valueChangeHandler: zipCodeHandler } = useOptionInput(
		previousData.data.userData.zipCode
	)
	const { value: enteredCity, valueChangeHandler: cityHandler } = useOptionInput(previousData.data.userData.city)

	const correctContent = enteredNameIsValid && enteredEmailIsValid && enteredNumberIsValid

	const userData = {
		nameSurname: enteredName,
		email: enteredEmail,
		phoneNumber: enteredNumber,
		adress: enteredAdress,
		zipCode: enteredZipCode,
		city: enteredCity,
	}

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
				'https://form-17894-default-rtdb.europe-west1.firebasedatabase.app/complain.json',
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
		return userData
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
						label="Imię i nazwisko *"
						className={`${hasNameError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}
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

					<Input
						className={`${hasNumberError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} `}
						label="Numer telefonu *"
						tips=""
						input={{
							types: 'text',
							name: 'number',
							value: enteredNumber,
							onChange: numberChangeHandler,
							onBlur: numberBlurHandler,
						}}
					/>
					<div className={classes['invalid-input']}>
						{sendFormClicked && !enteredNumber ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
						{hasNumberError ? <p>* Nieprawidłowy format telefonu. Prawidłowy format 123456789</p> : ''}
					</div>
					<Input
						className={classes.input}
						label="Ulica, nr domu"
						tips={
							<a
								href=""
								className={classes.tips}
								data-tip="Dane to będą potrzebne w sytuacji, jeżeli ocena opakowania będzie konieczna">
								<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
							</a>
						}
						input={{ types: 'text', name: '', value: enteredAdress, onChange: adressHandler, onBlur: () => {} }}
					/>
					<Input
						className={classes.input}
						label="Kod pocztowy"
						tips=""
						input={{ types: 'text', name: '', value: enteredZipCode, onChange: zipCodeHandler, onBlur: () => {} }}
					/>
					<Input
						className={classes.input}
						label="Miejscowość"
						tips=""
						input={{ types: 'text', name: '', value: enteredCity, onChange: cityHandler, onBlur: () => {} }}
					/>
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

export default MainSubmissionComplain
