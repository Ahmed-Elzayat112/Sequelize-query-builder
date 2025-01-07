export const validOperators = ["=", "!=", "<", ">", "<=", ">=", "LIKE", "IN", "BETWEEN"];

export function validateOperator(operator: string): boolean {
  return validOperators.includes(operator.toUpperCase());
}

//TODO: use this validator
export function validateField<T>(fields: string | string[], model: T): boolean {
  const keys = Object.keys(model) as (keyof T)[];

  if (Array.isArray(fields)) {
    return fields.every((field) => keys.includes(field as keyof T));
  }

  return keys.includes(fields as keyof T);
}
