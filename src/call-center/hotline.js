import axios from 'axios'
import {apiCode} from '../api-code'

const endpoint = 'https://icc-api.stringee.com/v1/number/'
/**
 * @namespace hotlineMng
 */
export class hotlineMng {
  /**
   * @param {string}apiToken
   * @param {object}[query]
   * @param {number}[query.page]
   * @param {string}[query.id]
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf hotlineMng
   */
  static listHotlines(apiToken, query) {
    return axios({
      url: endpoint,
      method: 'get',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      params: query
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})

        const {totalCount, numbers: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {object} data
   * @param {string} data.stringee_number
   * @param {string} data.nickname
   * @returns {Promise<{status_code: number, description: string, data: {numberID: string}}>}
   * @memberOf hotlineMng
   */
  static createHotline(apiToken, data) {
    return axios({
      url: endpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        "number": data.stringee_number,
        "nickname": data.nickname,
        "allow_outbound_calls": true,
        "enable_ivr": false
      }
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})
        return apiCode.getMessage({status_code: 200, data: response})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {string} hotlineId
   * @param {object} updateData
   * @param {string} updateData.stringee_number
   * @param {string} updateData.nickname
   * @param {string} updateData.organization_id
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf hotlineMng
   */
  static updateHotline(apiToken, hotlineId, updateData) {
    const data = {}

    if (updateData.stringee_number !== undefined) data.number = updateData.stringee_number
    if (updateData.nickname !== undefined) data.nickname = updateData.nickname
    if (updateData.organization_id !== undefined) data.queue_id = updateData.organization_id

    return axios({
      url: endpoint + hotlineId,
      method: 'put',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})
        return apiCode.getMessage({status_code: 200, data: response})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {string}hotlineId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf hotlineMng
   */
  static deleteHotline(apiToken, hotlineId) {
    return axios({
      url: endpoint + hotlineId,
      method: 'delete',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      }
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})
        return apiCode.getMessage({status_code: 200, data: response})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }
}