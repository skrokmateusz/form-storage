import Input from '../UI/Input'
import OptionInput from '../UI/OptionInput'

import classes from './MainProductComplain.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

const MainProductComments: React.FC<{}> = props => {
	return (
		<main>
			{/* <div>
				<Input
					label="Nazwa / smak *"
					className={`${hasFlavourError ? classes.invalid : ''} ${
						isErrorShown && !enteredFlavourIsValid ? classes.invalid : ''
					}`}
					tips={
						<a href="" className={classes.tips} data-tip="Informacja na froncie produktu">
							<FontAwesomeIcon icon={faCircleQuestion} className={classes.icon} />
						</a>
					}
					input={{
						types: 'text',
						id: 'flavour',
						value: enteredFlavour,
						onChange: flavourChangeHandler,
						onBlur: flavourBlurHandler,
					}}
				/>
				<Input className={classes.inputs} label="Data ważności i numer partii *" input={{ type: 'text' }} />
				<Input className={`${classes.inputs} ${classes.message}`} label="Opis sytuacji *" input={{ type: 'text' }} />
				<p>Miejsce na dołączenia zdjęć</p>
				<OptionInput
					className=""
					label="Rodzaj opakowania"
					name="package"
					value=""
					onChange={() => {}}
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
					value=""
					onChange={() => {}}
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
				<p>* Pola oznaczone gwiazdką są wymagane</p>
			</div> */}
		</main>
	)
}

export default MainProductComments
