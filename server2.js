import express from "express";
const app = express();

let ipArray = [];

const middleware = (req, res, next) => {
  let ipOfUser = req.ip;
  if (ipArray.length > 0) {
    ipArray.map((x, index) => {
      return x.ipAddress === ipOfUser && x.experyTime > new Date().getMinutes()
        ? x.totalRequest > 1
          ? { ...x, totalRequest: x.totalRequest-- }
          : -res.status(429).json({
              message: "1 minute only 5 request",
            })
        : (ipArray[index] = {
            ipAddress: ipOfUser,
            totalRequest: 5,
            experyTime: new Date().getMinutes() + 1,
          });
    });
  } else {
    ipArray.push({
      ipAddress: ipOfUser,
      totalRequest: 5,
      experyTime: new Date().getMinutes() + 1,
    });
  }
  console.log(ipArray);
  next();
};

app.get("/data", middleware, (req, res) => {
  res.status(200).json({
    name: "Mohamamdtalha",
  });
});

app.listen(5000, () => console.log("server2 is running"));
