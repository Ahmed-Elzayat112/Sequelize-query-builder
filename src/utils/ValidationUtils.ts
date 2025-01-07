export const validOperators = ["=", "!=", "<", ">", "<=", ">=", "LIKE", "IN", "BETWEEN"];

export function validateOperator(operator: string): boolean {
  return validOperators.includes(operator.toUpperCase());
}
