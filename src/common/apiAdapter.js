import axios from 'axios'

const userServiceUrl = process.env.USER_SERVICE_URL
const blogServiceUrl = process.env.BLOG_SERVICE_URL
const mediaServiceUrl = process.env.MEDIA_SERVICE_URL
const labServiceUrl = process.env.LAB_SERVICE_URL
const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL
const settingServiceUrl = process.env.SETTING_SERVICE_URL
const centerServiceUrl = process.env.CENTER_SERVICE_URL
const productServiceUrl = process.env.PRODUCT_SERVICE_URL
const campaignServiceUrl = process.env.CAMPAIGN_SERVICE_URL
const servicesEndpoint = {
  option: settingServiceUrl + 'option/',
  stringee: settingServiceUrl + 'call-center/',
  callLog: settingServiceUrl + 'call-log/',
  class: centerServiceUrl + 'class/',
  center: centerServiceUrl + 'center/',
  user: userServiceUrl + 'users/',
  token: userServiceUrl + 'token/',
  location: userServiceUrl + 'location/',
  firebase: userServiceUrl + 'firebase/',
  acl: userServiceUrl + 'acl/',
  ticket: userServiceUrl + 'ticket/',
  organization: userServiceUrl + 'organization/',
  post: blogServiceUrl + 'post/',
  gift: campaignServiceUrl + 'gift/',
  campaignUser: userServiceUrl + 'campaign-user/',
  campaign: campaignServiceUrl + 'campaign/',
  media: mediaServiceUrl,
  lab: labServiceUrl + 'lab/',
  level: labServiceUrl + 'level/',
  unit: labServiceUrl + 'unit/',
  question: labServiceUrl + 'question/',
  answer: labServiceUrl + 'answer/',
  product: productServiceUrl + 'product/',
  warehouse: productServiceUrl + 'warehouse/',
  log: productServiceUrl + 'log/',
  'product-term': productServiceUrl + 'term/',
  coupon: paymentServiceUrl + 'coupon/',
  order: paymentServiceUrl + 'order/',
  surcharge: paymentServiceUrl + 'surcharge/',
  receipt: paymentServiceUrl + 'receipt/'
}

export const apiAdapter = (service_name, initHeaders = null) => {
  const cfg = {baseURL: servicesEndpoint[service_name]}
  let axiosInstance

  if (initHeaders) cfg.headers = initHeaders

  axiosInstance = axios.create(cfg)

  axiosInstance.initOrganization = (organization) => {
    axiosInstance.defaults.headers.common['omoeo-org'] = encodeURI(JSON.stringify(organization))
    return axiosInstance
  }
  return axiosInstance
}