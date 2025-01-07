import { WhereOperator } from "@src/types/QueryBuilderTypes";
import { JoinBuilder } from "./JoinBuilder";
import { PaginationBuilder } from "./PaginationBuilder";
import { WhereBuilder } from "./WhereBuilder";

export class QueryBuilder<T> {
  private table: string;
  private alias?: string;
  private selectedFields: Array<keyof T> = [];
  private joins: string[] = [];
  private whereConditions: string[] = [];
  private groupByFields: Array<keyof T> = [];
  private orderByFields: string[] = [];
  private pagination?: string;

  constructor(table: string, alias?: string) {
    this.table = table;
    this.alias = alias;
  }

  select(fields: Array<keyof T>): this {
    this.selectedFields.push(...fields);
    return this;
  }

  join<U>(table: string, alias: string, onCondition: string): QueryBuilder<U> {
    const join = JoinBuilder.build(table, alias, onCondition);
    this.joins.push(join);
    return new QueryBuilder<U>(table, alias); // Return a new QueryBuilder for the joined table
  }

  where(field: keyof T, operator: WhereOperator, value: any): this {
    const condition = WhereBuilder.build(field as string, operator, value);
    this.whereConditions.push(condition);
    return this;
  }

  groupBy(fields: Array<keyof T>): this {
    this.groupByFields.push(...fields);
    return this;
  }

  orderBy(field: keyof T, direction: "ASC" | "DESC"): this {
    this.orderByFields.push(`${String(field)} ${direction}`);
    return this;
  }

  paginate(page: number, limit: number): this {
    this.pagination = PaginationBuilder.build(page, limit);
    return this;
  }

  build(): string {
    let query = "SELECT ";
    query += this.selectedFields.length > 0 ? this.selectedFields.join(", ") : "*";
    query += ` FROM ${this.table}`;
    if (this.alias) query += ` AS ${this.alias}`;

    if (this.joins.length > 0) {
      query += ` ${this.joins.join(" ")}`;
    }

    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(" AND ")}`;
    }

    if (this.groupByFields.length > 0) {
      query += ` GROUP BY ${this.groupByFields.join(", ")}`;
    }

    if (this.orderByFields.length > 0) {
      query += ` ORDER BY ${this.orderByFields.join(", ")}`;
    }

    if (this.pagination) {
      query += ` ${this.pagination}`;
    }

    return query;
  }
}
