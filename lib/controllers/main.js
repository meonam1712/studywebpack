import express    from 'express';
import React      from 'react';
import { Router } from 'react-router';
import Location   from 'react-router/lib/Location';
import routes     from 'routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider }                     from 'react-redux';
// import thunk from 'redux-thunk';
import * as reducers                    from 'reducers';
import promiseMiddleware   from 'lib/promiseMiddleware';
const app = express();
import fetchComponentData from 'lib/fetchComponentData';
import * as Act from 'actions/AccessControlActions';
import path from 'path';
import Helmet from 'react-helmet';
import HTMLEntities from 'he';

export const delegate =  function (req, res, next) {
  const location = new Location(req.path, req.query);

  const reducer  = combineReducers(reducers);
  // const store    = createStore(reducer);
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);


  Router.run(routes, location, async (err, routeState) => {
    if (err) return console.error(err);
     if(!routeState) return res.status(404).end('404');

     const { accessToken } = req.cookies;
     await store.dispatch(Act.authenticateByAccessToken(accessToken));

      function renderView() {
        const InitialView = (
          <Provider store={store}>
            {() =>
              <Router {...routeState} />
            }
          </Provider>
        );
        const componentHTML = React.renderToString(InitialView);
        let header = Helmet.rewind() || { title: 'Lozi.vn', meta: '' };

        const initialState = store.getState();
        const HTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>${HTMLEntities.decode(header.title)}</title>
              ${HTMLEntities.decode(header.meta)}
              <link rel="stylesheet" href="/dist/styles/bootstrap.lozi.css">
              <link rel="stylesheet" href="/dist/styles/main.css">
            </head>
            <body>
               <div id="react-view">${componentHTML}</div>
              <script type="application/javascript">
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
              </script>
              <script type="application/javascript" src="/dist/bundle.js"></script>
            </body>
          </html>
          `;
        return HTML;
    }

    fetchComponentData(store.dispatch, routeState.components, routeState.params)
      .then(renderView)
      .then(html => res.end(html))
       .catch(err => res.end(err.message));
  });
}
