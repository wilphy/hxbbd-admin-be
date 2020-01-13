const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();

const playlist = require("./controller/playlist");
router.use("/playlist", playlist.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = "hello world!";
});

app.listen(3000);
