import axios from 'axios'
import {apiCode} from '../api-code'

const deptEndpoint = 'https://icc-api.stringee.com/v1/group/'
const deptAgentEndpoint = 'https://icc-api.stringee.com/v1/manage-agents-in-group/'
/**
 * @namespace deptMng
 */
export class deptMng {
  /**
   * @param {string}apiToken
   * @param {object}[query]
   * @param {number}[query.page]
   * @param {string}[query.id]
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static listDepts(apiToken, query) {
    return axios({
      url: deptEndpoint,
      method: 'get',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      params: query
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})

        const {totalCount, groups: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {string} deptName
   * @returns {Promise<{status_code: number, description: string, data: {groupID: string}}>}
   * @memberOf deptMng
   */
  static createDept(apiToken, deptName) {
    return axios({
      url: deptEndpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        "name": deptName
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
   * @param {string}deptId
   * @param {string}deptName
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static updateDept(apiToken, deptId, deptName) {
    return axios({
      url: deptEndpoint + deptId,
      method: 'put',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {name: deptName}
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})
        return apiCode.getMessage({status_code: 200, data: response})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {string}deptId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static deleteDept(apiToken, deptId) {
    return axios({
      url: deptEndpoint + deptId,
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

  /**
   * List agent of a department
   * @param {string} apiToken
   * @param {string} deptId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static listAgents(apiToken, deptId) {
    return axios({
      url: deptAgentEndpoint,
      method: 'get',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      params: {group: deptId}
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})

        const {totalCount, groupAgents: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * Add an agent to a department
   * @param {string}apiToken
   * @param {object}data
   * @param {string}data.agent_id
   * @param {string}data.dept_id
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static addAgent(apiToken, data) {
    return axios({
      url: deptAgentEndpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        agent_id: data.agent_id,
        group_id: data.dept_id
      }
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})
        return apiCode.getMessage({status_code: 200, data: response})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * Remove an agent from a department
   * @param {string}apiToken
   * @param {object}data
   * @param {string}data.agent_id
   * @param {string}data.dept_id
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf deptMng
   */
  static removeAgent(apiToken, data) {
    return axios({
      url: deptAgentEndpoint,
      method: 'delete',
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
}