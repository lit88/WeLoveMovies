const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

function list() {
  return knex("movies").select("*");
}

function listOfShowingMovies() {
    return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id")
  }

function read(movieId) {
    return knex("movies").select("*")
    .where({"movie_id": movieId}).first()
}

function readTheatersForMovie(movieId) {
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({"mt.movie_id": movieId})
  }

function listOfReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({"r.movie_id": movieId})
    .then(reviews => reviews.map(review => addCritic(review)))
}

module.exports = {
  list,
  listOfShowingMovies,
  read,
  listOfReviews,
  readTheatersForMovie,
};