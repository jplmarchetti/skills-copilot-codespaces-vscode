// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    pathname += 'index.html';
  }
  var extname = path.extname(pathname);
  if (pathname === '/index.html') {
    var data = fs.readFileSync('./index.html', 'utf-8');
    var commentsHtml = comments.get().map(function(comment) {
      return '<div>' + comment + '</div>';
    }).join('');
    data = data.replace('<!--comments-->', commentsHtml);
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
  } else if (extname === '.css') {
    var data = fs.readFileSync('.' + pathname, 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'text/css'
    });
    res.write(data);
    res.end();
  } else if (extname === '.js') {
    var data = fs.readFileSync('.' + pathname, 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    });
    res.write(data);
    res.end();
  } else if (pathname === '/add') {
    comments.add(urlObj.query.comment);
    res.end();
  } else {
    res.end();
  }
}).listen(8080);
console.log('Server started.');
```

###