import knex from "knex";

export abstract class BaseDB {
  protected connection = knex({
    client: "mysql",
    connection: {
      host: "",
      port: 3306,
      user: "",
      password: "",
      database: ""
    }
  });
}