import { ChangeEvent } from "react"

interface InputType {
	types: string
	name: string
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
	onBlur: () => void
}

export default InputType
