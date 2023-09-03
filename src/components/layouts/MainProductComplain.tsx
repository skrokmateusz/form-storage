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
					Answers to the following questions will help us clarify your report. We sincerely thank you for your time.
					</p>
				</div>
				<Input
					label="Name / flavor *"
					className={`${hasFlavourError ? `${classes.invalid} ${classes.input}` : `${classes.input}`}  ${
						nextStepClicked && !enteredFlavourIsValid ? `${classes.invalid} ${classes.input}` : classes.input
					} `}
					tips={
						<a href="" className={classes.tips} data-tip="Front product information">
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
					{hasFlavourError || (nextStepClicked && !enteredFlavour) ? <p>* Filling out this field is required</p> : ''}
				</div>
				<Input
					label="Expiration date and batch number *"
					className={`${hasExpirationDateError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
						nextStepClicked && !enteredExpirationDate ? `${classes.invalid} ${classes.input}` : classes.input
					}`}
					tips={
						<a href="" className={classes.tips} data-tip="Overall print on the packaging: e.g. 05.2020 1836 L808052YX.">
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
						<p>* Filling out this field is required</p>
					) : (
						''
					)}
				</div>

				<div className={classes['textarea-div']}>
					<label className={classes['textarea-label']} htmlFor="textarea">
						<div>Description of the situation*</div>
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
					{hasMessageError || (nextStepClicked && !enteredMessage) ? <p>* Filling out this field is required</p> : ''}
				</div>

				<Input
					className={`${hasPurchasePlaceError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
						nextStepClicked && !enteredPurchasePlace ? `${classes.invalid} ${classes.input} ` : classes.input
					} `}
					tips={
						<a
							href="#"
							className={classes.tips}
							data-tip="Please provide the store name and its address. This will allow us to check the storage conditions of our goods">
							<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
						</a>
					}
					label="Where and when was the product purchased*"
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
						<p>* Filling out this field is required</p>
					) : (
						''
					)}
				</div>

				<OptionInput
					className={`${nextStepClicked && !enteredPackageKept ? classes.invalid : ''}`}
					label="Has the packaging been retained*"
					name="is-package"
					value={enteredPackageKept}
					onChange={packageKeptHandler}
					options={[
						'Yes, I have the packaging with the product',
						'Yes, I have the empty packaging',
						'No, I only have the product',
						'No, the packaging with the product has been discarded',
					]}
				/>
				<div className={classes['invalid-input']}>
					{nextStepClicked && !enteredPackageKept ? <p>* Filling out this field is required</p> : ''}
				</div>
				<div className={classes['dragdrop-div']}>
					<label htmlFor="text">
						<div className={classes.description}>Please attach photos of the packaging and the product</div>
						<div>
							<a
								href="#"
								className={classes.tips}
								data-tip="We kindly request you to take photos of at least the entire packaging and the closure. Photos of each side of the product are highly appreciated">
								<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
							</a>
						</div>
					</label>

					<FileInput />
				</div>

				<p>In order to provide a comprehensive and timely response to your report, please provide additional information:</p>
				<OptionInput
					className=""
					label="Type of packaging"
					name="package"
					value={enteredPackageType}
					onChange={packageTypeHandler}
					options={[
						'small cardboard box',
						'cardboard box',
						'glass bottle',
						'plastic bottle',
						'can',
						'sachet',
						'plastic packaging',
						'others',
					]}
				/>
				<OptionInput
					className=""
					label="Capacity / Grammage"
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
					label="Please describe the condition of the packaging"
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
					label="Where and for how long was the product stored before opening"
					input={{
						types: 'text',
						value: enteredPackageStorageBefore,
						name: '',
						onChange: packageStorageBeforeHandler,
						onBlur: () => {},
					}}
				/>
				<DateInput
					label="Date of first opening of the product"
					input={{ types: 'date', id: '', value: enteredFirstOpen, onChange: firstOpenHandler, onBlur: () => {} }}
				/>
				<Input
					tips=""
					className={classes.input}
					label="Where and for how long was the product stored after opening"
					input={{
						types: 'text',
						value: enteredPackageStorageAfter,
						name: '',
						onChange: packageStorageAfterHandler,
						onBlur: () => {},
					}}
				/>
				<DateInput
					label="When were the changes in the product noticed"
					input={{
						types: 'date',
						id: '',
						value: enteredProductChange,
						onChange: productChangeHandler,
						onBlur: () => {},
					}}
				/>
				<p className={classes['need-inputs']}>* Fields marked with an asterisk (*) are required.</p>
			</div>
			<div className={classes.buttons}>
				<button className={classes.prevButton}
					onClick={() => {
						dispatch(dataActions.defaultData())
						dispatch(dataActions.addId(''))
						navigate(`..`)
					}}>
					<span>Previous step</span>
				</button>

				<button>Next step</button>
			</div>
		</form>
	)
}

export default MainProductComplain
