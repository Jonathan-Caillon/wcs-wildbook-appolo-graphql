import { DataSource } from "typeorm";
import { Wilder, Skill } from "./entity";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Skill, Wilder],
  logging: ["query", "error"],
});

export default dataSource;
