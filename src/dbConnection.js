import mongoose from 'mongoose';

let username = '';
let host = 'localhost';
let port = '27017';
let name = 'ticketApp';

mongoose.connect(`mongodb://${username}${host}:${port}/${name}`);

export const db = mongoose.connection;

db.once('open', () => {
	console.log(`Connected to DB "${name}"`);
});

db.on('error', (err) => {
	console.log(err);
	process.exit(1);
});

export const getCollection = (data, colections, callback) => {
		
	(function rec(cols){

		let current = cols[0];

		data[current.name + 's'] = [];
		
		models[current.name].find(current.rules || {}).limit(current.limit || null).skip(current.skip || null).sort({createdAt : current.order || -1}).exec((err, documents) => {
			
			for (var i = 0; i < documents.length; i++) {
				data[current.name + 's'].push(documents[i]);
			}

			cols.shift();

			if(cols.length > 0){
				rec(cols);
			} else {
				callback();
			}

		});

	})(colections);

}