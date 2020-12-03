import axios from 'axios'
import {apiCode} from '../api-code'

const orgEndpoint = 'https://icc-api.stringee.com/v1/queue/'
const orgDeptEndpoint = 'https://icc-api.stringee.com/v1/routing-call-to-groups/'
/**
 * @namespace organizationMng
 */
export class organizationMng {
  /**
   * @param {string}apiToken
   * @param {object}[query]
   * @param {number}[query.page]
   * @param {string}[query.id]
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf organizationMng
   */
  static listOrganizations(apiToken, query) {
    return axios({
      url: orgEndpoint,
      method: 'get',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      params: query
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})

        const {totalCount, queues: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * @param {string}apiToken
   * @param {string} orgName
   * @returns {Promise<{status_code: number, description: string, data: {queueID: string}}>}
   * @memberOf organizationMng
   */
  static createOrganization(apiToken, orgName) {
    return axios({
      url: orgEndpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        "name": orgName,
        "agent_wrap_up_after_calls": false,
        "wait_agent_answer_timeout": 10
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
   * @param {string}orgId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf organizationMng
   */
  static deleteOrganization(apiToken, orgId) {
    return axios({
      url: orgEndpoint + orgId,
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
   * List detps of Organization
   * @param {string}apiToken
   * @param {string}orgId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf organizationMng
   */
  static listDepts(apiToken, orgId) {
    return axios({
      url: orgDeptEndpoint,
      method: 'get',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      params: {queue: orgId}
    })
      .then(({data: response}) => {
        if (response.r !== 0) return apiCode.getMessage({status_code: 500, custom: response})

        const {totalCount, groupRoutings: rows} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: Number(totalCount), rows}})
      })
      .catch(({data: error}) => apiCode.getMessage({status_code: 500, custom: error}))
  }

  /**
   * Add a Dept to an Organization
   * @param {string}apiToken
   * @param {object} data
   * @param {string} data.organization_id
   * @param {string} data.dept_id
   * @param {number} [data.isPrime=0]
   * @returns {Promise<{status_code: number, description: string, data: {queueID: string}}>}
   * @memberOf organizationMng
   */
  static addDept(apiToken, data) {
    return axios({
      url: orgDeptEndpoint,
      method: 'post',
      headers: {
        'X-STRINGEE-AUTH': apiToken
      },
      data: {
        "queue_id": data.organization_id,
        "group_id": data.dept_id,
        "primary_group": data.isPrime || 0
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
   * @param {string}mappingId
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf organizationMng
   */
  static removeDept(apiToken, mappingId) {
    return axios({
      url: orgDeptEndpoint + mappingId,
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