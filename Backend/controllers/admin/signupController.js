const bcrypt = require('bcrypt');
const saltRounds = 10;
const {Admin} = require('../../db'); // Adjust the path according to your models directory

exports.signup = async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await Admin.create({
            username,
            password: hashedPassword,
            email,
            phone
        });
        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
