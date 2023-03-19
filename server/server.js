
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import  express from "express"

import cors from 'cors'

import mongoose from "mongoose"

import bcrypt from 'bcrypt'

import User from './model.js';




const app = express()
app.use(express.json())
app.use(cors())




mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
  console.log('connected to mongoose!!')
})


/*app.get('/users', async(req, res)=>{
  const users = await User.find().lean()
  res.send(users)
})*/


app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ name: req.body.name, password: hashedPassword, data:req.body.data })
    await user.save()
    res.status(201).send('success!')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('error')
  }
})


app.post('/users/login', async(req,res)=>{
  try{
    const user = await User.findOne({ name: req.body.name });
    if(!user){
      return res.status(400).send('can not find user')
    }
    if (await bcrypt.compare(req.body.password, user.password)) {

      const token = jwt.sign({ user: user }, process.env.JWT_SECRET )
  
      res.status(202).json({ token });

    } else {
      res.send('Failure');
    }
  }catch{
    res.status(500).send()
  }
})

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findOne({ name: req.name }).lean();
    console.log(users)
    res.send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting users')
  }
})


app.put('/users/data', authenticateToken, async (req, res) => {
  try {
    const userName = req.name
    const newData = req.body.data
    const updatedUser = await User.findOneAndUpdate({ name: userName }, { data: newData }, { new: true })
    if (!updatedUser) {
      return res.status(404).send('User not found')
    }
    res.status(200).json(updatedUser.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error updating user data')
  }
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403)
    req.name = payload.user.name
    next()
  })
}






app.listen(3000)