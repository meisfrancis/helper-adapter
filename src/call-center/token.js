import jwt from 'jsonwebtoken'

export class tokenMng {
  /**
   * Return token for server API
   * @param {string} stringee_sid
   * @param {string} secret_key
   * @returns {string}
   * @memberOf tokenMng
   */
  static getApiToken(stringee_sid, secret_key) {
    const payload = {
      'jti': stringee_sid + '-' + Date.now(),
      'iss': stringee_sid,
      'rest_api': true
    }

    return jwt.sign(payload, secret_key, {
      expiresIn: '30d',
      header: {
        'cty': 'call-center-api;v=1',
        'typ': 'JWT',
        'alg': 'HS256'
      }
    })
  }

  /**
   * @param {string} agentId
   * @param {string} stringee_sid
   * @param {string} secret_key
   * @returns {string}
   * @memberOf tokenMng
   */
  static getWebPhoneToken(agentId, stringee_sid, secret_key) {
    const payload = {
      'jti': stringee_sid + '-' + Date.now(),
      'iss': stringee_sid,
      'userId': agentId,
      'icc_api': true
    }

    return jwt.sign(payload, secret_key, {
      expiresIn: '30d',
      header: {
        'cty': 'call-center-api;v=1',
        'typ': 'JWT',
        'alg': 'HS256'
      }
    })
  }
}