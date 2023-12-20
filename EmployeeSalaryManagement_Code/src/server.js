const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: ' username',
  password: '#password',
  database: 'EmployeeInfo'  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/submitEmployeeDetails', (req, res) => {
  const formData = req.body;

  const query = 'INSERT INTO Employee SET ?';

  connection.query(query, formData, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.status(200).json({ success: true, message: 'Data inserted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
