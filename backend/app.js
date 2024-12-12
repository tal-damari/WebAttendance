import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Attendance! your easy way to check in and to check out at work!');
})



app.listen(8080, () => console.log('Server is running on http://localhost:8080'));