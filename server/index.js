import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import cors from 'cors';


import { users, messages, groups } from './routes/index';

const app = express();
app.use(cors());
// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/auth', users);
app.use('/api/v1', messages);
app.use('/api/v1/groups', groups);
app.get('/', (req, res) => {
  res.send('Visit /api/v1 to view API cheers!!!');
});
const port = process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, () => console.log(`listening on port ${port}....`));
export default app;
