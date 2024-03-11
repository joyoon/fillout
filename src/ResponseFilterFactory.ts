import { FilterClauseType } from "./FilterClauseType"
import { DoesNotEqual } from "./FilterFunctions/DoesNotEqual"
import { Equals } from "./FilterFunctions/Equals"
import { GreaterThan } from "./FilterFunctions/GreaterThan"
import { LessThan } from "./FilterFunctions/LessThan"
import { IsMatch } from "./ResponseFilter"
import { ResponseFilter } from "./ResponseFiltersType"

const ResponseFilterFactory = (filterClause: FilterClauseType): ResponseFilter => {
    switch(filterClause.condition) {
      case 'equals':
        return IsMatch(Equals)(filterClause.id)(filterClause.value)
      case 'does_not_equal':
        return IsMatch(DoesNotEqual)(filterClause.id)(filterClause.value)
      case 'greater_than':
        return IsMatch(GreaterThan)(filterClause.id)(filterClause.value)
      case 'less_than':
        return IsMatch(LessThan)(filterClause.id)(filterClause.value)
    }
  }
  
  export { ResponseFilterFactory }