// router imports all pages from pages directory

import glob from 'glob';
import path from 'path';

const glob_ = (dir) => {
	return new Promise((resolve) => {
		glob(dir, (err, files) => {
			err ? reject(err) : resolve(files); 
		});
	})
}

module.exports = async (app) => {

	let files = await glob_(path.resolve(__dirname) + "/controllers/*.js");

	for (var i = 0; i < files.length; i++) {
		let controller = require(files[i]);
		controller(app);
	}

	app.get('*', (req, res) => {
		res.render('404.twig', {layout : 'blank'});
	});
	
}