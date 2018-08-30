var path = require('path');
var git = require("git-rev-sync");
var dateFormat = require("dateformat");
var _root = path.resolve(__dirname, '..');
 
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function parseVersion() {
  process.env.GIT_COMMIT_ID = git.short();
  process.env.GIT_BRANCH = git.branch();

  let now = new Date();
  process.env.GIT_BUILD_TIME = dateFormat(now, 'dd/mm/yyyy');

  let number = process.env.DEPLOY_MAJOR + '.' + process.env.DEPLOY_MINOR + '.' + process.env.DEPLOY_POINT;
  let build_type = process.env.DEPLOY_BUILD_TYPE;

  let firstName = process.env.DEPLOY_PROJECT_NAME + '-frontend-' + process.env.DEPLOY_RELEASE_NAME + '-' + dateFormat(now, 'yyyymmdd') + '-build-' + number + '-' + build_type;
  let lastName = '-Rev-' + process.env.GIT_COMMIT_ID;

  return version = firstName + lastName;
}
module.exports = {
  root,
  parseVersion
}