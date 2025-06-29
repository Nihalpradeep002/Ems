const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/ems', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));


const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  employeeId: String
});

const Employee = mongoose.model('Employee', employeeSchema);


app.get('/employees', async (req, res) => {
  const search = req.query.search?.toLowerCase();
  let employees;

  if (search) {
    employees = await Employee.find({
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { employeeId: new RegExp(search, 'i') }
      ]
    });
  } else {
    employees = await Employee.find();
  }

  res.json(employees);
});


app.post('/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.status(201).json(emp);
});


app.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).send('Not found');
    res.json(emp);
  } catch {
    res.status(400).send('Invalid ID');
  }
});


app.put('/employees/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Not found');
    res.json(updated);
  } catch {
    res.status(400).send('Invalid ID');
  }
});


app.delete('/employees/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Not found');
    res.status(204).send();
  } catch {
    res.status(400).send('Invalid ID');
  }
});


app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
