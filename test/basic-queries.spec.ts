import { Op } from "sequelize";
import { QueryBuilder } from "../src/index";

describe("QueryBuilder", () => {
  it("should create a query with LIKE operator for strings", () => {
    const filters = { name: "John" };
    const query = QueryBuilder.buildQuery(filters);
    expect(query).toEqual({
      where: { name: { [Op.like]: "%John%" } },
    });
  });
});
