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
})

module.exports = Race

/**
 * instanceMethods
 */
Race.prototype.isCompleted = function () {
  const now = moment();
  const dateBreakdown = this.date.split('-');
  const startBreakdown = this.start.split(':').map(x => Number(x));
  const finishBreakdown = this.completionTime.split(':').map(x => Number(x));
  const hour = startBreakdown[0]+ (finishBreakdown[0]);
  const min = (startBreakdown[1]) + (finishBreakdown[1]);
  const raceOver = moment({ y: dateBreakdown[0], M : dateBreakdown[1]-1, d : dateBreakdown[2], h : hour, m :min, s: finishBreakdown[2]});
  console.log('race over:', raceOver, 'now:', now)
  return now > raceOver
}