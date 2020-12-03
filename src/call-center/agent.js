import axios from 'axios'
import {apiCode} from '../api-code'

const endpoint = 'https://icc-api.stringee.com/v1/agent/'
/**
 * @namespace agentMng
 */
export class agentMng {
  /**
   * @param {string}apiToken
   * @param {object}[query]
   * @param {number}[query.page]
   * @param {string}[query.id]
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf agentMng
   */
  static listAgents(apiToken, query) {
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

        const {totalCount, agents: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {object} data
   * @param {string} data.agent_name
   * @param {string} data.stringee_id
   * @returns {Promise<{status_code: number, description: string, data: {agentID: string}}>}
   * @memberOf agentMng
   */
  static createAgent(apiToken, data) {
    return axios({
      url: endpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        "name": data.agent_name,
        "stringee_user_id": data.stringee_id,
        "manual_status": "AVAILABLE",
        "routing_type": 1
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
   * @param {string} agentId
   * @param {object} updateData
   * @param {string} updateData.agent_name
   * @param {string} updateData.stringee_id
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf agentMng
   */
  static updateAgent(apiToken, agentId, updateData) {
    const data = {}

    if (updateData.agent_name !== undefined) data.name = updateData.agent_name
    if (updateData.stringee_id !== undefined) data.stringee_user_id = updateData.stringee_id

    return axios({
      url: endpoint + agentId,
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
   * @param {string}agentId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf agentMng
   */
  static deleteAgent(apiToken, agentId) {
    return axios({
      url: endpoint + agentId,
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