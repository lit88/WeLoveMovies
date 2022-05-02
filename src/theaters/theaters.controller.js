const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CURDL functions

async function list(req, res, next) {
    const data = await service.list()
    res.json({data})
}


module.exports = {
    list: [asyncErrorBoundary(list)],
};