const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CURDL functions

async function destroy (req, res, next) {
    const { review } = res.locals
    await service.destroy(review.review_id)
    res.sendStatus(204)
}


// validation functions

async function reviewExists (req, res, next) { 
    const review = await service.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({
        status: 404,
        message: "Review cannot be found."
    })
}


module.exports = {
    delete: [reviewExists, asyncErrorBoundary(destroy)]
};