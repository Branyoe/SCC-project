// import express from 'express'
// const app = express();
// const morgan = require('morgan');
// import
// const packageJson = require('../package.json')


// app.use(morgan('dev'));

// app.set('pkg', packageJson)

// app.get('/', (req, res) => {
//   res.json({
//     name: app.get('pkg').name,
//     author: app.get('pkg').author,
//     description: app.get('pkg').description,
//     version: app.get('pkg').version,
//   });
// })

// app.use('/data-user' ,require('./routes/data-user.routes'))


// module.exports = app;

import express from 'express';
import morgan from "morgan";
import pkg from "../package.json";

import camposRoutes from './routes/campos.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes';
import answerRoutes from './routes/answer.routes';

import {createRoles} from './libs/initialSetup';

const app = express();

createRoles();

app.use(morgan('dev'));
app.use(express.json());
app.set('pkg', pkg);



app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
})

app.use('/api/campos',camposRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/answers', answerRoutes);

export default app;