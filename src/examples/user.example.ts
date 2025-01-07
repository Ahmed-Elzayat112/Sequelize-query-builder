import { QueryBuilder } from "@src/builders/QueryBuilder";
import { PostTable, UserTable } from "@src/types/tablesSchemaExamples";

const query = new QueryBuilder<UserTable>("users", "u")
  .select(["id", "name", "email"])
  .join<PostTable>("posts", "p", "u.id = p.userId")
  .where("content", "=", "active")
  .where("createdAt", "<=", new Date("2023-01-01"))
  .groupBy(["id"])
  .orderBy("createdAt", "ASC")
  .paginate(1, 10)
  .build();

console.log(query);
// Output:
// SELECT id, name, email
// FROM users AS u
// LEFT JOIN posts AS p ON u.id = p.userId
// WHERE status = 'active' AND createdAt > '2023-01-01'
// GROUP BY id
// ORDER BY name ASC
// LIMIT 10 OFFSET 0
