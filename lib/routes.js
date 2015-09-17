import * as mainController from './controllers/main';
import * as staticController from './controllers/static';
export default [{
  method: 'GET',
  path: '/favicon.ico',
  handler: staticController.serveFavicon
}, {
  method: 'GET',
  path: '/*',
  handler: mainController.delegate
}];
