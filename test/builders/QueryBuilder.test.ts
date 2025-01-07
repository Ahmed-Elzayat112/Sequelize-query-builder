import { QueryBuilder } from "@src/index";

interface UserTable {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
}

describe("QueryBuilder", () => {
  it("should generate a valid SELECT query", () => {
    const qb = new QueryBuilder<UserTable>("users")
      .select(["id", "name"])
      .where("status", "=", "active")
      .orderBy("name", "ASC")
      .build();

    expect(qb).toBe("SELECT id, name FROM users WHERE status = 'active' ORDER BY name ASC");
  });

  //TODO: fix join
  // it("should generate a query with JOIN", () => {
  //   const qb = new QueryBuilder<UserTable>("users")
  //     .where("status", "=", "active")
  //     .join("posts", "p", "users.id = posts.userId")
  //     .build();

  //   expect(qb).toBe(
  //     "SELECT * FROM users LEFT JOIN posts AS p ON users.id = posts.userId WHERE status = 'active'"
  //   );
  // });

  it("should generate a query with multiple WHERE conditions", () => {
    const qb = new QueryBuilder<UserTable>("users")
      .select(["id", "email"])
      .where("status", "=", "active")
      .where("createdAt", ">", new Date("2023-01-01"))
      .build();

    expect(qb).toBe(
      `SELECT id, email FROM users WHERE status = 'active' AND createdAt > '${new Date("2023-01-01")}'`
    );
  });

  it("should generate a query with LIMIT and OFFSET", () => {
    const qb = new QueryBuilder<UserTable>("users").select(["id", "name"]).paginate(10, 10).build();

    expect(qb).toBe("SELECT id, name FROM users LIMIT 10 OFFSET 90");
  });
});
