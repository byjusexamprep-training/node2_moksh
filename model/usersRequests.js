const knex = require("../library/db");

const redis = require("../library/redis");

const checkRequests = async(email) => {
  const cacheKey = email;
  console.log(cacheKey)
  const expiryTime = 20;
  const cachedRate = await redis.get(cacheKey);
  console.log(cachedRate)
  if(cachedRate) {
    if(Number(cachedRate)>3) {
      return "No of tries exceeded"
    }
    return redis.set(cacheKey,(Number(cachedRate)+1).toString()).then(data=>data)
  }
  return redis.setEx(cacheKey,expiryTime,"1").then((data)=> {
    console.log(data+" first")
    return data

  })


  // if (cachedRate > 3) {
  //   return cachedRate
    
  // }
  
  // redis.setEx(cacheKey,expiryTime,)
  // redis.incr()
  // redis.incr()
  // redis.setEx(cacheKey, expiryTime,).then((cache) => {
  //   return data;
  // });
}

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

module.exports = { getCount, storeRequestDetails, checkRequests };
