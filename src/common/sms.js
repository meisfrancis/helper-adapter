import axios from 'axios'
import {_string, apiCode} from 'omoeo-helper/utilities'
import {validator} from 'omoeo-helper/validation'

/**
 * @namespace smsCenter
 */
export class smsCenter {
  static endpoint = process.env.FPT_SMS_END_POINT
  static clientId = process.env.FPT_SMS_CLIENT_ID
  static secretKey = process.env.FPT_SMS_SECRET_KEY

  /**
   * Return token to send Brandname SMS
   * @returns {Promise<{status_code: number, description: string, data: object, error_message: string}>}
   * @memberOf smsCenter
   */
  static getAdsToken() {
    const sessionId = _string.hashString(Date.now())

    return axios({
      method: 'POST',
      url: this.endpoint + 'oauth2/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.secretKey,
        scope: 'send_brandname',
        session_id: sessionId
      }
    })
      .then(({data: response}) => apiCode.getMessage({status_code: 200, data: {...response, session_id: sessionId}}))
      .catch(e => apiCode.getMessage({status_code: 500, custom: e.response.data}))
  }

  /**
   * Create campaign to send message
   * @param {object}data
   * @returns {Promise<unknown>|Promise<{status_code: number, description: string, data: Object, error_message: string}>}
   * @memberOf smsCenter
   */
  static createCampaign(data) {
    const {error, value} = validator.validateAdapter(data, joi => ({
      campaign_name: joi.string().required(),
      brand_name: joi.string().required(),
      message: joi.string().required(),
      schedule_time: joi.string().required(),
      quota: joi.string().required()
    }))

    if (error) return Promise.resolve(error)

    return this.getAdsToken()
      .then(token => {
        if (token.status_code !== 200) return token

        const {access_token, session_id} = token.data

        return axios({
          url: this.endpoint + 'api/create-campaign',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            CampaignName: value.campaign_name,
            BrandName: value.brand_name,
            Message: value.message,
            ScheduleTime: value.schedule_time,
            Quota: value.quota,
            access_token, session_id
          }
        })
          .then(({data: response}) => apiCode.getMessage({status_code: 200, data: response}))
          .catch(e => apiCode.getMessage({status_code: 500, custom: e.response.data}))
      })
  }

  /**
   * Send Brandname SMS
   * @param {object}data
   * @returns {Promise<unknown>|Promise<{status_code: number, description: string, data: Object, error_message: string}>}
   * @memberOf smsCenter
   */
  static sendBrandNameSms(data) {
    const {error, value} = validator.validateAdapter(data, joi => ({
      campaign_code: joi.string().required(),
      phone_list: joi.array().items(joi.string().required()).required()
    }))

    if (error) return Promise.resolve(error)

    return this.getAdsToken()
      .then(token => {
        if (token.status_code !== 200) return token

        const {access_token, session_id} = token.data

        return axios({
          url: this.endpoint + 'api/push-brandname-ads',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            CampaignCode: value.campaign_code,
            PhoneList: value.phone_list.join(','),
            access_token, session_id
          }
        })
          .then(({data: response}) => apiCode.getMessage({status_code: 200, data: response}))
          .catch(e => apiCode.getMessage({status_code: 500, custom: e.response.data}))
      })
  }
}