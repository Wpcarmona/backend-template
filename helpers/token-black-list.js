const blacklist = [];

const add = (token) => {
  blacklist.push(token);
};
const isBlacklisted = (token) => {
  return blacklist.includes(token);
};

module.exports = {
  add,
  isBlacklisted,
};
