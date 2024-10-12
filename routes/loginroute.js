const express= require('express');
const bcrypt=   require('bcrypt');
const router = express.Router();
const saltRounds=10;
const User= require('../models/user');

