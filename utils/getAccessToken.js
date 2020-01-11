const rp = require("request-promise");

const APPID = "wx842b4d6b22bc0ebc";
const APPSECRET = "07b4b0c28809c00a2475522aae71a2d1";

const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;

const fs = require("fs");
const path = require("path");
const fileName = path.resolve(__dirname, "./access_token.json");

const updateAccessToken = async () => {
  const resStr = await rp(URL);
  const res = JSON.parse(resStr);
  console.log(res);
  //保存token，写文件
  if (res.access_token) {
    fs.writeFileSync(
      fileName,
      JSON.stringify({
        access_token: res.access_token,
        createTime: new Date()
      })
    );
  } else {
    await updateAccessToken();
  }
};

//取token
const getAccessToken = async () => {
  try {
    const readRes = fs.readFileSync(fileName, "utf8");
    const readObj = JSON.parse(readRes);
    console.log(readObj);

    const createTime = new Date(readObj.createTime).getTime();
    const nowTime = new Date().getTime();
    //大于2小时即过期时更新token
    if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
      await updateAccessToken();
      await getAccessToken();
    }
    return readObj.access_token;
  } catch (error) {
    await updateAccessToken();
    await getAccessToken();
  }
};

//定时更新token
setInterval(async () => {
  await updateAccessToken();
}, (7200 - 300) * 1000);

// updateAccessToken();
// console.log(getAccessToken());
module.exports = getAccessToken;
