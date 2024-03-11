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
  console.log('filterresponses start')
  return responses.filter((response: any) => {
    return !IsResponseFiltered(response, responseFilters)
  })
}

const IsResponseFiltered = (response: any, responseFilters: ResponseFilter[]) => {
  console.log(`isresponsefiltered starting`)
  console.log(`submissionId ${response.submissionId}`)
  const isResponseFiltered = responseFilters.some((filter) => {
    return !filter(response.questions)
  })

  console.log(`isResponseFiltered ${isResponseFiltered}`)
  return isResponseFiltered
}

const IsMatch = (filterFunction: FilterFunctionType) => {
  return (targetQuestionId: InputType) => {
    return (targetValue: InputType) => {
      return (questions: Question[]) => {
        return questions.some((question) => {
          console.log('IsMatch running')
          console.log(`targetQuestionId ${targetQuestionId} question.id ${question.id} targetValue ${targetValue} question.value ${question.value}) ${targetQuestionId === question.id && filterFunction(targetValue, question.value)}`)
          return targetQuestionId === question.id && filterFunction(targetValue, question.value)
        })
      }
    }
  }
}

export { FilterResponses, GetResponseFilters, IsMatch }