import { QueryBuilder } from "@src/index";

interface UserTable {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}

describe("QueryBuilder", () => {
  it("should generate a SELECT query with WHERE condition", () => {
    const query = new QueryBuilder<UserTable>("users")
      .select(["id", "name"])
      .where("status", "=", "active")
      .build();

    expect(query).toBe("SELECT id, name FROM users WHERE status = 'active'");
  });
});
