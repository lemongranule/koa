const path = require('path');


const base = {
	port: 6325,
};

const dev = Object.assign({}, base, {
	processes: 1,
	env: require('./dev.env'),
	domain: 'localhost:6325',
});

const prod = Object.assign({}, base, {
	processes: -1,
	env: require('./prod.env'),
	domain: 'linyukai.com/api',
});

const config = process.env.NODE_ENV === 'production' ? prod : dev;



module.exports = config;