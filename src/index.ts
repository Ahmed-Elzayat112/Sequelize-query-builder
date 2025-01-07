import { FindOptions, Op } from "sequelize";

export class QueryBuilder {
  static buildQuery(filters: Record<string, any>): FindOptions {
    const where: Record<string, any> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === "string") {
        where[key] = { [Op.like]: `%${value}%` };
      } else {
        where[key] = value;
      }
    }
    return { where };
  }
}
