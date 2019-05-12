import express from 'express';
import config from './../../config/config';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`Hi develop! localhost:${config.port}/api`);
});

export default router;
