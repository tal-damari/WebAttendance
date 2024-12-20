import express from 'express';
import adminRouter from './routers/adminLogin.js';
import usersRouter from './routers/usersLogin.js';
import attendanceRouter from './routers/attendance.js';
import actionsRouter from './routers/adminActions.js';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Attendance! your easy way to check in and to check out at work!');
})

app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/actions', actionsRouter);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));