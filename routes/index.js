const router = require('koa-router')({
	prefix: '/index',
}); //引入路由函数




router.get('/', async (ctx, next) => {

	ctx.body="index"

})



module.exports = router