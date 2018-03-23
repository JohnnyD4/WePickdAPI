const orm = {
    getMovie: (rootId, cb) => {
        // 
        // Do connection.query here to get
        // users temperature score and votes on
        // categories
        // 

        const build = {
            temp: '80',
            1: 3,
            2: 5,
            3: 8,
            4: 16,
            5: 2,
        };

        cb(build);
    },

    postCategoryVote: (rootId, categoryId, score, cb) => {
        // 
        // Do connection.query here to set
        // the vote amount for that category
        // based on the id
        // 

        const build = {
            2: 6,
        };

        cb(build);
    },

    postTemperature: (rootId, temp, cb) => {
        // 
        // Do connection.query here to set
        // the new temperature/meter for that
        // movie 
        // 
    }
};

module.exports = orm;