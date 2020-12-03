import axios from 'axios'
import {apiCode} from '../api-code'

export class ghn {
  static getToken() {
    return process.env.GHN_API_TOKEN
  }

  static getEndpoint() {
    return process.env.GHN_ENDPOINT
  }

  static getClientId() {
    return Number(process.env.GHN_CLIENT_ID)
  }

  /**
   * @param {number} districtId
   * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: Ward[]}}>}
   * @memberOf ghn
   * @typedef {object} Ward {@link https://api.ghn.vn/home/docs/detail?id=40}
   */
  static getWards(districtId) {
    return axios({
      url: this.getEndpoint() + 'GetWards',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        DistrictID: districtId
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        const {Wards: wards} = response.data

        return apiCode.getMessage({status_code: 200, data: {total: wards.length, rows: wards}})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: District[]}}>}
   * @memberOf ghn
   * @typedef {object} District {@link https://api.ghn.vn/home/docs/detail?id=26}
   */
  static getDistricts() {
    return axios({
      url: this.getEndpoint() + 'GetDistricts',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken()
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        const districts = response.data

        return apiCode.getMessage({status_code: 200, data: {total: districts.length, rows: districts}})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {object} cfg
   * @param {number} cfg.fromDistId
   * @param {number} cfg.toDistId
   * @param {number} [cfg.weight] weight in gram
   * @param {number} [cfg.height] height in cm
   * @param {number} [cfg.length] length in cm
   * @param {number} [cfg.width] width in cm
   * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: AvailableService[]}}>}
   * @memberOf ghn
   * @typedef {object} AvailableService {@link https://api.ghn.vn/home/docs/detail?id=27}
   */
  static getAvailableServices(cfg) {
    const parsedCfg = {}
    const {fromDistId, toDistId} = cfg

    if (cfg.weight) parsedCfg.Weight = cfg.weight
    if (cfg.height) parsedCfg.Height = cfg.height
    if (cfg.length) parsedCfg.Length = cfg.length
    if (cfg.width) parsedCfg.Width = cfg.width

    return axios({
      url: this.getEndpoint() + 'FindAvailableServices',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        FromDistrictID: fromDistId,
        ToDistrictID: toDistId,
        ...parsedCfg
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        const availServices = response.data

        return apiCode.getMessage({status_code: 200, data: {total: availServices.length, rows: availServices}})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {object}    cfg
   * @param {number}    cfg.fromDistrictId
   * @param {number}    cfg.toDistrictId
   * @param {number}    cfg.serviceId
   * @param {number}    cfg.weight Weight (gram).
   * @param {number}    [cfg.length]                 Length (cm).
   * @param {number}    [cfg.width]                  Width (cm).
   * @param {number}    [cfg.height]                 Height (cm).
   * @param {number[]}  [cfg.extraServices] Include  Extra Service ID list.
   * @param {string}    [cfg.couponCode]             Coupon Code for discount.
   * @param {number}    [cfg.insuranceFee=0]         Declare package value. GHN will base on this value for compensation if any unexpected things happen (lost, broken...) Max is 10.000.000
   * @returns {Promise<{status_code: number, description: string, data: Fee}>}
   * @memberOf ghn
   * @typedef {object} Fee {@link https://api.ghn.vn/home/docs/detail?id=2}
   */
  static getFee(cfg) {
    const parsedCfg = {}
    const {fromDistId, toDistId, serviceId, weight} = cfg

    if (cfg.length) parsedCfg.Length = cfg.length
    if (cfg.height) parsedCfg.Height = cfg.height
    if (cfg.width) parsedCfg.Width = cfg.width
    if (cfg.extraServices && cfg.extraServices.length) parsedCfg.OrderCosts = cfg.extraServices.map(i => ({ServiceID: i}))
    if (cfg.couponCode) parsedCfg.CouponCode = cfg.couponCode
    if (cfg.insuranceFee) parsedCfg.InsuranceFee = cfg.insuranceFee

    return axios({
      url: this.getEndpoint() + 'CalculateFee',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        FromDistrictID: fromDistId,
        ToDistrictID: toDistId,
        ServiceID: serviceId,
        Weight: weight,
        ...parsedCfg
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        return apiCode.getMessage({status_code: 200, data: response.data})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {object}  cfg
   * @param {int}     cfg.fromTime	                    From time you want to get callback logs (timestamp).
   * @param {int}     cfg.toTime	                      To time you want to get callback logs (timestamp).
   * @param {int}     cfg.customerID	        ID you want to get callback logs. This is the same value as ClientID.
   * @param {int}     [cfg.shippingOrderID]	  Shipping order ID you want to get callback logs.
   * @param {string}  [cfg.orderCode]	        Order Code you want to get callback logs.
   * @param {string}  [cfg.currentStatus]	    Order status which you want to get callback logs.
   * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: Log[]}}>}
   * @memberOf ghn
   * @typedef {object} Log {@link https://api.ghn.vn/home/docs/detail?id=42}
   */
  static getOrderLogs(cfg) {
    const {fromTime, toTime, customerID} = cfg
    const condition = {CustomerID: customerID}

    if (cfg.shippingOrderID) condition.ShippingOrderID = cfg.shippingOrderID
    if (cfg.orderCode) condition.OrderCode = cfg.orderCode
    if (cfg.currentStatus) condition.CurrentStatus = cfg.currentStatus

    return axios({
      url: this.getEndpoint() + 'GetOrderLogs',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        FromTime: fromTime,
        ToTime: toTime,
        Conditions: condition,
        Skip: 0
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        const {Logs: rows, Total: total} = response.data

        return apiCode.getMessage({status_code: 200, data: {total, rows}})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {string} orderCode
   * @returns {Promise<{status_code: number, description: string, data: OrderInfo}>}
   * @memberOf ghn
   * @typedef {object} OrderInfo {@link https://api.ghn.vn/home/docs/detail?id=29}
   */
  static getOrderInfo(orderCode) {
    return axios({
      url: this.getEndpoint() + 'OrderInfo',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        OrderCode: orderCode
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        return apiCode.getMessage({status_code: 200, data: response.data})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {string} orderCode
   * @returns {Promise<{status_code: number, description: string, data: CancelOrder}>}
   * @memberOf ghn
   * @typedef {object} CancelOrder {@link https://api.ghn.vn/home/docs/detail?id=32}
   */
  static cancelOrder(orderCode) {
    return axios({
      url: this.getEndpoint() + 'CancelOrder',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        OrderCode: orderCode
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        return apiCode.getMessage({status_code: 200, data: response.data})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }

  /**
   * @param {object}  cfg
   * @param {int}     [cfg.paymentTypeId=2]         Choose who pay shipping fee.
   *                                                1: Shop/Seller.
   *                                                2: Buyer/Consignee.
   * @param {int}     cfg.fromDistrictId	          District ID pick up parcels. Use API GetDistricts or look up from District List.
   * @param {string}  cfg.fromWardCode	            Ward Code pick up parcels. Use API GetWards.
   * @param {int}     cfg.toDistrictId	            District ID drop off parcels. Use API GetDistricts or look up from District List.
   * @param {string}  cfg.toWardCode	              Ward Code drop off parcels. Use API GetWards.
   * @param {string}  cfg.clientContactName	        Client name. (Shop / Seller)
   * @param {string}  cfg.clientContactPhone	      Client phone number. (Shop / Seller)
   * @param {string}  cfg.clientAddress	            Client address. (Shop / Seller)
   * @param {string}  cfg.customerName	            Customer name. (Buyer / Consignee)
   * @param {string}  cfg.customerPhone	            Customer phone number. (Buyer / Consignee)
   * @param {string}  cfg.shippingAddress	          Customer address. (Buyer / Consignee)
   * @param {string}  cfg.noteCode	                Note shipping order. Allowed values: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
   * @param {int}     cfg.serviceId	                Shipping service ID (Express, Standard or Saving). Use API FindAvailableServices or look up from Service List.
   * @param {int}     cfg.weight	                  Weight (gram).
   * @param {int}     cfg.length	                  Length (cm).
   * @param {int}     cfg.width	                    Width (cm).
   * @param {int}     cfg.height	                  Height (cm).
   * @param {int}     [cfg.insuranceFee=0]	        Use to declare parcel value. GHN will base on this value for compensation if any unexpected things happen (lost, broken...). Maximum 10.000.000
   * @param {int[]}   [cfg.extraServices]           Extra Service ID to use
   * @param {int}     [cfg.codAmount=0]	            Amount cash to collect. Maximum 50.000.000
   * @param {string}  [cfg.note]	                  Client note for shipper. Ex: Please call before delivery
   * @param {string}  [cfg.returnContactName]	      Contact name to return parcels
   * @param {string}  [cfg.returnContactPhone]	    Contact phone number to return parcels
   * @param {string}  [cfg.returnAddress]	          Address return parcels
   * @param {int}     [cfg.returnDistrictId]	      District ID return parcels
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf ghn
   */
  static createOrder(cfg) {
    const params = {
      PaymentTypeID: 2,
      FromDistrictID: cfg.fromDistrictId,
      FromWardCode: cfg.fromWardCode,
      ToDistrictID: cfg.toDistrictId,
      ToWardCode: cfg.toWardCode,
      ClientContactName: cfg.clientContactName,
      ClientContactPhone: cfg.clientContactPhone,
      ClientAddress: cfg.clientAddress,
      CustomerName: cfg.customerName,
      CustomerPhone: cfg.customerPhone,
      ShippingAddress: cfg.shippingAddress,
      NoteCode: cfg.noteCode,
      ServiceID: cfg.serviceId,
      Weight: cfg.weight,
      Length: cfg.length,
      Width: cfg.width,
      Height: cfg.height,
      InsuranceFee: cfg.insuranceFee || 0,
      CoDAmount: cfg.codAmount || 0,
      Note: cfg.note,
      ReturnContactName: cfg.returnContactName,
      ReturnContactPhone: cfg.returnContactPhone,
      ReturnAddress: cfg.returnAddress,
      ReturnDistrictId: cfg.returnDistrictId,
      ExternalReturnCode: cfg.returnContactName + cfg.returnContactPhone + cfg.returnAddress,
      AffiliateID: this.getClientId()
    }

    if (cfg.extraServices && cfg.extraServices.length) params.ShippingOrderCosts = cfg.extraServices.map(i => ({ServiceID: i}))

    return axios({
      url: this.getEndpoint() + 'CreateOrder',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token: this.getToken(),
        ...params
      }
    })
      .then(({data: response}) => {
        if (response.code === 0) return apiCode.getMessage({status_code: 500, error_message: response})

        return apiCode.getMessage({status_code: 200, data: response.data})
      })
      .catch(({response}) => apiCode.getMessage({status_code: 500, custom: response.data}))
  }
}