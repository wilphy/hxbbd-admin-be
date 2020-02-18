const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  const query = `
      db.collection('blog').skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
  `;
  const res = await callCloudDB(ctx, "databasequery", query);
  ctx.body = {
    code: 20000,
    data: res.data
  };
});

module.exports = router;
