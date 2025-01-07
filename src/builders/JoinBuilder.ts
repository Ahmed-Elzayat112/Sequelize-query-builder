export class JoinBuilder {
  static build(table: string, alias: string, onCondition: string): string {
    return `LEFT JOIN ${table} AS ${alias} ON ${onCondition}`;
  }
}
