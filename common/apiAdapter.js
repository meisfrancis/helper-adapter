"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiAdapter = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userServiceUrl = process.env.USER_SERVICE_URL;
var blogServiceUrl = process.env.BLOG_SERVICE_URL;
var mediaServiceUrl = process.env.MEDIA_SERVICE_URL;
var labServiceUrl = process.env.LAB_SERVICE_URL;
var paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;
var settingServiceUrl = process.env.SETTING_SERVICE_URL;
var centerServiceUrl = process.env.CENTER_SERVICE_URL;
var productServiceUrl = process.env.PRODUCT_SERVICE_URL;
var campaignServiceUrl = process.env.CAMPAIGN_SERVICE_URL;
var servicesEndpoint = {
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
};

var apiAdapter = function apiAdapter(service_name) {
  var initHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var cfg = {
    baseURL: servicesEndpoint[service_name]
  };
  var axiosInstance;
  if (initHeaders) cfg.headers = initHeaders;
  axiosInstance = _axios.default.create(cfg);

  axiosInstance.initOrganization = function (organization) {
    axiosInstance.defaults.headers.common['omoeo-org'] = encodeURI(JSON.stringify(organization));
    return axiosInstance;
  };

  return axiosInstance;
};

exports.apiAdapter = apiAdapter;