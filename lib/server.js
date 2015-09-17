import express    from 'express';
import path from 'path';
import routes from './routes';

const app = express();

var cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
// Set up routes
routes.forEach(route => {
  app[route.method.toLowerCase()](route.path, route.handler);
});

export default app;
