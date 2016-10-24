const path = require('path');
const _root = path.resolve(__dirname, '..');

const root = (...args) => path.join(...[_root].concat([...args]));

const checkNodeImport = (context, request, cb) => {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
  } else {
    cb();
  }
}

exports.root = root;
