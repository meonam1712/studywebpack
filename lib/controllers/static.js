import path from 'path';

const SEND_FILE_OPTS = {
  root: path.join(__dirname, '../../dist')
};

export const serveFavicon = (req, res) => {
  res.sendFile('/images/favicon.ico', SEND_FILE_OPTS);
};

export const serve = (req, res) => {
  res.sendFile(req.params[0], SEND_FILE_OPTS);
};
