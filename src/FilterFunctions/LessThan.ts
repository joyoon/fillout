import { FilterFunctionType } from "../FilterFunctionType"
import { InputType } from "../InputType"

const LessThan: FilterFunctionType = (targetValue: InputType, compareValue: InputType): boolean => {
    return compareValue < targetValue
}

export { LessThan }