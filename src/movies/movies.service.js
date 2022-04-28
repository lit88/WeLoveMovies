const knex = require("../db/connection");

const tableName = "movies";

function list() {
  return knex(tableName).select();
}

module.exports = {
  list,
};