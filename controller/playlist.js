const Router = require("koa-router");
const router = new Router();
const rp = require("request-promise");

const getAccessToken = require("../utils/getAccessToken");

router.get("/list", async (ctx, next) => {
  const access_token = await getAccessToken();
  const ENV = "test-8l4sl";
  //查询歌单列表
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ENV}&name=music`;

  //发送请求
  var options = {
    method: "POST",
    uri: url,
    body: {
      $url: "playlist",
      start: 0,
      count: 20
    },
    json: true // Automatically stringifies the body to JSON
  };

  ctx.body = await rp(options)
    .then(res => {
      // console.log(res);
      return JSON.parse(res.resp_data).data;
    })
    .catch(function(err) {
      // POST failed...
    });

  // ctx.body = "歌单列表";
});

module.exports = router;
