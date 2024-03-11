import { InputType } from "./InputType";

type FilterFunctionType = (targetValue: InputType, compareValue: InputType) => boolean

export { FilterFunctionType }