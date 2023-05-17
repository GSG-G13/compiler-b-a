const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/', (req, res) => {
  const { program } = req.body;
  console.log(program);
  const modifiedProgram = program.replace(/"/g, '\\"');

  exec(`node -e "${modifiedProgram}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the program: ${error.message}`);
      return res.status(500).json({ error: 'An error occurred while executing the program' });
    }

    res.json({ stdout, stderr });
  });
});
