const knex = require("../library/db");

const redis = require("../library/redis");

// const getCountOfRequests = async(email) => {
//   const cacheKey = userid;
//   const expiryTime = 60 * 3;
//   const cachedUser = await redis.get(cacheKey);
//   if (cachedUser) {
//     return JSON.parse(cachedUser);
//   }
//   redis.incr()
//   redis.setEx(cacheKey, expiryTime,).then((cache) => {
//     return data;
//   });
// }

const getCount = (email) => {
  return knex
    .raw(
      "select count(*) from allusersrequests where email = ?  and requesttime >= ?",
      [email, Date.now() - 60 * 1000]
    )
    .then((data) => {
      return Array.isArray(data.rows) && data.rows[0];
    })
    .catch((err) => {throw err});
};
const storeRequestDetails = (email) => {
  return knex
    .raw("insert into allusersrequests(email,requesttime) values (?,?)", [
      email,
      Date.now(),
    ])
    .then((rows) => rows)
    .catch((err) => {throw err});
};

module.exports = { getCount, storeRequestDetails };
