import redis from 'redis'
import {_string} from 'omoeo-helper/utilities'

const expire = 24 * 3600

class redisCache {

  constructor() {
    this.client = redis.createClient({
      host: 'localhost',
      port: '6379',
      prefix: process.env.CACHE_PREFIX
    })
  }

  add(key, value, groupKey = null) {
    this.client.setex(key, expire, JSON.stringify(value))
    if (groupKey) {
      this.groupCache(groupKey, key)
    }
  }

  get(key) {
    return new Promise((fulfill, reject) => {
      this.client.get(key, (err, obj) => {
        if (err) reject(err)
        else {
          fulfill(JSON.parse(obj))
        }
      })
    }).catch(() => null)
  }

  delete(key) {
    this.client.del(key)
  }

  clearCache() {
    this.client.flushall()
  }

  generateKey(key, params) {
    return _string.hashString(key + JSON.stringify(params))
  }

  groupCache(tagKey, value) {
    this.client.sadd(tagKey, value)
  }

  deleteGroupCache(tagKey) {
    this.client.smembers(tagKey, (err, obj) => {
        if (obj) {
          for (let item of obj) {
            this.delete(item)
          }
          this.delete(tagKey)
        }
    })
  }
}

const groupKey = {
  resource: 'resource',
  privilege: 'privilege',
  role: 'role',
  class: 'class',
  media: 'media',
  user: 'user',
  location: 'location',
  campaign: 'campaign',
  campaignUser: 'campaignUser',
  question: 'question',
  center: 'center',
  answer: 'answer',
  lab: 'lab',
  level: 'level',
  term: 'term',
  unit: 'unit',
  coupon: 'coupon',
  account: 'account',
  warehouse: 'warehouse',
  option: 'option',
  subscriber: 'subscriber',
  package: 'package',
  order: 'order',
  ticket: 'ticket',
  stringee: 'stringee',
  product: 'product',
  productTerm: 'productTerm',
  statistic: 'statistic',
  gift: 'gift',
  organization: 'organization',
  surcharge: 'surcharge',
  receipt: 'receipt'
}

export const adapterCache = (service = 'redis', prefix) => {
  let adapter

  if (service === 'redis') adapter = new redisCache(prefix)

  return Object.assign(adapter, {groupKey})
}