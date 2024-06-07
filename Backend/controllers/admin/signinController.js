const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const {Admin} = require('../../db'); 

exports.signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({ username }, JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).json({ message: "Incorrect username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during sign-in', error: error.message });
    }
};
