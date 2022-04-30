const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CURDL functions

async function list (req, res, next) {
    const key = req.query.is_showing
    const fullList = await service.list()
    const isShowing = await service.listOfShowingMovies()
    const data  = key ? isShowing : fullList
    res.json({data})
}

async function read (req, res, next) {
    const data = res.locals.movie
    res.json({data})
}

async function readTheaters (req, res, next) {
    const data = await service.readTheatersForMovie(req.params.movieId)
    res.json({data})
}

async function listOfReviews (req, res, next) {
    const data = await service.listOfReviews(req.params.movieId)
    res.json({data})
}

// validation functions

async function movieExists (req, res, next) { 
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({
        status: 404,
        message: "Movie cannot be found."
    })
}



module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [movieExists, asyncErrorBoundary(read),],
    readTheaters: [movieExists, asyncErrorBoundary(readTheaters)],
    listOfReviews: [movieExists, asyncErrorBoundary(listOfReviews)],
  };