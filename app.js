const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const ENV = "test-8l4sl";

//跨域
app.use(
  cors({
    origin: ["http://localhost:9528"],
    credentials: true
  })
);

//接收post参数
app.use(
  koaBody({
    multipart: true
  })
);

app.use(async (ctx, next) => {
  console.log("全局中间件");
  ctx.body = "hello world!";
  ctx.state.env = ENV;
  await next();
});

const playlist = require("./controller/playlist");
const swiper = require("./controller/swiper");

router.use("/playlist", playlist.routes());
router.use("/swiper", swiper.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
