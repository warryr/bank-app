const jwt = require('jsonwebtoken');

const secret = '5D7C6CD34FC3587A38F13CDC7E789';
const toExpire = 1000*60*60;

const getJwt = user => jwt.sign({
  id: user.id,
  expiration: (new Date).getTime() + toExpire
}, secret);

const verifyJwt = req => {
  let token = req.header('Authorization');
  if (token !== undefined && token.startsWith('Bearer ')) {
    token = token.slice(7);
  } else {
    return false;
  }
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.expiration > (new Date).getTime();
  } catch(err) {
    return false;
  }
};

const tryAuthorize = (req, res) => {
  if (!verifyJwt(req)) {
    res.status(401);
    res.send();
    return false;
  }
  return true;
};

module.exports = {
  getJwt: getJwt,
  tryAuthorize: tryAuthorize,
};