const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CURDL functions

async function destroy (req, res, next) {
    const { review } = res.locals
    await service.destroy(review.review_id)
    res.sendStatus(204)
}

async function update (req, res, next) {
    const updatedReview = {...req.body.data, review_id: res.locals.review.review_id}
    await service.update(updatedReview)
    const data = await service.getUpdatedReview(updatedReview.review_id)
    res.json({data})
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
    delete: [reviewExists, asyncErrorBoundary(destroy)],
    update: [reviewExists, asyncErrorBoundary(update)],
};