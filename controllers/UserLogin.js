const User = require('../database/models/User');
const {setUser} = require('../services/Auth')

async function handleUserSignup(req,res) {
    const { username, email, password } = req.body;

    try {
    //   const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.query().insert({ username, email, password});
    //   const token = newUser.generateToken();
  
    //   res.cookie('token', token, { httpOnly: true });
    //   res.json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during signup.' });
    }  
}

async function loginHandler(req,res) {
    const { email, password } = req.body;

  try {
    const user = await User.query().findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }


    const token = setUser(user);
    res.cookie("uid", token)
    // const token = user.generateToken();
    // res.cookie('token', token, { httpOnly: true });
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
}

async function logoutHandler (req, res) {
    res.clearCookie('uid');
    res.json({ message: 'Logout successful' });
}

module.exports = { 
    handleUserSignup,
    loginHandler,
    logoutHandler
}