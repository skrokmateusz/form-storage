import { ChangeEvent } from "react"

interface InputType {
	types: string
	name: string
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
	onBlur: () => void
}

export default InputType


// export interface OptionInputType {
// 	types: string
// 	id: string
// 	value: string
// 	onChange: (event: ChangeEvent) => void
// 	onBlur: () => void
// }