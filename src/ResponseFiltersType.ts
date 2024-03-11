import { Question } from "./Question";

type ResponseFilter = (questions: Question[]) => boolean

type ResponseFiltersType = ResponseFilter[]

export { ResponseFilter, ResponseFiltersType };