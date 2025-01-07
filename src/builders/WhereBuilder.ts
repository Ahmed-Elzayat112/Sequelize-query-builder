import { WhereOperator } from "@src/types/QueryBuilderTypes";
import { validOperators } from "../utils/ValidationUtils";

export class WhereBuilder {
  static build<T>(field: keyof T, operator: WhereOperator, value: any): string {
    if (!validOperators.includes(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    const formattedValue = Array.isArray(value) ? `(${value.map((v) => `'${v}'`).join(", ")})` : `'${value}'`;

    return `${String(field)} ${operator} ${formattedValue}`;
  }
}
