const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();


const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));



app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/event", eventRouter)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});