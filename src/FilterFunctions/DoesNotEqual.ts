import { FilterFunctionType } from "../FilterFunctionType"
import { InputType } from "../InputType"

const DoesNotEqual: FilterFunctionType = (targetValue: InputType, compareValue: InputType): boolean => {
    return compareValue !== targetValue
}

export { DoesNotEqual }