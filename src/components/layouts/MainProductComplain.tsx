/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import useInput from '../hooks/use-input'
import useOptionInput from '../hooks/use-optionInput'
import useInputNotRequired from '../hooks/use-inputnotrequired'
import Input from '../UI/Input'
import OptionInput from '../UI/OptionInput'
import DateInput from '../UI/DateInput'
import FileInput from '../UI/FileInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import { dataActions } from '../store/data'

import classes from './MainProductComplain.module.css'

const MainProductComplain: React.FC = () => {
	const [nextStepClicked, setNextStepClicked] = useState<boolean>(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const savedData = useSelector((state: any) => state.registrationData)

	const {
		value: enteredFlavour,
		isValid: enteredFlavourIsValid,
		hasError: hasFlavourError,
		valueChangeHandler: flavourChangeHandler,
		inputBlurHandler: flavourBlurHandler,
	} = useInput((value: string) => value !== '', savedData.flavour)

	const {
		value: enteredExpirationDate,
		isValid: enteredExpirationDateIsValid,
		hasError: hasExpirationDateError,
		valueChangeHandler: expirationDateChangeHandler,
		inputBlurHandler: expirationDateBlurHandler,
	} = useInput((value: string) => value !== '', savedData.expirationDate)

	const {
		value: enteredMessage,
		isValid: enteredMessageIsValid,
		hasError: hasMessageError,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
	} = useInput((value: string) => value !== '', savedData.message)

	const {
		value: enteredPurchasePlace,
		isValid: enteredPurchasePlaceIsValid,
		hasError: hasPurchasePlaceError,
		valueChangeHandler: purchasePlaceChangeHandler,
		inputBlurHandler: purchasePlaceBlurHandler,
	} = useInput((value: string) => value !== '', savedData.purchasePlace)

	const { value: enteredPackageKept, valueChangeHandler: packageKeptHandler } = useOptionInput(savedData.packageKept)
	const { value: enteredPackageType, valueChangeHandler: packageTypeHandler } = useOptionInput(savedData.packageType)
	const { value: enteredPackageCapacity, valueChangeHandler: packageCapacityHandler } = useOptionInput(
		savedData.packageCapacity
	)
	const { value: enteredPackageState, valueChangeHandler: packageStateHandler } = useInputNotRequired(
		savedData.packageState
	)
	const { value: enteredPackageStorageBefore, valueChangeHandler: packageStorageBeforeHandler } = useInputNotRequired(
		savedData.packageStorageBefore
	)
	const { value: enteredFirstOpen, valueChangeHandler: firstOpenHandler } = useOptionInput(savedData.firstOpen)
	const { value: enteredPackageStorageAfter, valueChangeHandler: packageStorageAfterHandler } = useInputNotRequired(
		savedData.packageStorageAfter
	)
	const { value: enteredProductChange, valueChangeHandler: productChangeHandler } = useOptionInput(
		savedData.productChange
	)

	const correctContent =
		enteredFlavourIsValid &&
		enteredExpirationDateIsValid &&
		enteredMessageIsValid &&
		enteredPurchasePlaceIsValid &&
		enteredPackageKept
			? true
			: false

	const data = {
		flavour: enteredFlavour,
		expirationDate: enteredExpirationDate,
		message: enteredMessage,
		purchasePlace: enteredPurchasePlace,
		packageKept: enteredPackageKept,
		packageType: enteredPackageType,
		packageCapacity: enteredPackageCapacity,
		packageState: enteredPackageState,
		packageStorageBefore: enteredPackageStorageBefore,
		firstOpen: enteredFirstOpen,
		packageStorageAfter: enteredPackageStorageAfter,
		productChange: enteredProductChange,
	}

	const submitHandler = (e: FormEvent) => {
		e.preventDefault()
		setNextStepClicked(true)
		if (!correctContent) {
			window.scrollTo({
				top: 300,
				behavior: 'smooth',
			})
			return
		}
		dispatch(dataActions.addData({ ...data }))
		navigate('submission')
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.container}>
				<div>
					<p>
						Odpowiedzi na poniższe pytania pozwolą nam na wyjaśnienie Pani / Pana zgłoszenia. Uprzejmie dziękujemy za
						poświęcony czas.
					</p>
				</div>
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

				<Input
					className={`${hasPurchasePlaceError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
						nextStepClicked && !enteredPurchasePlace ? `${classes.invalid} ${classes.input} ` : classes.input
					} `}
					tips={
						<a
							href="#"
							className={classes.tips}
							data-tip="Prosimy o podanie nazwy sklepu i jego adresu. Pozwoli nam to na sprawdzenie warunków przechowywania naszych towarów">
							<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
						</a>
					}
					label="Gdzie i kiedy zakupiono produkt*"
					input={{
						types: 'text',
						name: 'purchase-place',
						value: enteredPurchasePlace,
						onChange: purchasePlaceChangeHandler,
						onBlur: purchasePlaceBlurHandler,
					}}
				/>
				<div className={classes['invalid-input']}>
					{hasPurchasePlaceError || (nextStepClicked && !enteredPurchasePlace) ? (
						<p>* Wypełnienie tego pola jest wymagane</p>
					) : (
						''
					)}
				</div>

				<OptionInput
					className={`${nextStepClicked && !enteredPackageKept ? classes.invalid : ''}`}
					label="Czy zostało zachowane opakowanie*"
					name="is-package"
					value={enteredPackageKept}
					onChange={packageKeptHandler}
					options={[
						'tak, posiadam opakowanie wraz z produktem',
						'tak, posiadam puste opakowanie',
						'nie, posiadam tylko produkt',
						'nie, opakowanie z produktem zostało wyrzucone',
					]}
				/>
				<div className={classes['invalid-input']}>
					{nextStepClicked && !enteredPackageKept ? <p>* Wypełnienie tego pola jest wymagane</p> : ''}
				</div>
				<div className={classes['dragdrop-div']}>
					<label htmlFor="text">
						<div className={classes.description}>Prosimy o dołączenie zdjęć opakowania i produktu</div>
						<div>
							<a
								href="#"
								className={classes.tips}
								data-tip="Prosimy o zrobienie zdjęć min. całego opakowania oraz zamknięcia. Mile widzane będą zdjęcia każdej strony produktu">
								<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
							</a>
						</div>
					</label>

					<FileInput />
				</div>

				<p>Aby kompleksowo i możliwe szybko odpowiedzieć na zgłoszenie prosimy o podanie dodatkowych informacji:</p>
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
				<Input
					tips=""
					className={classes.input}
					label="Prosimy opisać stan opakowania"
					input={{
						types: 'text',
						name: '',
						value: enteredPackageState,
						onChange: packageStateHandler,
						onBlur: () => {},
					}}
				/>
				<Input
					tips=""
					className={classes.input}
					label="Gdzie i jak długo produkt był przechowywany przed otwarciem"
					input={{
						types: 'text',
						value: enteredPackageStorageBefore,
						name: '',
						onChange: packageStorageBeforeHandler,
						onBlur: () => {},
					}}
				/>
				<DateInput
					label="Data pierwszego otwarcia produktu"
					input={{ types: 'date', id: '', value: enteredFirstOpen, onChange: firstOpenHandler, onBlur: () => {} }}
				/>
				<Input
					tips=""
					className={classes.input}
					label="Gdzie i jak długo produkt był przechowywany po otwarciu"
					input={{
						types: 'text',
						value: enteredPackageStorageAfter,
						name: '',
						onChange: packageStorageAfterHandler,
						onBlur: () => {},
					}}
				/>
				<DateInput
					label="Kiedy zauważono zmiany w produkcie"
					input={{
						types: 'date',
						id: '',
						value: enteredProductChange,
						onChange: productChangeHandler,
						onBlur: () => {},
					}}
				/>
				<p className={classes['need-inputs']}>* Pola oznaczone gwiazdką są wymagane</p>
			</div>
			<div className={classes.buttons}>
				<button className={classes.prevButton}
					onClick={() => {
						dispatch(dataActions.defaultData())
						dispatch(dataActions.addId(''))
						navigate(`..`)
					}}>
					<span>Poprzedni krok</span>
				</button>

				<button>Kolejny krok</button>
			</div>
		</form>
	)
}

export default MainProductComplain
