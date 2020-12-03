const {apiCode} = require('../../omoeo-helper-adapter/api-code')

describe('Test Suite for [apiCode.getMessage]', () => {
  it('returns error 500 if there is no given param', () => {
    expect(apiCode.getMessage().status_code).toEqual(500)
  })
  it('returns error 500 with custom value', () => {
    const msg = apiCode.getMessage({custom: {hello: true}})

    expect(msg.status_code).toEqual(500)
    expect(msg.hello).toBe(true)
  })
  it('returns fields with message objects including fields', () => {
    expect(apiCode.getMessage({status_code: 300, fields: ['username']}).fields).toEqual(['username'])
  })
  it('does not return fields with message objects not including fields', () => {
    expect(apiCode.getMessage({status_code: 200, fields: ['username']}).fields).toBeFalsy()
  })
  it('returns data with message objects including data', () => {
    expect(apiCode.getMessage({status_code: 200, data: {username: 'test'}}).data).toEqual({username: 'test'})
  })
  it('does not return data with message objects not including data', () => {
    expect(apiCode.getMessage({status_code: 300, data: {username: 'test'}}).data).toBeFalsy()
  })
  it('returns accepted_value with message objects including accepted_value', () => {
    expect(apiCode.getMessage({status_code: 303, accepted_value: ['username']}).accepted_value).toEqual(['username'])
  })
  it('does not return accepted_value with message objects not including accepted_value', () => {
    expect(apiCode.getMessage({status_code: 500, accepted_value: ['username']}).accepted_value).toBeFalsy()
  })
  it('returns `format` with message objects including `format`', () => {
    expect(apiCode.getMessage({status_code: 301, format: '/[0-9]+/'}).format).toEqual('/[0-9]+/')
  })
  it('does not return `format` with message objects not including `format`', () => {
    expect(apiCode.getMessage({status_code: 500, format: '/[0-9]+/'}).format).toBeFalsy()
  })
  it('returns error_message with message objects including error_message', () => {
    expect(apiCode.getMessage({status_code: 506, error_message: 'Error at 1'}).error_message).toEqual('Error at 1')
  })
  it('does not return error_message with message objects not including error_message', () => {
    expect(apiCode.getMessage({status_code: 500, error_message: 'Error at 1'}).error_message).toBeFalsy()
  })
  it('returns name with message objects including name', () => {
    expect(apiCode.getMessage({status_code: 507, name: 'User'}).name).toEqual('User')
  })
  it('does not return name with message objects not including name', () => {
    expect(apiCode.getMessage({status_code: 500, name: 'User'}).name).toBeFalsy()
  })
  it('returns `at` with message objects including `at`', () => {
    expect(apiCode.getMessage({status_code: 510, at: 'Model'}).at).toEqual('Model')
  })
  it('does not return `at` with message objects not including `at`', () => {
    expect(apiCode.getMessage({status_code: 500, at: 'Model'}).at).toBeFalsy()
  })
})

describe('Test Suite for checking missing status_code', () => {
  it('returns message 200', () => {
    expect(apiCode.getMessage({status_code: 200}).status_code).toEqual(200)
  })
  it('returns message 201', () => {
    expect(apiCode.getMessage({status_code: 201}).status_code).toEqual(201)
  })
  it('returns message 204', () => {
    expect(apiCode.getMessage({status_code: 204}).status_code).toEqual(204)
  })
  it('returns message 300', () => {
    expect(apiCode.getMessage({status_code: 300}).status_code).toEqual(300)
  })
  it('returns message 301', () => {
    expect(apiCode.getMessage({status_code: 301}).status_code).toEqual(301)
  })
  it('returns message 302', () => {
    expect(apiCode.getMessage({status_code: 302}).status_code).toEqual(302)
  })
  it('returns message 303', () => {
    expect(apiCode.getMessage({status_code: 303}).status_code).toEqual(303)
  })
  it('returns message 401', () => {
    expect(apiCode.getMessage({status_code: 401}).status_code).toEqual(401)
  })
  it('returns message 402', () => {
    expect(apiCode.getMessage({status_code: 402}).status_code).toEqual(402)
  })
  it('returns message 403', () => {
    expect(apiCode.getMessage({status_code: 403}).status_code).toEqual(403)
  })
  it('returns message 500', () => {
    expect(apiCode.getMessage({status_code: 500}).status_code).toEqual(500)
  })
  it('returns message 501', () => {
    expect(apiCode.getMessage({status_code: 501}).status_code).toEqual(501)
  })
  it('returns message 502', () => {
    expect(apiCode.getMessage({status_code: 502}).status_code).toEqual(502)
  })
  it('returns message 503', () => {
    expect(apiCode.getMessage({status_code: 503}).status_code).toEqual(503)
  })
  it('returns message 504', () => {
    expect(apiCode.getMessage({status_code: 504}).status_code).toEqual(504)
  })
  it('returns message 505', () => {
    expect(apiCode.getMessage({status_code: 505}).status_code).toEqual(505)
  })
  it('returns message 506', () => {
    expect(apiCode.getMessage({status_code: 506}).status_code).toEqual(506)
  })
  it('returns message 507', () => {
    expect(apiCode.getMessage({status_code: 507}).status_code).toEqual(507)
  })
  it('returns message 508', () => {
    expect(apiCode.getMessage({status_code: 508}).status_code).toEqual(508)
  })
  it('returns message 509', () => {
    expect(apiCode.getMessage({status_code: 509}).status_code).toEqual(509)
  })
  it('returns message 510', () => {
    expect(apiCode.getMessage({status_code: 510}).status_code).toEqual(510)
  })
  it('returns message 406', () => {
    expect(apiCode.getMessage({status_code: 406}).status_code).toEqual(406)
  })
  it('returns message 511', () => {
    expect(apiCode.getMessage({status_code: 511}).status_code).toEqual(511)
  })
  it('returns message 512', () => {
    expect(apiCode.getMessage({status_code: 512}).status_code).toEqual(512)
  })
  it('returns message 513', () => {
    expect(apiCode.getMessage({status_code: 513}).status_code).toEqual(513)
  })
  it('returns message 514', () => {
    expect(apiCode.getMessage({status_code: 514}).status_code).toEqual(514)
  })
  it('returns message 304', () => {
    expect(apiCode.getMessage({status_code: 304}).status_code).toEqual(304)
  })
  it('returns message 305', () => {
    expect(apiCode.getMessage({status_code: 305}).status_code).toEqual(305)
  })
  it('returns message 306', () => {
    expect(apiCode.getMessage({status_code: 306}).status_code).toEqual(306)
  })
  it('returns message 307', () => {
    expect(apiCode.getMessage({status_code: 307}).status_code).toEqual(307)
  })
  it('returns message 308', () => {
    expect(apiCode.getMessage({status_code: 308}).status_code).toEqual(308)
  })
  it('returns message 309', () => {
    expect(apiCode.getMessage({status_code: 309}).status_code).toEqual(309)
  })
  it('returns message 310', () => {
    expect(apiCode.getMessage({status_code: 310}).status_code).toEqual(310)
  })
  it('returns message 311', () => {
    expect(apiCode.getMessage({status_code: 311}).status_code).toEqual(311)
  })
  it('returns message 312', () => {
    expect(apiCode.getMessage({status_code: 312}).status_code).toEqual(312)
  })
  it('returns message 515', () => {
    expect(apiCode.getMessage({status_code: 515}).status_code).toEqual(515)
  })
  it('returns message 516', () => {
    expect(apiCode.getMessage({status_code: 516}).status_code).toEqual(516)
  })
  it('returns message 517', () => {
    expect(apiCode.getMessage({status_code: 517}).status_code).toEqual(517)
  })
  it('returns message 518', () => {
    expect(apiCode.getMessage({status_code: 518}).status_code).toEqual(518)
  })
  it('returns message 519', () => {
    expect(apiCode.getMessage({status_code: 519}).status_code).toEqual(519)
  })
  it('returns message 520', () => {
    expect(apiCode.getMessage({status_code: 520}).status_code).toEqual(520)
  })
  it('returns message 521', () => {
    expect(apiCode.getMessage({status_code: 521}).status_code).toEqual(521)
  })
  it('returns message 522', () => {
    expect(apiCode.getMessage({status_code: 522}).status_code).toEqual(522)
  })
  it('returns message 523', () => {
    expect(apiCode.getMessage({status_code: 523}).status_code).toEqual(523)
  })
  it('returns message 524', () => {
    expect(apiCode.getMessage({status_code: 524}).status_code).toEqual(524)
  })
  it('returns message 525', () => {
    expect(apiCode.getMessage({status_code: 525}).status_code).toEqual(525)
  })
  it('returns message 526', () => {
    expect(apiCode.getMessage({status_code: 526}).status_code).toEqual(526)
  })
  it('returns message 527', () => {
    expect(apiCode.getMessage({status_code: 527}).status_code).toEqual(527)
  })
  it('returns message 528', () => {
    expect(apiCode.getMessage({status_code: 528}).status_code).toEqual(528)
  })
})
