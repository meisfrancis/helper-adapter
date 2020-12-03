import {_array, utils} from 'omoeo-helper/utilities'
import {apiAdapter} from './'

export class infoAttachment {
  /**
   * Attach additional information to source based on criteria
   * @param {string} service Name of service to get information
   * @param {object} source Source will carry attached information
   * @param {string[]|string} infoKeys
   * If #infoKeys is an array. It includes fields needed to get information. This is present with the following format: [field_name/present_name]
   *                            For example: If `full_name` field is the field to get information, but it must be displayed as `student_name` in carry object so the the format should be 'full_name/student_name'
   *                            `present_name` is an alternative and not required.
   * A string otherwise. It is a name key for store all information.
   * @param {string} getKey Id of resource would be referred to get information
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf infoAttachment
   */
  static attach(service, source, infoKeys, getKey) {
    if (!source.data || utils.isEmpty(source.data[getKey])) return Promise.resolve(source)

    return apiAdapter(service, {'info-attach-request': true}).get(`/view/${source.data[getKey]}`)
      .then(({data: info}) => {
        if (info.data) {
          if (utils.isArray(infoKeys)) {
            for (let key of infoKeys) {
              const [primaryKey, alterKey] = key.split('/')
              let assignKey = alterKey || primaryKey

              source.data[assignKey] = info.data[primaryKey]
            }
          } else source.data[infoKeys] = info.data
        }

        return source
      })
  }

  /**
   * Attach a list of info
   * @param {string} service Name of service to get information
   * @param {object} source Source will carry attached information
   * @param {string} keySignal key name to store info list
   * @param {string} [keyRef] Id of resource would be referred to get information, this NULL will make it to `keySignal`
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf infoAttachment
   */
  static attachList(service, source, keySignal, keyRef) {
    keyRef = keyRef || keySignal

    if (!source.data || utils.isEmpty(source.data[keyRef])) return Promise.resolve(source)

    return apiAdapter(service, {'info-attach-request': true}).get('/list', {params: {id: source.data[keyRef], status: 'publish', limit: null}})
      .then(({data: result}) => {
        if (result.status_code === 200) source.data[keySignal] = result.data.rows

        return source
      })
  }

  /**
   * Return info of location
   * @param {Object} source Data source to place info
   * @param {Object} [keyMap] Key to get info
   * @param {{keyGet, keyStore}} [keyMap.city]
   * @param {{keyGet, keyStore}} [keyMap.district]
   * @returns {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf infoAttachment
   */
  static attachLocationInfo(source, keyMap= {}) {
    const {city = {keyGet: 'city_id', keyStore: 'city_name'}, district = {keyGet: 'district_id', keyStore: 'district_name'}} = keyMap
    if (!source.data || utils.isAnyEmpty(source.data[city.keyGet], source.data[district.keyGet])) return Promise.resolve(source)

    const promise = []
    const locationAdapter = apiAdapter('location', {'info-attach-request': true})

    promise.push(source.data[city.keyGet] ? locationAdapter.get(`/view/city/${source.data[city.keyGet]}`) : {})
    promise.push(source.data[district.keyGet] ? locationAdapter.get(`/view/district/${source.data[district.keyGet]}`) : {})

    return Promise.all(promise)
      .then(([{data: cityInfo}, {data: districtInfo}]) => {
        if (cityInfo.data) source.data[city.keyStore] = cityInfo.data.city_name
        if (districtInfo.data) source.data[district.keyStore] = districtInfo.data.district_name

        return source
      })
  }

  /**
   * Add media to source
   * @param {object} source
   * @param {object} [config={}]
   * @param {string} [config.key=media_id] Name of key to matching
   * @param {boolean} [config.recursive=false] `true` to make deeply matching
   * @param {string} [config.store_key=media] name of key will store info
   * Source of list has format of data as the following:
   *      {
   *        status_code: 200,
   *        data: {
   *          total: 2,
   *          rows: [{
   *            id: 1,
   *            name: 'a'
   *          }, {
   *            id: 2,
   *            name: 'b'
   *          }]
   *        }
   *      }
   *
   * @return {Promise<any>|Promise<{data: any} | [AxiosResponse<any>, any, any, any, any, any, any, any, any, any]>}
   * @memberOf infoAttachment
   */
  static attachMediaInfo(source, config = {}) {
    if (!source.data) return Promise.resolve(source)

    // Pluck data
    const mediaIdArray = this._pluckMediaId(source, config)

    if (!mediaIdArray.length) return Promise.resolve(source)
    // Get a chunk of media
    return apiAdapter('media', {'info-attach-request': true}).get('/list', {params: {id: mediaIdArray, status: 'publish', limit: null}})
      .then(({data: mediasInfo}) => {
        if (mediasInfo.status_code === 200) this._injectMedia(source, mediasInfo.data.rows, config)

        return source
      })
  }

  /**
   * Get array of id of media
   * @param {object} source
   * @param {object} [config]
   * @param {string} [config.key=media_id] Name of key to matching
   * @param {boolean} [config.recursive=false] `true` to make deeply matching
   * @return {number[]}
   * @private
   * @memberOf infoAttachment
   */
  static _pluckMediaId(source, config) {
    const {key = 'media_id', recursive = false} = config
    let dataArray = source.data.rows ? source.data.rows : utils._toArray(source.data)
    let mediaIdArray = []

    if (recursive) {
      const recursiveExtract = (_source) => {
        // Loop each item in array
        if (utils.isArray(_source)) {
          for (let item of _source) {
            // Extract nested array
            if (utils.isArray(item)) recursiveExtract(item)
            // Extract nested object
            if (utils.isObject(item)) recursiveExtract(item)
          }
        }

        // Loop value per key in object
        if (utils.isObject(_source)) {
          for (let [, item] of Object.entries(_source)) {
            // Extract nested array
            if (utils.isArray(item)) recursiveExtract(item)
            // Extract nested object
            if (utils.isObject(item)) recursiveExtract(item)
          }
        }

        if (_source[key] !== undefined) {
          // If info key is an array, flatten all items to the keeper (in this case is `mediaIdArray`)
          if (utils.isArray(_source[key])) mediaIdArray = mediaIdArray.concat(_source[key])
          // Just push otherwise
          else mediaIdArray.push(_source[key])
        }
      }

      recursiveExtract(source)
    } else {
      for (let i of dataArray) {
        if (utils.isArray(i[key])) mediaIdArray = mediaIdArray.concat(i[key])
        else mediaIdArray.push(i[key])
      }
    }

    // Remove falsy and duplicate items
    return _array.clean(mediaIdArray, true)
  }

  /**
   * Make a matching to inject media info to source
   * @param {object<{data: object | {total: number, rows: object[]}}>} source
   * @param {object[]} mediaArray
   * @param {object} [config]
   * @param {string} [config.key=media_id] Name of key to matching
   * @param {boolean} [config.recursive=false] `true` to make deeply matching
   * @param {string} [config.store_key=media] name of key will store info
   * @memberOf infoAttachment
   * @private
   */
  static _injectMedia(source, mediaArray, config) {
    const {key = 'media_id', recursive = false, store_key = 'media'} = config

    if (recursive) {
      const recursiveInject = (_source) => {
        const sourceId = utils._clone(_source[key])
        // Loop item in array
        if (utils.isArray(_source)) {
          for (let item of _source) {
            // Inject nested array
            if (utils.isArray(item)) recursiveInject(item)
            // Inject nested object
            if (utils.isObject(item)) recursiveInject(item)
          }
        }

        // Loop value per key in object
        if (utils.isObject(_source)) {
          for (let [, item] of Object.entries(_source)) {
            // Inject nested array
            if (utils.isArray(item)) recursiveInject(item)
            // Inject nested object
            if (utils.isObject(item)) recursiveInject(item)
          }
        }

        // Force initializing array to store media object
        _source[store_key] = []

        for (let media of mediaArray) {
          // If info key is an array, loop to fill the store key
          if (utils.isArray(sourceId)) {
            sourceId.forEach(sid => {
              if (media.id === Number(sid)) {
                // Then fill
                _source[store_key].push(media)
                // Then out the loop
                return false
              }
            })
          }
          // Otherwise, just push
          else if (media.id === Number(sourceId)) {
            _source[store_key].push(media)
            return false
          }
        }

        if (!_source[store_key].length) delete _source[store_key]
      }

      recursiveInject(source.data)
    } else {
      // Pluck data
      const dataArray = source.data.rows ? source.data.rows : utils._toArray(source.data)
      // Inject media
      for (let sourceItem of dataArray) {
        const sourceId = utils._clone(sourceItem[key])
        // Force initializing array to store media object
        sourceItem[store_key] = []
        // Loop to inject media to correct source
        for (let media of mediaArray) {
          // If info key is an array, loop to fill the store key
          if (utils.isArray(sourceId)) {
            sourceId.forEach(sid => {
              if (media.id === Number(sid)) {
                // Then fill
                sourceItem[store_key].push(media)
                // Then out the loop
                return false
              }
            })
          }
          // Otherwise, just push
          else if (media.id === Number(sourceId)) {
            sourceItem[store_key].push(media)
            break
          }
        }

        if (!sourceItem[store_key].length) delete sourceItem[store_key]
      }
      const data = (dataArray.length > 1 || source.data.rows) ? dataArray : dataArray[0]
      source.data = source.data.rows ? {total: source.data.total, rows: data} : data
    }
  }
}