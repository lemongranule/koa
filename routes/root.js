const router = require('koa-router')(); //引入路由函数





router.get('/', async (ctx, next) => {

	ctx.body="root"

})





module.exports = router