import { FilterClauseType } from "./FilterClauseType";
import { InputType } from "./InputType";
import { Question } from "./Question";
import { Equals } from "./FilterFunctions/Equals";
import { GreaterThan } from "./FilterFunctions/GreaterThan";
import { LessThan } from "./FilterFunctions/LessThan";
import { DoesNotEqual } from "./FilterFunctions/DoesNotEqual";
import { ResponseFilterFactory } from "./ResponseFilterFactory";
import { FilterFunctionType } from "./FilterFunctionType";
import { ResponseFilter } from "./ResponseFiltersType";

const GetResponseFilters = (filterClauses: FilterClauseType[]): ResponseFilter[] => {
  const responseFilters = filterClauses.map<ResponseFilter>((filterClause) => { return ResponseFilterFactory(filterClause) })

  return responseFilters
}

const FilterResponses = (responses: any[], responseFilters: ResponseFilter[]): any[] => {
  return responses.filter((response: any) => {
    return !IsResponseFiltered(response, responseFilters)
  })
}

const IsResponseFiltered = (response: any, responseFilters: ResponseFilter[]) => {
  const isResponseFiltered = responseFilters.some((filter) => {
    return !filter(response.questions)
  })

  return isResponseFiltered
}

const IsMatch = (filterFunction: FilterFunctionType) => {
  return (targetQuestionId: InputType) => {
    return (targetValue: InputType) => {
      return (questions: Question[]) => {
        return questions.some((question) => {
          return targetQuestionId === question.id && filterFunction(targetValue, question.value)
        })
      }
    }
  }
}

export { FilterResponses, GetResponseFilters, IsMatch }