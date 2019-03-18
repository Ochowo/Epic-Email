import express from 'express';
import bodyParser from 'body-parser';
import { users, messages } from './routes/index';

const app = express();
// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/auth', users);
app.use('/api/v1', messages);
app.get('/', (req, res) => {
  res.send('Visit /api/v1 to view API cheers!!!');
});
const port = process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, () => console.log(`listening on port ${port}....`));
export default app;