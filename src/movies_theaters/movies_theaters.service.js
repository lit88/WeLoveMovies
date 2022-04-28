const knex = require("../db/connection");

const tableName = "movies_theaters";

function list() {
  return knex(tableName).select()
  .where({"is_showing": true})
  .groupBy("movie_id")
}

module.exports = {
  list,
};