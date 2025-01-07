export class PaginationBuilder {
  static build(page: number, limit: number): string {
    if (page < 0 || limit < 0) throw new Error("Page and limit must be greater than 0");

    const offset = (page - 1) * limit;
    return `LIMIT ${limit} OFFSET ${offset}`;
  }
}
