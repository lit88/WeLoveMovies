const service = require("./movies.service");
const moviesTheatersService = require("../movies_theaters/movies_theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list (req, res, next) {
    const key = req.query.is_showing
    const fullList = await service.list()
    const isShowing = await moviesTheatersService.list()
    const data  = key ? isShowing : fullList
    res.json({data})
}


module.exports = {
    list: asyncErrorBoundary(list),
  };