/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigation, Form, useNavigate } from 'react-router-dom';

import Input from '../UI/Input';
import useInput from '../hooks/use-input';
import useInputNotRequired from '../hooks/use-inputnotrequired';
import CartResult from '../pages/CartResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { dataActions } from '../store/data';

import classes from './MainProductComplain.module.css';

const regExpEmail =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regExpNumber = /^\d{9}$/;

const MainSubmissionComplain: React.FC = props => {
	const [sendFormClicked, setSendFormClicked] = useState<boolean>(false);
	const [showCartResult, setShowCartResult] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams();
	const navigation = useNavigation();

	const previousData = useSelector((state: any) => state);

	const previousButtonHandler = () => {
		navigate(`../${param.typeId}`);
		dispatch(dataActions.addUserData({ ...userData }));
	};

	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: hasNameError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value: string) => value !== '', previousData.userData.nameSurname);

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: hasEmailError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value: string) => value.match(regExpEmail), previousData.userData.email);

	const {
		value: enteredNumber,
		isValid: enteredNumberIsValid,
		hasError: hasNumberError,
		valueChangeHandler: numberChangeHandler,
		inputBlurHandler: numberBlurHandler,
	} = useInput((value: string) => value.match(regExpNumber), previousData.userData.phoneNumber);

	const { value: enteredAdress, valueChangeHandler: adressHandler } = useInputNotRequired(previousData.userData.adress);
	const { value: enteredZipCode, valueChangeHandler: zipCodeHandler } = useInputNotRequired(
		previousData.userData.zipCode
	);
	const { value: enteredCity, valueChangeHandler: cityHandler } = useInputNotRequired(previousData.userData.city);

	const correctContent = enteredNameIsValid && enteredEmailIsValid && enteredNumberIsValid;

	const userData = {
		nameSurname: enteredName,
		email: enteredEmail,
		phoneNumber: enteredNumber,
		adress: enteredAdress,
		zipCode: enteredZipCode,
		city: enteredCity,
	};

	const submitFormHandler = (e: FormEvent) => {
		e.preventDefault();

		setSendFormClicked(true);
		if (!correctContent) {
			return;
		}
		setShowCartResult(true);

		dispatch(dataActions.addUserData({ ...userData }));
		const newData = { id: previousData.id, ...previousData.registrationData, ...userData };

		const sendData = async () => {
			const response = await fetch('https://form-17894-default-rtdb.europe-west1.firebasedatabase.app/complain.json', {
				method: 'POST',
				body: JSON.stringify(newData),
			});
			if (!response.ok) {
				setIsError(true);
			}
		};
		sendData();
		return userData;
	};

	const hideResultCart = () => {
		setShowCartResult(false);
		dispatch(dataActions.defaultData());
		dispatch(dataActions.addId(''));
		navigate('..');
	};

	return (
		<>
			<Form method="POST" onSubmit={submitFormHandler}>
				<div className={classes.container}>
					<Input
						label="First name and last name *"
						className={`${hasNameError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
							sendFormClicked && !enteredNameIsValid ? `${classes.invalid} ${classes.input}` : classes.input
						} `}
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
						className={`${hasEmailError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
							sendFormClicked && !enteredEmailIsValid ? `${classes.invalid} ${classes.input}` : classes.input
						} `}
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

					<Input
						className={`${hasNumberError ? `${classes.invalid} ${classes.input} ` : `${classes.input}`} ${
							sendFormClicked && !enteredNumberIsValid ? `${classes.invalid} ${classes.input}` : classes.input
						} `}
						label="Phone number *"
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
						{sendFormClicked && !enteredNumber ? <p>* Filling out this field is required</p> : ''}
						{hasNumberError ? <p>* Invalid phone format. The correct format is 123456789</p> : ''}
					</div>
					<Input
						className={classes.input}
						label="Street, house number"
						tips={
							<a
								href=""
								className={classes.tips}
								data-tip="These details will be needed in case an assessment of the packaging is required">
								<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
							</a>
						}
						input={{ types: 'text', name: '', value: enteredAdress, onChange: adressHandler, onBlur: () => {} }}
					/>
					<Input
						className={classes.input}
						label="Zip code"
						tips=""
						input={{ types: 'text', name: '', value: enteredZipCode, onChange: zipCodeHandler, onBlur: () => {} }}
					/>
					<Input
						className={classes.input}
						label="City"
						tips=""
						input={{ types: 'text', name: '', value: enteredCity, onChange: cityHandler, onBlur: () => {} }}
					/>
					<p className={classes['need-inputs']}>Fields marked with an asterisk (*) are required</p>
				</div>
				<div className={classes.buttons}>
					<button className={classes.prevButton} onClick={previousButtonHandler}>
						<span>Previous step</span>
					</button>
					<button>Submit the form</button>
				</div>
			</Form>
			{showCartResult && <CartResult onClick={hideResultCart} currectState={navigation.state} isError={isError} />}
		</>
	);
};

export default MainSubmissionComplain;
