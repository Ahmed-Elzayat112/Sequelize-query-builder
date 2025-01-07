export interface WhereCondition {
  field: string;
  operator: string;
  value: any;
}

export interface JoinOption {
  table: string;
  alias?: string;
  on: string;
  fields?: string[];
  nestedJoin?: JoinOption;
}

export interface OrderOption {
  field: string;
  direction: "ASC" | "DESC";
}

export interface Pagination {
  page: number;
  limit: number;
}

export type WhereOperator = "=" | "!=" | "<" | ">" | "<=" | ">=" | "LIKE" | "IN" | "BETWEEN";
