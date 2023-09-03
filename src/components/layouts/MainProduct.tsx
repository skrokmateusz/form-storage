/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useInput from '../hooks/use-input'
import useOptionInput from '../hooks/use-optionInput'
import Input from '../UI/Input'
import OptionInput from '../UI/OptionInput'
import FileInput from '../UI/FileInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import { dataActions } from '../store/data'

import classes from './MainProductComplain.module.css'

const MainProductQuestion: React.FC = () => {
	const [nextStepClicked, setNextStepClicked] = useState<boolean>(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
			window.scrollTo({
				top: 250,
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
				<div className={classes['dragdrop-div']}>
					<label htmlFor="text">
						<div className={classes.description}>Please attach photos of the packaging and the product.</div>
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
						'others',
					]}
				/>
				<p className={classes['need-inputs']}>Fields marked with an asterisk (*) are required.</p>
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

export default MainProductQuestion
