const orm = require('./orm');

const model = {
    getMovieData: (rootId, cb) => {
        orm.getMovie(rootId, (res) => {
            cb(res);
        });
    },

    postCategoryVote: (rootId, categoryId, score, cb) => {
        orm.postCategory(categoryId, score, (res) => {
            cb(res);
        });
    },

    postTemperature: (rootId, temp, cb) => {
        orm.posttemp(temp, (res) => {
            cb(res);
        });
    },
};

module.exports = model;