const { Model } = require('objection');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  generateToken() {
    return jwt.sign({ id: this.id }, config.jwtSecret, {
      expiresIn: '12h',
    });
  }
}

module.exports = User;
