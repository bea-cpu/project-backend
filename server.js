const express = require("express");
const cors = require("cors");
const path = require("path");
const userScheduleRoutes = require('./routes/userScheduleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/schedules', userScheduleRoutes);

const adminSchedules = require('./routes/adminScheduleRoutes');
app.use('/api/admin/schedules', adminSchedules);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));


app.use("/api/admin", require("./routes/adminRoutes"));



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
