const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB");
const cloudStorage = require("../utils/callCloudStorage");

router.get("/list", async (ctx, next) => {
  const query = `db.collection('swiper').get()`; // 默认获取10条数据
  const res = await callCloudDB(ctx, "databasequery", query);
  console.log(res);

  // 文件下载链接
  let fileList = [];
  const data = res.data;
  for (let i = 0, len = data.length; i < len; i++) {
    // console.log(JSON.parse(data[i]).fileid);
    fileList.push({
      // fileid: JSON.parse(data[i]).fileid,
      fileid: `cloud://test-8l4sl.7465-test-8l4sl-1300954619/swiper/banner${i+1}.jpg`,
      max_age: 7200
    });
  }
  console.log(fileList)
  const dlRes = await cloudStorage.download(ctx, fileList);
  console.log(dlRes);

  let returnData = [];
  for (let i = 0, len = dlRes.file_list.length; i < len; i++) {
    returnData.push({
      download_url: dlRes.file_list[i].download_url,
      fileid: dlRes.file_list[i].fileid,
      _id: JSON.parse(data[i])._id
    });
  }
  ctx.body = {
    code: 20000,
    data: returnData
  };
});

module.exports = router;
