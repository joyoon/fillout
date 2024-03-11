import { FilterFunctionType } from "../FilterFunctionType"
import { InputType } from "../InputType"

const GreaterThan: FilterFunctionType = (targetValue: InputType, compareValue: InputType): boolean => {
    return compareValue > targetValue
}

export { GreaterThan }