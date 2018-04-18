const connection = require("./connection.js")['connection'];

const orm = {
	checkDB: (movies, cb) => {
		let needAdded;
		let saved;
		connection.query('SELECT * FROM movies', (err, data) => {
			if (err) throw err;

			movies.forEach((movie) => {
				console.log('ROOOOOOOOT', movie.rootId);
				data.forEach((db) => {
					if (Number(movie.rootId) === Number(db.movie_id)) {
						console.log(db.temp);
					} else {
						connection.query(`INSERT INTO movies (movie_id, temp, temp_count, ratings) VALUES
						(${movie.rootId}, 75, 0, '{1: 0, 2: 0, 3: 0, 4: 0, 5: 0}')`, (err, res) => {
							if (err) throw err;
						});
					}

				})
			})
		})
		cb('test');
	},

	getMovie: (rootId, cb) => {
		// 
		// Do connection.query here to get
		// users temperature score and votes on
		// categories
		// 

		connection.query(`SELECT * FROM movies WHERE movie_id=${rootId}`, (err, data) => {
			if (err) throw err;
			console.log('DATA', data);
		})
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