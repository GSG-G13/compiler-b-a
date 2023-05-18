const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'..', "public","build")));
app.post("/", (req, res) => {
  const { program } = req.body;

  exec(
    `node -e "${program.replace(/"/g, '\\"').replace(/\n/g, ";")}"`,
    (error, stdout, stderr) => {
      if (stderr) {
        res.status(200).json({ error: true, result: stderr });
        return;
      }
      if (stdout) {
        res.status(200).json({ error: false, result: stdout });
        return;
      }
    }
  );
});

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}...`);
});



