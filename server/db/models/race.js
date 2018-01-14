const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Race = db.define('race', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  start: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  coords: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  completionTime: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    finishTime() {
      const start = this.date + 'T' + this.start
      const runTime = this.completionTime.split(':')
      return moment(start).add({hours: runTime[0], minutes: runTime[1], seconds: runTime[2]})
    }
  }
})

module.exports = Race

/**
 * instanceMethods
 */
Race.prototype.isCompleted = function () {
  const now = moment();
  return moment(this.finishTime).isBefore(now)
}