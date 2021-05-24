/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const Customer = require('../models/Customer');

// enums
const authEnums = require('../enums/authEnums');

exports.register = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (customer) {
      return res.status(400).json({
        message: authEnums.EMAIL_EXIST,
        email: req.body.email
      });
    }

    const passHash = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const newCustomer = new Customer({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      date: Date.now(),
      password: passHash,
      reportingTypeId: req.body.reportingTypeId,
      customerType: req.body.customerType
    });

    await newCustomer.save();

    return res.status(201).json({
      message: authEnums.CREATED
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  }
};

exports.login = async (req, res) => {
  try {
    let customer = await Customer.findOne({ email: req.body.email });

    customer = customer || Object({ password: '' });
    const result = await bcrypt.compare(req.body.password, customer.password);
    console.log(customer);

    if (!result) {
      return res.status(401).json({
        message: authEnums.AUTH_FAILED
      });
    }

    const expires = '1y';
    const token = jwt.sign(
      {
        email: customer.email,
        customerId: customer._id,
        type: 'customer'
      },
      process.env.JWT_KEY,
      {
        expiresIn: expires
      }
    );

    return res.status(200).json({
      message: authEnums.AUTH_SUCCESSFUL,
      token,
      expiresIn: expires,
      customerId: customer._id,
      customer
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ...err
    });
  }
};
