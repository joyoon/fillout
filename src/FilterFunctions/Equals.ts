import { FilterFunctionType } from "../FilterFunctionType"
import { InputType } from "../InputType"

const Equals: FilterFunctionType = (targetValue: InputType, compareValue: InputType): boolean => {
    return compareValue === targetValue
}

export { Equals }