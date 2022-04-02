const Koa=require('koa')
const app=new Koa()
const Router=require('koa-router')
const router=new Router()
const cors=require('koa2-cors')
const koabody=require('koa-body')

const playlist = require('./controller/playlist.js')
const swiper=require('./controller/swiper.js')
const blog=require('./controller/blog.js')

const ENV = '你的云id'


app.use(async(ctx,next)=>{
    console.log('全局中间件')
    ctx.state.env=ENV
    await next()

})
/**
 * 接受post请求,参数解析
 */
app.use(koabody({
    multipart:true,
}))
/**
 * 跨域问题
 */
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))
router.use('/playlist', playlist.routes())
router.use('/swiper', swiper.routes())
router.use('/blog',blog.routes())

app.use(router.routes())
app.use(router.allowedMethods()) 


app.listen(3000,()=>{
    console.log('服务开启在3000端口')
})