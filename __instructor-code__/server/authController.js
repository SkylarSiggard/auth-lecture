const bcrypt = require('bcryptjs')
module.exports = {
  register: async (req, res) => {
    /*
    TODO 1. Check to see if the email already exists in the database
      TODO a. if so, send the proper response
    TODO 2. Salt and hash the password, and create new user in the db (including the hash and cust tables)
    TODO 3. Put the new user on session
    TODO 4. Send back the user information
    */
    const db = req.app.get('db')
    const { email, password } = req.body

    // ! Check if email is already in use
    const userEmail = await db.find_email({email})
    if (userEmail[0]) return res.status(200).send({message: 'Email already in use'})

    // ! Salt and hash the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // ! Add user and hash to the database
    const newUser = await db.add_cust({email})
    console.log(newUser)
    await db.add_hash({hash, custId: newUser[0].cust_id})

    // ! Put user on session
    req.session.user = {id: newUser[0].cust_id, email}

    // ! Send back user info
    res.status(200).send({message: 'Logged in!', userData: req.session.user})
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { email, password } = req.body
    // ! Check if the email has an account
    const user = await db.find_hash(email)

    // ! If the email isn't in the database, send appropriate response
    if (!user[0]) return res.status(200).send({message: 'Email not found'})

    // ! If the email is found, we will compare the hashes
    const result = bcrypt.compareSync(password, user[0].hash_value)
    if (result === true) {
      // ! Save the user on session
      req.session.user = {id: user[0].cust_id, email: user[0].email}
      // ! Send the user on session back
      return res.status(200).send({message: 'Logged in!', userData: req.session.user})
    } else {
      return res.status(200).send({message: 'Incorrect Password'})
    }
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'Logged out', userData: req.session})
  }
}