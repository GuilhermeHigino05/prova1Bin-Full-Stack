const express = require('express');
const homeController = require('../controller/homeController');

const Router = express.Router();

const ctrl = new homeController();

Router.get('/', ctrl.home);

module.exports = Router