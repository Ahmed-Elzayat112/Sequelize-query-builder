import { Injectable } from "@nestjs/common";
import { FindOptions } from "sequelize";
import { QueryBuilder } from "../index";

@Injectable()
export class QueryBuilderService {
  build(filters: Record<string, any>): FindOptions {
    return QueryBuilder.buildQuery(filters);
  }
}
