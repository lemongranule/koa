'use strict';


const cluster = require('cluster');
const Koa = require('koa');

const Router = require('koa-router')  //路由依赖的中间间
const bodyParser = require('koa-bodyparser')
// 配置
const config = require('./config');
const packageConfig = require('./package.json');
config['version'] = packageConfig['version'];


const app = new Koa();



// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });



app.use(require('./routes/root').routes());
app.use(require('./routes/index').routes());


// 启动服务
const port = process.env.PORT || config.port;
if (cluster.isMaster) {
	let processes = config.processes > 0 ? config.processes : require('os').cpus().length;
	for (let i = 0; i < processes; i++) {
		cluster.fork();
	}

	cluster.on('listening', function(worker, address) {
		console.log(`server is listening: pid=${worker.process.pid}, address=${address.address}:${address.port}`);
	});

	cluster.on('exit', function(worker, code, signal) {
		console.error(`server exit: pid= ${worker.process.pid}`);
	});

	console.log(`[app.env] ${app.env}`);

} else {
	app.listen(port);
}


module.exports = app;