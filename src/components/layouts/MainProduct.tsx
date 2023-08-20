/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useInput from '../hooks/use-input'
import useOptionInput from '../hooks/use-optionInput'
import Input from '../UI/Input'
import OptionInput from '../UI/OptionInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import { dataActions } from '../store/data'

import classes from './MainProductComplain.module.css'

const MainProductQuestion: React.FC = () => {
	const [nextStepClicked, setNextStepClicked] = useState<boolean>(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const savedData = useSelector((state: any) => state.data.data.registrationData)

	const {
		value: enteredFlavour,
		isValid: enteredFlavourIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasFlavourError, //do ustawienia klasy czy błędzie
		valueChangeHandler: flavourChangeHandler,
		inputBlurHandler: flavourBlurHandler,
	} = useInput((value: string) => value !== '', savedData.flavour)

	const {
		value: enteredExpirationDate,
		isValid: enteredExpirationDateIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasExpirationDateError, //do ustawienia klasy czy błędzie
		valueChangeHandler: expirationDateChangeHandler,
		inputBlurHandler: expirationDateBlurHandler,
	} = useInput((value: string) => value !== '', savedData.expirationDate)

	const {
		value: enteredMessage,
		isValid: enteredMessageIsValid, //tylko do sprawdzenia poprawności całego formularza
		hasError: hasMessageError, //do ustawienia klasy czy błędzie
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
	} = useInput((value: string) => value !== '', savedData.message)

	const { value: enteredPackageType, valueChangeHandler: packageTypeHandler } = useOptionInput(savedData.packageType)
	const { value: enteredPackageCapacity, valueChangeHandler: packageCapacityHandler } = useOptionInput(
		savedData.packageCapacity
	)

	const correctContent = enteredFlavourIsValid && enteredExpirationDateIsValid && enteredMessageIsValid

	const data = {
		flavour: enteredFlavour,
		expirationDate: enteredExpirationDate,
		message: enteredMessage,
		packageType: enteredPackageType,
		packageCapacity: enteredPackageCapacity,
	}

	const submitHandler = (e: FormEvent) => {
		e.preventDefault()
		setNextStepClicked(true)
		if (!correctContent) {
			return
		}
		dispatch(dataActions.addData({ ...data }))
		navigate('submission')
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.container}>
				<Input
					label="Nazwa / smak *"
					className={`${hasFlavourError ? `${classes.invalid} ${classes.input}` : `${classes.input}`}  ${
						nextStepClicked && !enteredFlavourIsValid ? `${classes.invalid} ${classes.input}` : classes.input
					} `}
					tips={
						<a href="" className={classes.tips} data-tip="Informacja na froncie produktu">
							<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
						</a>
					}
					input={{
						types: 'text',
						name: 'flavour',
						value: enteredFlavour,
						onChange: flavourChangeHandler,
						onBlur: flavourBlurHandler,
					}}
				/>
				<div className={classes['invalid-input']}>
					{hasFlavourError || (nextStepClicked && !enteredFlavour) ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
				</div>
				<Input
					label="Data ważności i numer partii *"
					className={`${hasExpirationDateError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
						nextStepClicked && !enteredExpirationDate ? `${classes.invalid} ${classes.input}` : classes.input
					}`}
					tips={
						<a href="" className={classes.tips} data-tip="Całościowy nadruk z opakowania: np. 05.2020 1836 L808052YX.">
							<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
						</a>
					}
					input={{
						types: 'text',
						name: 'expiration-date',
						value: enteredExpirationDate,
						onChange: expirationDateChangeHandler,
						onBlur: expirationDateBlurHandler,
					}}
				/>
				<div className={classes['invalid-input']}>
					{hasExpirationDateError || (nextStepClicked && !enteredExpirationDate) ? (
						<p>* Wypełnienie tego pola jest wymagane</p>
					) : (
						''
					)}
				</div>
				<div className={classes['textarea-div']}>
					<label className={classes['textarea-label']} htmlFor="textarea">
						<div>Opis sytuacji*</div>
					</label>
					<textarea
						className={`${hasMessageError ? `${classes['invalid-textarea']} ${classes.textarea}` : classes.textarea}} ${
							nextStepClicked && !enteredMessageIsValid
								? `${classes['invalid-textarea']} ${classes.textarea}`
								: classes.textarea
						}`}
						value={enteredMessage}
						onChange={messageChangeHandler}
						onBlur={messageBlurHandler}></textarea>
				</div>
				<div className={classes['invalid-input']}>
					{hasMessageError || (nextStepClicked && !enteredMessage) ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
				</div>

			
				<OptionInput
					className=""
					label="Rodzaj opakowania"
					name="package"
					value={enteredPackageType}
					onChange={packageTypeHandler}
					options={[
						'kartonik',
						'karton',
						'butelka szklana',
						'butelka plastikowa',
						'puszka',
						'saszetka',
						'opakowanie plastikowe',
						'inne',
					]}
				/>
				<OptionInput
					className=""
					label="Pojemność / gramatura"
					name="capacity"
					value={enteredPackageCapacity}
					onChange={packageCapacityHandler}
					options={[
						'25g',
						'100g',
						'120g',
						'1kg',
						'200ml',
						'250ml',
						'300ml',
						'330ml',
						'400ml',
						'500ml',
						'1l',
						'1,5l',
						'1,75l',
						'2l',
						'inne',
					]}
				/>
				<p className={classes['need-inputs']}>* Pola oznaczone gwiazdką są wymagane</p>
			</div>
			<div className={classes.buttons}>
				<button
					onClick={() => {
						dispatch(dataActions.defaultData())
						navigate(`..`)
					}}>
					Poprzedni krok
				</button>

				<button>Kolejny krok</button>
			</div>
		</form>
	)
}

export default MainProductQuestion