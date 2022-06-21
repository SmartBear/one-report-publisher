var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true })
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports
    )
  }
var __reExport = (target, module2, copyDefault, desc) => {
  if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== 'default'))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  )
}

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  'node_modules/@actions/core/lib/utils.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.toCommandProperties = exports.toCommandValue = void 0
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return ''
      } else if (typeof input === 'string' || input instanceof String) {
        return input
      }
      return JSON.stringify(input)
    }
    exports.toCommandValue = toCommandValue
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {}
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn,
      }
    }
    exports.toCommandProperties = toCommandProperties
  },
})

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  'node_modules/@actions/core/lib/command.js'(exports) {
    'use strict'
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k]
              },
            })
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            o[k2] = m[k]
          })
    var __setModuleDefault =
      (exports && exports.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v })
          }
        : function (o, v) {
            o['default'] = v
          })
    var __importStar =
      (exports && exports.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null) {
          for (var k in mod)
            if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k)
        }
        __setModuleDefault(result, mod)
        return result
      }
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.issue = exports.issueCommand = void 0
    var os3 = __importStar(require('os'))
    var utils_1 = require_utils()
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message)
      process.stdout.write(cmd.toString() + os3.EOL)
    }
    exports.issueCommand = issueCommand
    function issue(name, message = '') {
      issueCommand(name, {}, message)
    }
    exports.issue = issue
    var CMD_STRING = '::'
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = 'missing.command'
        }
        this.command = command
        this.properties = properties
        this.message = message
      }
      toString() {
        let cmdStr = CMD_STRING + this.command
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += ' '
          let first = true
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key]
              if (val) {
                if (first) {
                  first = false
                } else {
                  cmdStr += ','
                }
                cmdStr += `${key}=${escapeProperty(val)}`
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`
        return cmdStr
      }
    }
    function escapeData(s) {
      return utils_1
        .toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
    }
    function escapeProperty(s) {
      return utils_1
        .toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C')
    }
  },
})

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  'node_modules/@actions/core/lib/file-command.js'(exports) {
    'use strict'
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k]
              },
            })
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            o[k2] = m[k]
          })
    var __setModuleDefault =
      (exports && exports.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v })
          }
        : function (o, v) {
            o['default'] = v
          })
    var __importStar =
      (exports && exports.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null) {
          for (var k in mod)
            if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k)
        }
        __setModuleDefault(result, mod)
        return result
      }
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.issueCommand = void 0
    var fs3 = __importStar(require('fs'))
    var os3 = __importStar(require('os'))
    var utils_1 = require_utils()
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`]
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`)
      }
      if (!fs3.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`)
      }
      fs3.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os3.EOL}`, {
        encoding: 'utf8',
      })
    }
    exports.issueCommand = issueCommand
  },
})

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  'node_modules/@actions/http-client/proxy.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === 'https:'
      let proxyUrl
      if (checkBypass(reqUrl)) {
        return proxyUrl
      }
      let proxyVar
      if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY']
      } else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY']
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar)
      }
      return proxyUrl
    }
    exports.getProxyUrl = getProxyUrl
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false
      }
      let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || ''
      if (!noProxy) {
        return false
      }
      let reqPort
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port)
      } else if (reqUrl.protocol === 'http:') {
        reqPort = 80
      } else if (reqUrl.protocol === 'https:') {
        reqPort = 443
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()]
      if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`)
      }
      for (let upperNoProxyItem of noProxy
        .split(',')
        .map((x) => x.trim().toUpperCase())
        .filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true
        }
      }
      return false
    }
    exports.checkBypass = checkBypass
  },
})

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  'node_modules/tunnel/lib/tunnel.js'(exports) {
    'use strict'
    var net = require('net')
    var tls = require('tls')
    var http2 = require('http')
    var https2 = require('https')
    var events = require('events')
    var assert = require('assert')
    var util = require('util')
    exports.httpOverHttp = httpOverHttp
    exports.httpsOverHttp = httpsOverHttp
    exports.httpOverHttps = httpOverHttps
    exports.httpsOverHttps = httpsOverHttps
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options)
      agent.request = http2.request
      return agent
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options)
      agent.request = http2.request
      agent.createSocket = createSecureSocket
      agent.defaultPort = 443
      return agent
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options)
      agent.request = https2.request
      return agent
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options)
      agent.request = https2.request
      agent.createSocket = createSecureSocket
      agent.defaultPort = 443
      return agent
    }
    function TunnelingAgent(options) {
      var self = this
      self.options = options || {}
      self.proxyOptions = self.options.proxy || {}
      self.maxSockets = self.options.maxSockets || http2.Agent.defaultMaxSockets
      self.requests = []
      self.sockets = []
      self.on('free', function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress)
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i]
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1)
            pending.request.onSocket(socket)
            return
          }
        }
        socket.destroy()
        self.removeSocket(socket)
      })
    }
    util.inherits(TunnelingAgent, events.EventEmitter)
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this
      var options = mergeOptions(
        { request: req },
        self.options,
        toOptions(host, port, localAddress)
      )
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options)
        return
      }
      self.createSocket(options, function (socket) {
        socket.on('free', onFree)
        socket.on('close', onCloseOrRemove)
        socket.on('agentRemove', onCloseOrRemove)
        req.onSocket(socket)
        function onFree() {
          self.emit('free', socket, options)
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket)
          socket.removeListener('free', onFree)
          socket.removeListener('close', onCloseOrRemove)
          socket.removeListener('agentRemove', onCloseOrRemove)
        }
      })
    }
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this
      var placeholder = {}
      self.sockets.push(placeholder)
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: 'CONNECT',
        path: options.host + ':' + options.port,
        agent: false,
        headers: {
          host: options.host + ':' + options.port,
        },
      })
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {}
        connectOptions.headers['Proxy-Authorization'] =
          'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64')
      }
      debug('making CONNECT request')
      var connectReq = self.request(connectOptions)
      connectReq.useChunkedEncodingByDefault = false
      connectReq.once('response', onResponse)
      connectReq.once('upgrade', onUpgrade)
      connectReq.once('connect', onConnect)
      connectReq.once('error', onError)
      connectReq.end()
      function onResponse(res) {
        res.upgrade = true
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function () {
          onConnect(res, socket, head)
        })
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners()
        socket.removeAllListeners()
        if (res.statusCode !== 200) {
          debug('tunneling socket could not be established, statusCode=%d', res.statusCode)
          socket.destroy()
          var error = new Error(
            'tunneling socket could not be established, statusCode=' + res.statusCode
          )
          error.code = 'ECONNRESET'
          options.request.emit('error', error)
          self.removeSocket(placeholder)
          return
        }
        if (head.length > 0) {
          debug('got illegal response body from proxy')
          socket.destroy()
          var error = new Error('got illegal response body from proxy')
          error.code = 'ECONNRESET'
          options.request.emit('error', error)
          self.removeSocket(placeholder)
          return
        }
        debug('tunneling connection has established')
        self.sockets[self.sockets.indexOf(placeholder)] = socket
        return cb(socket)
      }
      function onError(cause) {
        connectReq.removeAllListeners()
        debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack)
        var error = new Error('tunneling socket could not be established, cause=' + cause.message)
        error.code = 'ECONNRESET'
        options.request.emit('error', error)
        self.removeSocket(placeholder)
      }
    }
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket)
      if (pos === -1) {
        return
      }
      this.sockets.splice(pos, 1)
      var pending = this.requests.shift()
      if (pending) {
        this.createSocket(pending, function (socket2) {
          pending.request.onSocket(socket2)
        })
      }
    }
    function createSecureSocket(options, cb) {
      var self = this
      TunnelingAgent.prototype.createSocket.call(self, options, function (socket) {
        var hostHeader = options.request.getHeader('host')
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host,
        })
        var secureSocket = tls.connect(0, tlsOptions)
        self.sockets[self.sockets.indexOf(socket)] = secureSocket
        cb(secureSocket)
      })
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === 'string') {
        return {
          host,
          port,
          localAddress,
        }
      }
      return host
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i]
        if (typeof overrides === 'object') {
          var keys = Object.keys(overrides)
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j]
            if (overrides[k] !== void 0) {
              target[k] = overrides[k]
            }
          }
        }
      }
      return target
    }
    var debug
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments)
        if (typeof args[0] === 'string') {
          args[0] = 'TUNNEL: ' + args[0]
        } else {
          args.unshift('TUNNEL:')
        }
        console.error.apply(console, args)
      }
    } else {
      debug = function () {}
    }
    exports.debug = debug
  },
})

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  'node_modules/tunnel/index.js'(exports, module2) {
    module2.exports = require_tunnel()
  },
})

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  'node_modules/@actions/http-client/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var http2 = require('http')
    var https2 = require('https')
    var pm = require_proxy()
    var tunnel
    var HttpCodes
    ;(function (HttpCodes2) {
      HttpCodes2[(HttpCodes2['OK'] = 200)] = 'OK'
      HttpCodes2[(HttpCodes2['MultipleChoices'] = 300)] = 'MultipleChoices'
      HttpCodes2[(HttpCodes2['MovedPermanently'] = 301)] = 'MovedPermanently'
      HttpCodes2[(HttpCodes2['ResourceMoved'] = 302)] = 'ResourceMoved'
      HttpCodes2[(HttpCodes2['SeeOther'] = 303)] = 'SeeOther'
      HttpCodes2[(HttpCodes2['NotModified'] = 304)] = 'NotModified'
      HttpCodes2[(HttpCodes2['UseProxy'] = 305)] = 'UseProxy'
      HttpCodes2[(HttpCodes2['SwitchProxy'] = 306)] = 'SwitchProxy'
      HttpCodes2[(HttpCodes2['TemporaryRedirect'] = 307)] = 'TemporaryRedirect'
      HttpCodes2[(HttpCodes2['PermanentRedirect'] = 308)] = 'PermanentRedirect'
      HttpCodes2[(HttpCodes2['BadRequest'] = 400)] = 'BadRequest'
      HttpCodes2[(HttpCodes2['Unauthorized'] = 401)] = 'Unauthorized'
      HttpCodes2[(HttpCodes2['PaymentRequired'] = 402)] = 'PaymentRequired'
      HttpCodes2[(HttpCodes2['Forbidden'] = 403)] = 'Forbidden'
      HttpCodes2[(HttpCodes2['NotFound'] = 404)] = 'NotFound'
      HttpCodes2[(HttpCodes2['MethodNotAllowed'] = 405)] = 'MethodNotAllowed'
      HttpCodes2[(HttpCodes2['NotAcceptable'] = 406)] = 'NotAcceptable'
      HttpCodes2[(HttpCodes2['ProxyAuthenticationRequired'] = 407)] = 'ProxyAuthenticationRequired'
      HttpCodes2[(HttpCodes2['RequestTimeout'] = 408)] = 'RequestTimeout'
      HttpCodes2[(HttpCodes2['Conflict'] = 409)] = 'Conflict'
      HttpCodes2[(HttpCodes2['Gone'] = 410)] = 'Gone'
      HttpCodes2[(HttpCodes2['TooManyRequests'] = 429)] = 'TooManyRequests'
      HttpCodes2[(HttpCodes2['InternalServerError'] = 500)] = 'InternalServerError'
      HttpCodes2[(HttpCodes2['NotImplemented'] = 501)] = 'NotImplemented'
      HttpCodes2[(HttpCodes2['BadGateway'] = 502)] = 'BadGateway'
      HttpCodes2[(HttpCodes2['ServiceUnavailable'] = 503)] = 'ServiceUnavailable'
      HttpCodes2[(HttpCodes2['GatewayTimeout'] = 504)] = 'GatewayTimeout'
    })((HttpCodes = exports.HttpCodes || (exports.HttpCodes = {})))
    var Headers
    ;(function (Headers2) {
      Headers2['Accept'] = 'accept'
      Headers2['ContentType'] = 'content-type'
    })((Headers = exports.Headers || (exports.Headers = {})))
    var MediaTypes
    ;(function (MediaTypes2) {
      MediaTypes2['ApplicationJson'] = 'application/json'
    })((MediaTypes = exports.MediaTypes || (exports.MediaTypes = {})))
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl))
      return proxyUrl ? proxyUrl.href : ''
    }
    exports.getProxyUrl = getProxyUrl
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect,
    ]
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout,
    ]
    var RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD']
    var ExponentialBackoffCeiling = 10
    var ExponentialBackoffTimeSlice = 5
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message)
        this.name = 'HttpClientError'
        this.statusCode = statusCode
        Object.setPrototypeOf(this, HttpClientError.prototype)
      }
    }
    exports.HttpClientError = HttpClientError
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0)
          this.message.on('data', (chunk) => {
            output = Buffer.concat([output, chunk])
          })
          this.message.on('end', () => {
            resolve(output.toString())
          })
        })
      }
    }
    exports.HttpClientResponse = HttpClientResponse
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl)
      return parsedUrl.protocol === 'https:'
    }
    exports.isHttps = isHttps
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false
        this._allowRedirects = true
        this._allowRedirectDowngrade = false
        this._maxRedirects = 50
        this._allowRetries = false
        this._maxRetries = 1
        this._keepAlive = false
        this._disposed = false
        this.userAgent = userAgent
        this.handlers = handlers || []
        this.requestOptions = requestOptions
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError
          }
          this._socketTimeout = requestOptions.socketTimeout
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0)
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {})
      }
      get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {})
      }
      del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {})
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {})
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {})
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {})
      }
      head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {})
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders)
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        )
        let res = await this.get(requestUrl, additionalHeaders)
        return this._processResponse(res, this.requestOptions)
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2)
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        )
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        )
        let res = await this.post(requestUrl, data, additionalHeaders)
        return this._processResponse(res, this.requestOptions)
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2)
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        )
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        )
        let res = await this.put(requestUrl, data, additionalHeaders)
        return this._processResponse(res, this.requestOptions)
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2)
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        )
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        )
        let res = await this.patch(requestUrl, data, additionalHeaders)
        return this._processResponse(res, this.requestOptions)
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error('Client has already been disposed.')
        }
        let parsedUrl = new URL(requestUrl)
        let info = this._prepareRequest(verb, parsedUrl, headers)
        let maxTries =
          this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1
        let numTries = 0
        let response
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data)
          if (
            response &&
            response.message &&
            response.message.statusCode === HttpCodes.Unauthorized
          ) {
            let authenticationHandler
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i]
                break
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data)
            } else {
              return response
            }
          }
          let redirectsRemaining = this._maxRedirects
          while (
            HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
            this._allowRedirects &&
            redirectsRemaining > 0
          ) {
            const redirectUrl = response.message.headers['location']
            if (!redirectUrl) {
              break
            }
            let parsedRedirectUrl = new URL(redirectUrl)
            if (
              parsedUrl.protocol == 'https:' &&
              parsedUrl.protocol != parsedRedirectUrl.protocol &&
              !this._allowRedirectDowngrade
            ) {
              throw new Error(
                'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
              )
            }
            await response.readBody()
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === 'authorization') {
                  delete headers[header]
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers)
            response = await this.requestRaw(info, data)
            redirectsRemaining--
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response
          }
          numTries += 1
          if (numTries < maxTries) {
            await response.readBody()
            await this._performExponentialBackoff(numTries)
          }
        }
        return response
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy()
        }
        this._disposed = true
      }
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function (err, res) {
            if (err) {
              reject(err)
            }
            resolve(res)
          }
          this.requestRawWithCallback(info, data, callbackForResult)
        })
      }
      requestRawWithCallback(info, data, onResult) {
        let socket
        if (typeof data === 'string') {
          info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8')
        }
        let callbackCalled = false
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true
            onResult(err, res)
          }
        }
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg)
          handleResult(null, res)
        })
        req.on('socket', (sock) => {
          socket = sock
        })
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end()
          }
          handleResult(new Error('Request timeout: ' + info.options.path), null)
        })
        req.on('error', function (err) {
          handleResult(err, null)
        })
        if (data && typeof data === 'string') {
          req.write(data, 'utf8')
        }
        if (data && typeof data !== 'string') {
          data.on('close', function () {
            req.end()
          })
          data.pipe(req)
        } else {
          req.end()
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl)
        return this._getAgent(parsedUrl)
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {}
        info.parsedUrl = requestUrl
        const usingSsl = info.parsedUrl.protocol === 'https:'
        info.httpModule = usingSsl ? https2 : http2
        const defaultPort = usingSsl ? 443 : 80
        info.options = {}
        info.options.host = info.parsedUrl.hostname
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '')
        info.options.method = method
        info.options.headers = this._mergeHeaders(headers)
        if (this.userAgent != null) {
          info.options.headers['user-agent'] = this.userAgent
        }
        info.options.agent = this._getAgent(info.parsedUrl)
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options)
          })
        }
        return info
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) =>
          Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {})
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign(
            {},
            lowercaseKeys(this.requestOptions.headers),
            lowercaseKeys(headers)
          )
        }
        return lowercaseKeys(headers || {})
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) =>
          Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {})
        let clientHeader
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header]
        }
        return additionalHeaders[header] || clientHeader || _default
      }
      _getAgent(parsedUrl) {
        let agent
        let proxyUrl = pm.getProxyUrl(parsedUrl)
        let useProxy = proxyUrl && proxyUrl.hostname
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent
        }
        if (!!agent) {
          return agent
        }
        const usingSsl = parsedUrl.protocol === 'https:'
        let maxSockets = 100
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http2.globalAgent.maxSockets
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2()
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: {
              ...((proxyUrl.username || proxyUrl.password) && {
                proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
              }),
              host: proxyUrl.hostname,
              port: proxyUrl.port,
            },
          }
          let tunnelAgent
          const overHttps = proxyUrl.protocol === 'https:'
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp
          }
          agent = tunnelAgent(agentOptions)
          this._proxyAgent = agent
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets }
          agent = usingSsl ? new https2.Agent(options) : new http2.Agent(options)
          this._agent = agent
        }
        if (!agent) {
          agent = usingSsl ? https2.globalAgent : http2.globalAgent
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false,
          })
        }
        return agent
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber)
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber)
        return new Promise((resolve) => setTimeout(() => resolve(), ms))
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
          let a = new Date(value)
          if (!isNaN(a.valueOf())) {
            return a
          }
        }
        return value
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode
          const response = {
            statusCode,
            result: null,
            headers: {},
          }
          if (statusCode == HttpCodes.NotFound) {
            resolve(response)
          }
          let obj
          let contents
          try {
            contents = await res.readBody()
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer)
              } else {
                obj = JSON.parse(contents)
              }
              response.result = obj
            }
            response.headers = res.message.headers
          } catch (err) {}
          if (statusCode > 299) {
            let msg
            if (obj && obj.message) {
              msg = obj.message
            } else if (contents && contents.length > 0) {
              msg = contents
            } else {
              msg = 'Failed request: (' + statusCode + ')'
            }
            let err = new HttpClientError(msg, statusCode)
            err.result = response.result
            reject(err)
          } else {
            resolve(response)
          }
        })
      }
    }
    exports.HttpClient = HttpClient
  },
})

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  'node_modules/@actions/http-client/auth.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username
        this.password = password
      }
      prepareRequest(options) {
        options.headers['Authorization'] =
          'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')
      }
      canHandleAuthentication(response) {
        return false
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null
      }
    }
    exports.BasicCredentialHandler = BasicCredentialHandler
    var BearerCredentialHandler = class {
      constructor(token2) {
        this.token = token2
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token
      }
      canHandleAuthentication(response) {
        return false
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null
      }
    }
    exports.BearerCredentialHandler = BearerCredentialHandler
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token2) {
        this.token = token2
      }
      prepareRequest(options) {
        options.headers['Authorization'] =
          'Basic ' + Buffer.from('PAT:' + this.token).toString('base64')
      }
      canHandleAuthentication(response) {
        return false
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null
      }
    }
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler
  },
})

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  'node_modules/@actions/core/lib/oidc-utils.js'(exports) {
    'use strict'
    var __awaiter =
      (exports && exports.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value)
              })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value))
            } catch (e) {
              reject(e)
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value))
            } catch (e) {
              reject(e)
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
      }
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.OidcClient = void 0
    var http_client_1 = require_http_client()
    var auth_1 = require_auth()
    var core_1 = require_core()
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry,
        }
        return new http_client_1.HttpClient(
          'actions/oidc-client',
          [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())],
          requestOptions
        )
      }
      static getRequestToken() {
        const token2 = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN']
        if (!token2) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable')
        }
        return token2
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL']
        if (!runtimeUrl) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable')
        }
        return runtimeUrl
      }
      static getCall(id_token_url) {
        var _a
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient()
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`)
          })
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value
          if (!id_token) {
            throw new Error('Response json body do not have ID Token field')
          }
          return id_token
        })
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl()
            if (audience) {
              const encodedAudience = encodeURIComponent(audience)
              id_token_url = `${id_token_url}&audience=${encodedAudience}`
            }
            core_1.debug(`ID token url is ${id_token_url}`)
            const id_token = yield OidcClient.getCall(id_token_url)
            core_1.setSecret(id_token)
            return id_token
          } catch (error) {
            throw new Error(`Error message: ${error.message}`)
          }
        })
      }
    }
    exports.OidcClient = OidcClient
  },
})

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  'node_modules/@actions/core/lib/core.js'(exports) {
    'use strict'
    var __createBinding =
      (exports && exports.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k]
              },
            })
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k
            o[k2] = m[k]
          })
    var __setModuleDefault =
      (exports && exports.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v })
          }
        : function (o, v) {
            o['default'] = v
          })
    var __importStar =
      (exports && exports.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null) {
          for (var k in mod)
            if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k)
        }
        __setModuleDefault(result, mod)
        return result
      }
    var __awaiter =
      (exports && exports.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value)
              })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value))
            } catch (e) {
              reject(e)
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value))
            } catch (e) {
              reject(e)
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
      }
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.getIDToken =
      exports.getState =
      exports.saveState =
      exports.group =
      exports.endGroup =
      exports.startGroup =
      exports.info =
      exports.notice =
      exports.warning =
      exports.error =
      exports.debug =
      exports.isDebug =
      exports.setFailed =
      exports.setCommandEcho =
      exports.setOutput =
      exports.getBooleanInput =
      exports.getMultilineInput =
      exports.getInput =
      exports.addPath =
      exports.setSecret =
      exports.exportVariable =
      exports.ExitCode =
        void 0
    var command_1 = require_command()
    var file_command_1 = require_file_command()
    var utils_1 = require_utils()
    var os3 = __importStar(require('os'))
    var path = __importStar(require('path'))
    var oidc_utils_1 = require_oidc_utils()
    var ExitCode
    ;(function (ExitCode2) {
      ExitCode2[(ExitCode2['Success'] = 0)] = 'Success'
      ExitCode2[(ExitCode2['Failure'] = 1)] = 'Failure'
    })((ExitCode = exports.ExitCode || (exports.ExitCode = {})))
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val)
      process.env[name] = convertedVal
      const filePath = process.env['GITHUB_ENV'] || ''
      if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_'
        const commandValue = `${name}<<${delimiter}${os3.EOL}${convertedVal}${os3.EOL}${delimiter}`
        file_command_1.issueCommand('ENV', commandValue)
      } else {
        command_1.issueCommand('set-env', { name }, convertedVal)
      }
    }
    exports.exportVariable = exportVariable
    function setSecret(secret) {
      command_1.issueCommand('add-mask', {}, secret)
    }
    exports.setSecret = setSecret
    function addPath(inputPath) {
      const filePath = process.env['GITHUB_PATH'] || ''
      if (filePath) {
        file_command_1.issueCommand('PATH', inputPath)
      } else {
        command_1.issueCommand('add-path', {}, inputPath)
      }
      process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`
    }
    exports.addPath = addPath
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || ''
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`)
      }
      if (options && options.trimWhitespace === false) {
        return val
      }
      return val.trim()
    }
    exports.getInput = getInput
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options)
        .split('\n')
        .filter((x) => x !== '')
      return inputs
    }
    exports.getMultilineInput = getMultilineInput
    function getBooleanInput(name, options) {
      const trueValue = ['true', 'True', 'TRUE']
      const falseValue = ['false', 'False', 'FALSE']
      const val = getInput(name, options)
      if (trueValue.includes(val)) return true
      if (falseValue.includes(val)) return false
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)
    }
    exports.getBooleanInput = getBooleanInput
    function setOutput(name, value) {
      process.stdout.write(os3.EOL)
      command_1.issueCommand('set-output', { name }, value)
    }
    exports.setOutput = setOutput
    function setCommandEcho(enabled) {
      command_1.issue('echo', enabled ? 'on' : 'off')
    }
    exports.setCommandEcho = setCommandEcho
    function setFailed(message) {
      process.exitCode = ExitCode.Failure
      error(message)
    }
    exports.setFailed = setFailed
    function isDebug() {
      return process.env['RUNNER_DEBUG'] === '1'
    }
    exports.isDebug = isDebug
    function debug(message) {
      command_1.issueCommand('debug', {}, message)
    }
    exports.debug = debug
    function error(message, properties = {}) {
      command_1.issueCommand(
        'error',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      )
    }
    exports.error = error
    function warning(message, properties = {}) {
      command_1.issueCommand(
        'warning',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      )
    }
    exports.warning = warning
    function notice(message, properties = {}) {
      command_1.issueCommand(
        'notice',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      )
    }
    exports.notice = notice
    function info(message) {
      process.stdout.write(message + os3.EOL)
    }
    exports.info = info
    function startGroup(name) {
      command_1.issue('group', name)
    }
    exports.startGroup = startGroup
    function endGroup() {
      command_1.issue('endgroup')
    }
    exports.endGroup = endGroup
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name)
        let result
        try {
          result = yield fn()
        } finally {
          endGroup()
        }
        return result
      })
    }
    exports.group = group
    function saveState(name, value) {
      command_1.issueCommand('save-state', { name }, value)
    }
    exports.saveState = saveState
    function getState(name) {
      return process.env[`STATE_${name}`] || ''
    }
    exports.getState = getState
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud)
      })
    }
    exports.getIDToken = getIDToken
  },
})

// node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS({
  'node_modules/fast-glob/out/utils/array.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.splitWhen = exports.flatten = void 0
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), [])
    }
    exports.flatten = flatten
    function splitWhen(items, predicate) {
      const result = [[]]
      let groupIndex = 0
      for (const item of items) {
        if (predicate(item)) {
          groupIndex++
          result[groupIndex] = []
        } else {
          result[groupIndex].push(item)
        }
      }
      return result
    }
    exports.splitWhen = splitWhen
  },
})

// node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS({
  'node_modules/fast-glob/out/utils/errno.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEnoentCodeError = void 0
    function isEnoentCodeError(error) {
      return error.code === 'ENOENT'
    }
    exports.isEnoentCodeError = isEnoentCodeError
  },
})

// node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS({
  'node_modules/fast-glob/out/utils/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS({
  'node_modules/fast-glob/out/utils/path.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.removeLeadingDotSegment =
      exports.escape =
      exports.makeAbsolute =
      exports.unixify =
        void 0
    var path = require('path')
    var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2
    var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
    function unixify(filepath) {
      return filepath.replace(/\\/g, '/')
    }
    exports.unixify = unixify
    function makeAbsolute(cwd, filepath) {
      return path.resolve(cwd, filepath)
    }
    exports.makeAbsolute = makeAbsolute
    function escape(pattern) {
      return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2')
    }
    exports.escape = escape
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1)
        if (secondCharactery === '/' || secondCharactery === '\\') {
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT)
        }
      }
      return entry
    }
    exports.removeLeadingDotSegment = removeLeadingDotSegment
  },
})

// node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  'node_modules/is-extglob/index.js'(exports, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      var match
      while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
        if (match[2]) return true
        str = str.slice(match.index + match[0].length)
      }
      return false
    }
  },
})

// node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  'node_modules/is-glob/index.js'(exports, module2) {
    var isExtglob = require_is_extglob()
    var chars = { '{': '}', '(': ')', '[': ']' }
    var strictCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      var pipeIndex = -2
      var closeSquareIndex = -2
      var closeCurlyIndex = -2
      var closeParenIndex = -2
      var backSlashIndex = -2
      while (index < str.length) {
        if (str[index] === '*') {
          return true
        }
        if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
          return true
        }
        if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf(']', index)
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
          closeCurlyIndex = str.indexOf('}', index)
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true
            }
          }
        }
        if (
          closeParenIndex !== -1 &&
          str[index] === '(' &&
          str[index + 1] === '?' &&
          /[:!=]/.test(str[index + 2]) &&
          str[index + 3] !== ')'
        ) {
          closeParenIndex = str.indexOf(')', index)
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf('|', index)
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
            closeParenIndex = str.indexOf(')', pipeIndex)
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf('\\', pipeIndex)
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true
              }
            }
          }
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    var relaxedCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    module2.exports = function isGlob(str, options) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      if (isExtglob(str)) {
        return true
      }
      var check = strictCheck
      if (options && options.strict === false) {
        check = relaxedCheck
      }
      return check(str)
    }
  },
})

// node_modules/fast-glob/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  'node_modules/fast-glob/node_modules/glob-parent/index.js'(exports, module2) {
    'use strict'
    var isGlob = require_is_glob()
    var pathPosixDirname = require('path').posix.dirname
    var isWin32 = require('os').platform() === 'win32'
    var slash = '/'
    var backslash = /\\/g
    var enclosure = /[\{\[].*[\}\]]$/
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts)
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash)
      }
      if (enclosure.test(str)) {
        str += slash
      }
      str += 'a'
      do {
        str = pathPosixDirname(str)
      } while (isGlob(str) || globby.test(str))
      return str.replace(escaped, '$1')
    }
  },
})

// node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  'node_modules/braces/lib/utils.js'(exports) {
    'use strict'
    exports.isInteger = (num) => {
      if (typeof num === 'number') {
        return Number.isInteger(num)
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isInteger(Number(num))
      }
      return false
    }
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type)
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false
      if (!exports.isInteger(min) || !exports.isInteger(max)) return false
      return (Number(max) - Number(min)) / Number(step) >= limit
    }
    exports.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n]
      if (!node) return
      if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
        if (node.escaped !== true) {
          node.value = '\\' + node.value
          node.escaped = true
        }
      }
    }
    exports.encloseBrace = (node) => {
      if (node.type !== 'brace') return false
      if ((node.commas >> (0 + node.ranges)) >> 0 === 0) {
        node.invalid = true
        return true
      }
      return false
    }
    exports.isInvalidBrace = (block) => {
      if (block.type !== 'brace') return false
      if (block.invalid === true || block.dollar) return true
      if ((block.commas >> (0 + block.ranges)) >> 0 === 0) {
        block.invalid = true
        return true
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true
        return true
      }
      return false
    }
    exports.isOpenOrClose = (node) => {
      if (node.type === 'open' || node.type === 'close') {
        return true
      }
      return node.open === true || node.close === true
    }
    exports.reduce = (nodes) =>
      nodes.reduce((acc, node) => {
        if (node.type === 'text') acc.push(node.value)
        if (node.type === 'range') node.type = 'text'
        return acc
      }, [])
    exports.flatten = (...args) => {
      const result = []
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i]
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele)
        }
        return result
      }
      flat(args)
      return result
    }
  },
})

// node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  'node_modules/braces/lib/stringify.js'(exports, module2) {
    'use strict'
    var utils = require_utils2()
    module2.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent)
        let invalidNode = node.invalid === true && options.escapeInvalid === true
        let output = ''
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return '\\' + node.value
          }
          return node.value
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child)
          }
        }
        return output
      }
      return stringify(ast)
    }
  },
})

// node_modules/is-number/index.js
var require_is_number = __commonJS({
  'node_modules/is-number/index.js'(exports, module2) {
    'use strict'
    module2.exports = function (num) {
      if (typeof num === 'number') {
        return num - num === 0
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
      }
      return false
    }
  },
})

// node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  'node_modules/to-regex-range/index.js'(exports, module2) {
    'use strict'
    var isNumber = require_is_number()
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError('toRegexRange: expected the first argument to be a number')
      }
      if (max === void 0 || min === max) {
        return String(min)
      }
      if (isNumber(max) === false) {
        throw new TypeError('toRegexRange: expected the second argument to be a number.')
      }
      let opts = { relaxZeros: true, ...options }
      if (typeof opts.strictZeros === 'boolean') {
        opts.relaxZeros = opts.strictZeros === false
      }
      let relax = String(opts.relaxZeros)
      let shorthand = String(opts.shorthand)
      let capture = String(opts.capture)
      let wrap = String(opts.wrap)
      let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result
      }
      let a = Math.min(min, max)
      let b = Math.max(min, max)
      if (Math.abs(a - b) === 1) {
        let result = min + '|' + max
        if (opts.capture) {
          return `(${result})`
        }
        if (opts.wrap === false) {
          return result
        }
        return `(?:${result})`
      }
      let isPadded = hasPadding(min) || hasPadding(max)
      let state = { min, max, a, b }
      let positives = []
      let negatives = []
      if (isPadded) {
        state.isPadded = isPadded
        state.maxLen = String(state.max).length
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts)
        a = state.a = 0
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts)
      }
      state.negatives = negatives
      state.positives = positives
      state.result = collatePatterns(negatives, positives, opts)
      if (opts.capture === true) {
        state.result = `(${state.result})`
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`
      }
      toRegexRange.cache[cacheKey] = state
      return state.result
    }
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, '-', false, options) || []
      let onlyPositive = filterPatterns(pos, neg, '', false, options) || []
      let intersected = filterPatterns(neg, pos, '-?', true, options) || []
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive)
      return subpatterns.join('|')
    }
    function splitToRanges(min, max) {
      let nines = 1
      let zeros = 1
      let stop = countNines(min, nines)
      let stops = /* @__PURE__ */ new Set([max])
      while (min <= stop && stop <= max) {
        stops.add(stop)
        nines += 1
        stop = countNines(min, nines)
      }
      stop = countZeros(max + 1, zeros) - 1
      while (min < stop && stop <= max) {
        stops.add(stop)
        zeros += 1
        stop = countZeros(max + 1, zeros) - 1
      }
      stops = [...stops]
      stops.sort(compare)
      return stops
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 }
      }
      let zipped = zip2(start, stop)
      let digits = zipped.length
      let pattern = ''
      let count = 0
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i]
        if (startDigit === stopDigit) {
          pattern += startDigit
        } else if (startDigit !== '0' || stopDigit !== '9') {
          pattern += toCharacterClass(startDigit, stopDigit, options)
        } else {
          count++
        }
      }
      if (count) {
        pattern += options.shorthand === true ? '\\d' : '[0-9]'
      }
      return { pattern, count: [count], digits }
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max)
      let tokens = []
      let start = min
      let prev
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i]
        let obj = rangeToPattern(String(start), String(max2), options)
        let zeros = ''
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop()
          }
          prev.count.push(obj.count[0])
          prev.string = prev.pattern + toQuantifier(prev.count)
          start = max2 + 1
          continue
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options)
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count)
        tokens.push(obj)
        start = max2 + 1
        prev = obj
      }
      return tokens
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = []
      for (let ele of arr) {
        let { string } = ele
        if (!intersection && !contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
        if (intersection && contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
      }
      return result
    }
    function zip2(a, b) {
      let arr = []
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]])
      return arr
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val)
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + '9'.repeat(len))
    }
    function countZeros(integer, zeros) {
      return integer - (integer % Math.pow(10, zeros))
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ''] = digits
      if (stop || start > 1) {
        return `{${start + (stop ? ',' + stop : '')}}`
      }
      return ''
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? '' : '-'}${b}]`
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str)
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value
      }
      let diff = Math.abs(tok.maxLen - String(value).length)
      let relax = options.relaxZeros !== false
      switch (diff) {
        case 0:
          return ''
        case 1:
          return relax ? '0?' : '0'
        case 2:
          return relax ? '0{0,2}' : '00'
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`
        }
      }
    }
    toRegexRange.cache = {}
    toRegexRange.clearCache = () => (toRegexRange.cache = {})
    module2.exports = toRegexRange
  },
})

// node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  'node_modules/fill-range/index.js'(exports, module2) {
    'use strict'
    var util = require('util')
    var toRegexRange = require_to_regex_range()
    var isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
    var transform = (toNumber) => {
      return (value) => (toNumber === true ? Number(value) : String(value))
    }
    var isValidValue = (value) => {
      return typeof value === 'number' || (typeof value === 'string' && value !== '')
    }
    var isNumber = (num) => Number.isInteger(+num)
    var zeros = (input) => {
      let value = `${input}`
      let index = -1
      if (value[0] === '-') value = value.slice(1)
      if (value === '0') return false
      while (value[++index] === '0');
      return index > 0
    }
    var stringify = (start, end, options) => {
      if (typeof start === 'string' || typeof end === 'string') {
        return true
      }
      return options.stringify === true
    }
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === '-' ? '-' : ''
        if (dash) input = input.slice(1)
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, '0')
      }
      if (toNumber === false) {
        return String(input)
      }
      return input
    }
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === '-' ? '-' : ''
      if (negative) {
        input = input.slice(1)
        maxLength--
      }
      while (input.length < maxLength) input = '0' + input
      return negative ? '-' + input : input
    }
    var toSequence = (parts, options) => {
      parts.negatives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      parts.positives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      let prefix = options.capture ? '' : '?:'
      let positives = ''
      let negatives = ''
      let result
      if (parts.positives.length) {
        positives = parts.positives.join('|')
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join('|')})`
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`
      } else {
        result = positives || negatives
      }
      if (options.wrap) {
        return `(${prefix}${result})`
      }
      return result
    }
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options })
      }
      let start = String.fromCharCode(a)
      if (a === b) return start
      let stop = String.fromCharCode(b)
      return `[${start}-${stop}]`
    }
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true
        let prefix = options.capture ? '' : '?:'
        return wrap ? `(${prefix}${start.join('|')})` : start.join('|')
      }
      return toRegexRange(start, end, options)
    }
    var rangeError = (...args) => {
      return new RangeError('Invalid range arguments: ' + util.inspect(...args))
    }
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end])
      return []
    }
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`)
      }
      return []
    }
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start)
      let b = Number(end)
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true) throw rangeError([start, end])
        return []
      }
      if (a === 0) a = 0
      if (b === 0) b = 0
      let descending = a > b
      let startString = String(start)
      let endString = String(end)
      let stepString = String(step)
      step = Math.max(Math.abs(step), 1)
      let padded = zeros(startString) || zeros(endString) || zeros(stepString)
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0
      let toNumber = padded === false && stringify(start, end, options) === false
      let format = options.transform || transform(toNumber)
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options)
      }
      let parts = { negatives: [], positives: [] }
      let push = (num) => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num))
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a)
        } else {
          range.push(pad(format(a, index), maxLen, toNumber))
        }
        a = descending ? a - step : a + step
        index++
      }
      if (options.toRegex === true) {
        return step > 1
          ? toSequence(parts, options)
          : toRegex(range, null, { wrap: false, ...options })
      }
      return range
    }
    var fillLetters = (start, end, step = 1, options = {}) => {
      if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
        return invalidRange(start, end, options)
      }
      let format = options.transform || ((val) => String.fromCharCode(val))
      let a = `${start}`.charCodeAt(0)
      let b = `${end}`.charCodeAt(0)
      let descending = a > b
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options)
      }
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index))
        a = descending ? a - step : a + step
        index++
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options })
      }
      return range
    }
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start]
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options)
      }
      if (typeof step === 'function') {
        return fill(start, end, 1, { transform: step })
      }
      if (isObject(step)) {
        return fill(start, end, 0, step)
      }
      let opts = { ...options }
      if (opts.capture === true) opts.wrap = true
      step = step || opts.step || 1
      if (!isNumber(step)) {
        if (step != null && !isObject(step)) return invalidStep(step, opts)
        return fill(start, end, 1, step)
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts)
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts)
    }
    module2.exports = fill
  },
})

// node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  'node_modules/braces/lib/compile.js'(exports, module2) {
    'use strict'
    var fill = require_fill_range()
    var utils = require_utils2()
    var compile = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent)
        let invalidNode = node.invalid === true && options.escapeInvalid === true
        let invalid = invalidBlock === true || invalidNode === true
        let prefix = options.escapeInvalid === true ? '\\' : ''
        let output = ''
        if (node.isOpen === true) {
          return prefix + node.value
        }
        if (node.isClose === true) {
          return prefix + node.value
        }
        if (node.type === 'open') {
          return invalid ? prefix + node.value : '('
        }
        if (node.type === 'close') {
          return invalid ? prefix + node.value : ')'
        }
        if (node.type === 'comma') {
          return node.prev.type === 'comma' ? '' : invalid ? node.value : '|'
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          let range = fill(...args, { ...options, wrap: false, toRegex: true })
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node)
          }
        }
        return output
      }
      return walk(ast)
    }
    module2.exports = compile
  },
})

// node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  'node_modules/braces/lib/expand.js'(exports, module2) {
    'use strict'
    var fill = require_fill_range()
    var stringify = require_stringify()
    var utils = require_utils2()
    var append = (queue = '', stash = '', enclose = false) => {
      let result = []
      queue = [].concat(queue)
      stash = [].concat(stash)
      if (!stash.length) return queue
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose))
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === 'string') ele = `{${ele}}`
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele)
          }
        }
      }
      return utils.flatten(result)
    }
    var expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit
      let walk = (node, parent = {}) => {
        node.queue = []
        let p = parent
        let q = parent.queue
        while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
          p = p.parent
          q = p.queue
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)))
          return
        }
        if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ['{}']))
          return
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError(
              'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.'
            )
          }
          let range = fill(...args, options)
          if (range.length === 0) {
            range = stringify(node, options)
          }
          q.push(append(q.pop(), range))
          node.nodes = []
          return
        }
        let enclose = utils.encloseBrace(node)
        let queue = node.queue
        let block = node
        while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
          block = block.parent
          queue = block.queue
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i]
          if (child.type === 'comma' && node.type === 'brace') {
            if (i === 1) queue.push('')
            queue.push('')
            continue
          }
          if (child.type === 'close') {
            q.push(append(q.pop(), queue, enclose))
            continue
          }
          if (child.value && child.type !== 'open') {
            queue.push(append(queue.pop(), child.value))
            continue
          }
          if (child.nodes) {
            walk(child, node)
          }
        }
        return queue
      }
      return utils.flatten(walk(ast))
    }
    module2.exports = expand
  },
})

// node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  'node_modules/braces/lib/constants.js'(exports, module2) {
    'use strict'
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: '0',
      CHAR_9: '9',
      CHAR_UPPERCASE_A: 'A',
      CHAR_LOWERCASE_A: 'a',
      CHAR_UPPERCASE_Z: 'Z',
      CHAR_LOWERCASE_Z: 'z',
      CHAR_LEFT_PARENTHESES: '(',
      CHAR_RIGHT_PARENTHESES: ')',
      CHAR_ASTERISK: '*',
      CHAR_AMPERSAND: '&',
      CHAR_AT: '@',
      CHAR_BACKSLASH: '\\',
      CHAR_BACKTICK: '`',
      CHAR_CARRIAGE_RETURN: '\r',
      CHAR_CIRCUMFLEX_ACCENT: '^',
      CHAR_COLON: ':',
      CHAR_COMMA: ',',
      CHAR_DOLLAR: '$',
      CHAR_DOT: '.',
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: '=',
      CHAR_EXCLAMATION_MARK: '!',
      CHAR_FORM_FEED: '\f',
      CHAR_FORWARD_SLASH: '/',
      CHAR_HASH: '#',
      CHAR_HYPHEN_MINUS: '-',
      CHAR_LEFT_ANGLE_BRACKET: '<',
      CHAR_LEFT_CURLY_BRACE: '{',
      CHAR_LEFT_SQUARE_BRACKET: '[',
      CHAR_LINE_FEED: '\n',
      CHAR_NO_BREAK_SPACE: '\xA0',
      CHAR_PERCENT: '%',
      CHAR_PLUS: '+',
      CHAR_QUESTION_MARK: '?',
      CHAR_RIGHT_ANGLE_BRACKET: '>',
      CHAR_RIGHT_CURLY_BRACE: '}',
      CHAR_RIGHT_SQUARE_BRACKET: ']',
      CHAR_SEMICOLON: ';',
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: ' ',
      CHAR_TAB: '	',
      CHAR_UNDERSCORE: '_',
      CHAR_VERTICAL_LINE: '|',
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF',
    }
  },
})

// node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  'node_modules/braces/lib/parse.js'(exports, module2) {
    'use strict'
    var stringify = require_stringify()
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE,
    } = require_constants()
    var parse = (input, options = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      let opts = options || {}
      let max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`)
      }
      let ast = { type: 'root', input, nodes: [] }
      let stack = [ast]
      let block = ast
      let prev = ast
      let brackets = 0
      let length = input.length
      let index = 0
      let depth = 0
      let value
      let memo = {}
      const advance = () => input[index++]
      const push = (node) => {
        if (node.type === 'text' && prev.type === 'dot') {
          prev.type = 'text'
        }
        if (prev && prev.type === 'text' && node.type === 'text') {
          prev.value += node.value
          return
        }
        block.nodes.push(node)
        node.parent = block
        node.prev = prev
        prev = node
        return node
      }
      push({ type: 'bos' })
      while (index < length) {
        block = stack[stack.length - 1]
        value = advance()
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() })
          continue
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: 'text', value: '\\' + value })
          continue
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++
          let closed = true
          let next
          while (index < length && (next = advance())) {
            value += next
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++
              continue
            }
            if (next === CHAR_BACKSLASH) {
              value += advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--
              if (brackets === 0) {
                break
              }
            }
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: 'paren', nodes: [] })
          stack.push(block)
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== 'paren') {
            push({ type: 'text', value })
            continue
          }
          block = stack.pop()
          push({ type: 'text', value })
          block = stack[stack.length - 1]
          continue
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value
          let next
          if (options.keepQuotes !== true) {
            value = ''
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance()
              continue
            }
            if (next === open) {
              if (options.keepQuotes === true) value += next
              break
            }
            value += next
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++
          let dollar = (prev.value && prev.value.slice(-1) === '$') || block.dollar === true
          let brace = {
            type: 'brace',
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: [],
          }
          block = push(brace)
          stack.push(block)
          push({ type: 'open', value })
          continue
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== 'brace') {
            push({ type: 'text', value })
            continue
          }
          let type = 'close'
          block = stack.pop()
          block.close = true
          push({ type, value })
          depth--
          block = stack[stack.length - 1]
          continue
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0
            let open = block.nodes.shift()
            block.nodes = [open, { type: 'text', value: stringify(block) }]
          }
          push({ type: 'comma', value })
          block.commas++
          continue
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes
          if (depth === 0 || siblings.length === 0) {
            push({ type: 'text', value })
            continue
          }
          if (prev.type === 'dot') {
            block.range = []
            prev.value += value
            prev.type = 'range'
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true
              block.ranges = 0
              prev.type = 'text'
              continue
            }
            block.ranges++
            block.args = []
            continue
          }
          if (prev.type === 'range') {
            siblings.pop()
            let before = siblings[siblings.length - 1]
            before.value += prev.value + value
            prev = before
            block.ranges--
            continue
          }
          push({ type: 'dot', value })
          continue
        }
        push({ type: 'text', value })
      }
      do {
        block = stack.pop()
        if (block.type !== 'root') {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === 'open') node.isOpen = true
              if (node.type === 'close') node.isClose = true
              if (!node.nodes) node.type = 'text'
              node.invalid = true
            }
          })
          let parent = stack[stack.length - 1]
          let index2 = parent.nodes.indexOf(block)
          parent.nodes.splice(index2, 1, ...block.nodes)
        }
      } while (stack.length > 0)
      push({ type: 'eos' })
      return ast
    }
    module2.exports = parse
  },
})

// node_modules/braces/index.js
var require_braces = __commonJS({
  'node_modules/braces/index.js'(exports, module2) {
    'use strict'
    var stringify = require_stringify()
    var compile = require_compile()
    var expand = require_expand()
    var parse = require_parse()
    var braces = (input, options = {}) => {
      let output = []
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options)
          if (Array.isArray(result)) {
            output.push(...result)
          } else {
            output.push(result)
          }
        }
      } else {
        output = [].concat(braces.create(input, options))
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)]
      }
      return output
    }
    braces.parse = (input, options = {}) => parse(input, options)
    braces.stringify = (input, options = {}) => {
      if (typeof input === 'string') {
        return stringify(braces.parse(input, options), options)
      }
      return stringify(input, options)
    }
    braces.compile = (input, options = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options)
      }
      return compile(input, options)
    }
    braces.expand = (input, options = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options)
      }
      let result = expand(input, options)
      if (options.noempty === true) {
        result = result.filter(Boolean)
      }
      if (options.nodupes === true) {
        result = [...new Set(result)]
      }
      return result
    }
    braces.create = (input, options = {}) => {
      if (input === '' || input.length < 3) {
        return [input]
      }
      return options.expand !== true
        ? braces.compile(input, options)
        : braces.expand(input, options)
    }
    module2.exports = braces
  },
})

// node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  'node_modules/picomatch/lib/constants.js'(exports, module2) {
    'use strict'
    var path = require('path')
    var WIN_SLASH = '\\\\/'
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`
    var DOT_LITERAL = '\\.'
    var PLUS_LITERAL = '\\+'
    var QMARK_LITERAL = '\\?'
    var SLASH_LITERAL = '\\/'
    var ONE_CHAR = '(?=.)'
    var QMARK = '[^/]'
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`
    var NO_DOT = `(?!${DOT_LITERAL})`
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`
    var STAR = `${QMARK}*?`
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
    }
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
    }
    var POSIX_REGEX_SOURCE = {
      alnum: 'a-zA-Z0-9',
      alpha: 'a-zA-Z',
      ascii: '\\x00-\\x7F',
      blank: ' \\t',
      cntrl: '\\x00-\\x1F\\x7F',
      digit: '0-9',
      graph: '\\x21-\\x7E',
      lower: 'a-z',
      print: '\\x20-\\x7E ',
      punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
      space: ' \\t\\r\\n\\v\\f',
      upper: 'A-Z',
      word: 'A-Za-z0-9_',
      xdigit: 'A-Fa-f0-9',
    }
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        '***': '*',
        '**/**': '**',
        '**/**/**': '**',
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path.sep,
      extglobChars(chars) {
        return {
          '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
          '?': { type: 'qmark', open: '(?:', close: ')?' },
          '+': { type: 'plus', open: '(?:', close: ')+' },
          '*': { type: 'star', open: '(?:', close: ')*' },
          '@': { type: 'at', open: '(?:', close: ')' },
        }
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS
      },
    }
  },
})

// node_modules/picomatch/lib/utils.js
var require_utils3 = __commonJS({
  'node_modules/picomatch/lib/utils.js'(exports) {
    'use strict'
    var path = require('path')
    var win32 = process.platform === 'win32'
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL,
    } = require_constants2()
    exports.isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str)
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str)
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1')
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, '/')
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === '\\' ? '' : match
      })
    }
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split('.').map(Number)
      if ((segs.length === 3 && segs[0] >= 9) || (segs[0] === 8 && segs[1] >= 10)) {
        return true
      }
      return false
    }
    exports.isWindows = (options) => {
      if (options && typeof options.windows === 'boolean') {
        return options.windows
      }
      return win32 === true || path.sep === '\\'
    }
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx)
      if (idx === -1) return input
      if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1)
      return `${input.slice(0, idx)}\\${input.slice(idx)}`
    }
    exports.removePrefix = (input, state = {}) => {
      let output = input
      if (output.startsWith('./')) {
        output = output.slice(2)
        state.prefix = './'
      }
      return output
    }
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? '' : '^'
      const append = options.contains ? '' : '$'
      let output = `${prepend}(?:${input})${append}`
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`
      }
      return output
    }
  },
})

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  'node_modules/picomatch/lib/scan.js'(exports, module2) {
    'use strict'
    var utils = require_utils3()
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET,
    } = require_constants2()
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
    }
    var depth = (token2) => {
      if (token2.isPrefix !== true) {
        token2.depth = token2.isGlobstar ? Infinity : 1
      }
    }
    var scan = (input, options) => {
      const opts = options || {}
      const length = input.length - 1
      const scanToEnd = opts.parts === true || opts.scanToEnd === true
      const slashes = []
      const tokens = []
      const parts = []
      let str = input
      let index = -1
      let start = 0
      let lastIndex = 0
      let isBrace = false
      let isBracket = false
      let isGlob = false
      let isExtglob = false
      let isGlobstar = false
      let braceEscaped = false
      let backslashes = false
      let negated = false
      let negatedExtglob = false
      let finished = false
      let braces = 0
      let prev
      let code
      let token2 = { value: '', depth: 0, isGlob: false }
      const eos = () => index >= length
      const peek = () => str.charCodeAt(index + 1)
      const advance = () => {
        prev = code
        return str.charCodeAt(++index)
      }
      while (index < length) {
        code = advance()
        let next
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token2.backslashes = true
          code = advance()
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true
          }
          continue
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token2.backslashes = true
              advance()
              continue
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++
              continue
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token2.isBrace = true
              isGlob = token2.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token2.isBrace = true
              isGlob = token2.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--
              if (braces === 0) {
                braceEscaped = false
                isBrace = token2.isBrace = true
                finished = true
                break
              }
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index)
          tokens.push(token2)
          token2 = { value: '', depth: 0, isGlob: false }
          if (finished === true) continue
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2
            continue
          }
          lastIndex = index + 1
          continue
        }
        if (opts.noext !== true) {
          const isExtglobChar =
            code === CHAR_PLUS ||
            code === CHAR_AT ||
            code === CHAR_ASTERISK ||
            code === CHAR_QUESTION_MARK ||
            code === CHAR_EXCLAMATION_MARK
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token2.isGlob = true
            isExtglob = token2.isExtglob = true
            finished = true
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token2.backslashes = true
                  code = advance()
                  continue
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token2.isGlob = true
                  finished = true
                  break
                }
              }
              continue
            }
            break
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token2.isGlobstar = true
          isGlob = token2.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token2.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token2.backslashes = true
              advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token2.isBracket = true
              isGlob = token2.isGlob = true
              finished = true
              break
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token2.negated = true
          start++
          continue
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token2.isGlob = true
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token2.backslashes = true
                code = advance()
                continue
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true
                break
              }
            }
            continue
          }
          break
        }
        if (isGlob === true) {
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
      }
      if (opts.noext === true) {
        isExtglob = false
        isGlob = false
      }
      let base = str
      let prefix = ''
      let glob = ''
      if (start > 0) {
        prefix = str.slice(0, start)
        str = str.slice(start)
        lastIndex -= start
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex)
        glob = str.slice(lastIndex)
      } else if (isGlob === true) {
        base = ''
        glob = str
      } else {
        base = str
      }
      if (base && base !== '' && base !== '/' && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1)
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob)
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base)
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob,
      }
      if (opts.tokens === true) {
        state.maxDepth = 0
        if (!isPathSeparator(code)) {
          tokens.push(token2)
        }
        state.tokens = tokens
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start
          const i = slashes[idx]
          const value = input.slice(n, i)
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true
              tokens[idx].value = prefix
            } else {
              tokens[idx].value = value
            }
            depth(tokens[idx])
            state.maxDepth += tokens[idx].depth
          }
          if (idx !== 0 || value !== '') {
            parts.push(value)
          }
          prevIndex = i
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1)
          parts.push(value)
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value
            depth(tokens[tokens.length - 1])
            state.maxDepth += tokens[tokens.length - 1].depth
          }
        }
        state.slashes = slashes
        state.parts = parts
      }
      return state
    }
    module2.exports = scan
  },
})

// node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  'node_modules/picomatch/lib/parse.js'(exports, module2) {
    'use strict'
    var constants = require_constants2()
    var utils = require_utils3()
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS,
    } = constants
    var expandRange = (args, options) => {
      if (typeof options.expandRange === 'function') {
        return options.expandRange(...args, options)
      }
      args.sort()
      const value = `[${args.join('-')}]`
      try {
        new RegExp(value)
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join('..')
      }
      return value
    }
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`
    }
    var parse = (input, options) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      input = REPLACEMENTS[input] || input
      const opts = { ...options }
      const max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      let len = input.length
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
      }
      const bos = { type: 'bos', value: '', output: opts.prepend || '' }
      const tokens = [bos]
      const capture = opts.capture ? '' : '?:'
      const win32 = utils.isWindows(options)
      const PLATFORM_CHARS = constants.globChars(win32)
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS)
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR,
      } = PLATFORM_CHARS
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
      }
      const nodot = opts.dot ? '' : NO_DOT
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT
      let star = opts.bash === true ? globstar(opts) : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      if (typeof opts.noext === 'boolean') {
        opts.noextglob = opts.noext
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: '',
        output: '',
        prefix: '',
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens,
      }
      input = utils.removePrefix(input, state)
      len = input.length
      const extglobs = []
      const braces = []
      const stack = []
      let prev = bos
      let value
      const eos = () => state.index === len - 1
      const peek = (state.peek = (n = 1) => input[state.index + n])
      const advance = (state.advance = () => input[++state.index] || '')
      const remaining = () => input.slice(state.index + 1)
      const consume = (value2 = '', num = 0) => {
        state.consumed += value2
        state.index += num
      }
      const append = (token2) => {
        state.output += token2.output != null ? token2.output : token2.value
        consume(token2.value)
      }
      const negate = () => {
        let count = 1
        while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
          advance()
          state.start++
          count++
        }
        if (count % 2 === 0) {
          return false
        }
        state.negated = true
        state.start++
        return true
      }
      const increment = (type) => {
        state[type]++
        stack.push(type)
      }
      const decrement = (type) => {
        state[type]--
        stack.pop()
      }
      const push = (tok) => {
        if (prev.type === 'globstar') {
          const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace')
          const isExtglob =
            tok.extglob === true ||
            (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'))
          if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length)
            prev.type = 'star'
            prev.value = '*'
            prev.output = star
            state.output += prev.output
          }
        }
        if (extglobs.length && tok.type !== 'paren') {
          extglobs[extglobs.length - 1].inner += tok.value
        }
        if (tok.value || tok.output) append(tok)
        if (prev && prev.type === 'text' && tok.type === 'text') {
          prev.value += tok.value
          prev.output = (prev.output || '') + tok.value
          return
        }
        tok.prev = prev
        tokens.push(tok)
        prev = tok
      }
      const extglobOpen = (type, value2) => {
        const token2 = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: '' }
        token2.prev = prev
        token2.parens = state.parens
        token2.output = state.output
        const output = (opts.capture ? '(' : '') + token2.open
        increment('parens')
        push({ type, value: value2, output: state.output ? '' : ONE_CHAR })
        push({ type: 'paren', extglob: true, value: advance(), output })
        extglobs.push(token2)
      }
      const extglobClose = (token2) => {
        let output = token2.close + (opts.capture ? ')' : '')
        let rest
        if (token2.type === 'negate') {
          let extglobStar = star
          if (token2.inner && token2.inner.length > 1 && token2.inner.includes('/')) {
            extglobStar = globstar(opts)
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token2.close = `)$))${extglobStar}`
          }
          if (token2.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output
            output = token2.close = `)${expression})${extglobStar})`
          }
          if (token2.prev.type === 'bos') {
            state.negatedExtglob = true
          }
        }
        push({ type: 'paren', extglob: true, value, output })
        decrement('parens')
      }
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false
        let output = input.replace(
          REGEX_SPECIAL_CHARS_BACKREF,
          (m, esc, chars, first, rest, index) => {
            if (first === '\\') {
              backslashes = true
              return m
            }
            if (first === '?') {
              if (esc) {
                return esc + first + (rest ? QMARK.repeat(rest.length) : '')
              }
              if (index === 0) {
                return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '')
              }
              return QMARK.repeat(chars.length)
            }
            if (first === '.') {
              return DOT_LITERAL.repeat(chars.length)
            }
            if (first === '*') {
              if (esc) {
                return esc + first + (rest ? star : '')
              }
              return star
            }
            return esc ? m : `\\${m}`
          }
        )
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, '')
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? '\\\\' : m ? '\\' : ''
            })
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input
          return state
        }
        state.output = utils.wrapOutput(output, state, options)
        return state
      }
      while (!eos()) {
        value = advance()
        if (value === '\0') {
          continue
        }
        if (value === '\\') {
          const next = peek()
          if (next === '/' && opts.bash !== true) {
            continue
          }
          if (next === '.' || next === ';') {
            continue
          }
          if (!next) {
            value += '\\'
            push({ type: 'text', value })
            continue
          }
          const match = /^\\+/.exec(remaining())
          let slashes = 0
          if (match && match[0].length > 2) {
            slashes = match[0].length
            state.index += slashes
            if (slashes % 2 !== 0) {
              value += '\\'
            }
          }
          if (opts.unescape === true) {
            value = advance()
          } else {
            value += advance()
          }
          if (state.brackets === 0) {
            push({ type: 'text', value })
            continue
          }
        }
        if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
          if (opts.posix !== false && value === ':') {
            const inner = prev.value.slice(1)
            if (inner.includes('[')) {
              prev.posix = true
              if (inner.includes(':')) {
                const idx = prev.value.lastIndexOf('[')
                const pre = prev.value.slice(0, idx)
                const rest2 = prev.value.slice(idx + 2)
                const posix = POSIX_REGEX_SOURCE[rest2]
                if (posix) {
                  prev.value = pre + posix
                  state.backtrack = true
                  advance()
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR
                  }
                  continue
                }
              }
            }
          }
          if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
            value = `\\${value}`
          }
          if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
            value = `\\${value}`
          }
          if (opts.posix === true && value === '!' && prev.value === '[') {
            value = '^'
          }
          prev.value += value
          append({ value })
          continue
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value)
          prev.value += value
          append({ value })
          continue
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1
          if (opts.keepQuotes === true) {
            push({ type: 'text', value })
          }
          continue
        }
        if (value === '(') {
          increment('parens')
          push({ type: 'paren', value })
          continue
        }
        if (value === ')') {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError('opening', '('))
          }
          const extglob = extglobs[extglobs.length - 1]
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop())
            continue
          }
          push({ type: 'paren', value, output: state.parens ? ')' : '\\)' })
          decrement('parens')
          continue
        }
        if (value === '[') {
          if (opts.nobracket === true || !remaining().includes(']')) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('closing', ']'))
            }
            value = `\\${value}`
          } else {
            increment('brackets')
          }
          push({ type: 'bracket', value })
          continue
        }
        if (value === ']') {
          if (
            opts.nobracket === true ||
            (prev && prev.type === 'bracket' && prev.value.length === 1)
          ) {
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('opening', '['))
            }
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          decrement('brackets')
          const prevValue = prev.value.slice(1)
          if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
            value = `/${value}`
          }
          prev.value += value
          append({ value })
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue
          }
          const escaped = utils.escapeRegex(prev.value)
          state.output = state.output.slice(0, -prev.value.length)
          if (opts.literalBrackets === true) {
            state.output += escaped
            prev.value = escaped
            continue
          }
          prev.value = `(${capture}${escaped}|${prev.value})`
          state.output += prev.value
          continue
        }
        if (value === '{' && opts.nobrace !== true) {
          increment('braces')
          const open = {
            type: 'brace',
            value,
            output: '(',
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length,
          }
          braces.push(open)
          push(open)
          continue
        }
        if (value === '}') {
          const brace = braces[braces.length - 1]
          if (opts.nobrace === true || !brace) {
            push({ type: 'text', value, output: value })
            continue
          }
          let output = ')'
          if (brace.dots === true) {
            const arr = tokens.slice()
            const range = []
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop()
              if (arr[i].type === 'brace') {
                break
              }
              if (arr[i].type !== 'dots') {
                range.unshift(arr[i].value)
              }
            }
            output = expandRange(range, opts)
            state.backtrack = true
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex)
            const toks = state.tokens.slice(brace.tokensIndex)
            brace.value = brace.output = '\\{'
            value = output = '\\}'
            state.output = out
            for (const t of toks) {
              state.output += t.output || t.value
            }
          }
          push({ type: 'brace', value, output })
          decrement('braces')
          braces.pop()
          continue
        }
        if (value === '|') {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++
          }
          push({ type: 'text', value })
          continue
        }
        if (value === ',') {
          let output = value
          const brace = braces[braces.length - 1]
          if (brace && stack[stack.length - 1] === 'braces') {
            brace.comma = true
            output = '|'
          }
          push({ type: 'comma', value, output })
          continue
        }
        if (value === '/') {
          if (prev.type === 'dot' && state.index === state.start + 1) {
            state.start = state.index + 1
            state.consumed = ''
            state.output = ''
            tokens.pop()
            prev = bos
            continue
          }
          push({ type: 'slash', value, output: SLASH_LITERAL })
          continue
        }
        if (value === '.') {
          if (state.braces > 0 && prev.type === 'dot') {
            if (prev.value === '.') prev.output = DOT_LITERAL
            const brace = braces[braces.length - 1]
            prev.type = 'dots'
            prev.output += value
            prev.value += value
            brace.dots = true
            continue
          }
          if (state.braces + state.parens === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
            push({ type: 'text', value, output: DOT_LITERAL })
            continue
          }
          push({ type: 'dot', value, output: DOT_LITERAL })
          continue
        }
        if (value === '?') {
          const isGroup = prev && prev.value === '('
          if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('qmark', value)
            continue
          }
          if (prev && prev.type === 'paren') {
            const next = peek()
            let output = value
            if (next === '<' && !utils.supportsLookbehinds()) {
              throw new Error('Node.js v10 or higher is required for regex lookbehinds')
            }
            if (
              (prev.value === '(' && !/[!=<:]/.test(next)) ||
              (next === '<' && !/<([!=]|\w+>)/.test(remaining()))
            ) {
              output = `\\${value}`
            }
            push({ type: 'text', value, output })
            continue
          }
          if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
            push({ type: 'qmark', value, output: QMARK_NO_DOT })
            continue
          }
          push({ type: 'qmark', value, output: QMARK })
          continue
        }
        if (value === '!') {
          if (opts.noextglob !== true && peek() === '(') {
            if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
              extglobOpen('negate', value)
              continue
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate()
            continue
          }
        }
        if (value === '+') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('plus', value)
            continue
          }
          if ((prev && prev.value === '(') || opts.regex === false) {
            push({ type: 'plus', value, output: PLUS_LITERAL })
            continue
          }
          if (
            (prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) ||
            state.parens > 0
          ) {
            push({ type: 'plus', value })
            continue
          }
          push({ type: 'plus', value: PLUS_LITERAL })
          continue
        }
        if (value === '@') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            push({ type: 'at', extglob: true, value, output: '' })
            continue
          }
          push({ type: 'text', value })
          continue
        }
        if (value !== '*') {
          if (value === '$' || value === '^') {
            value = `\\${value}`
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining())
          if (match) {
            value += match[0]
            state.index += match[0].length
          }
          push({ type: 'text', value })
          continue
        }
        if (prev && (prev.type === 'globstar' || prev.star === true)) {
          prev.type = 'star'
          prev.star = true
          prev.value += value
          prev.output = star
          state.backtrack = true
          state.globstar = true
          consume(value)
          continue
        }
        let rest = remaining()
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen('star', value)
          continue
        }
        if (prev.type === 'star') {
          if (opts.noglobstar === true) {
            consume(value)
            continue
          }
          const prior = prev.prev
          const before = prior.prev
          const isStart = prior.type === 'slash' || prior.type === 'bos'
          const afterStar = before && (before.type === 'star' || before.type === 'globstar')
          if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
            push({ type: 'star', value, output: '' })
            continue
          }
          const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace')
          const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren')
          if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
            push({ type: 'star', value, output: '' })
            continue
          }
          while (rest.slice(0, 3) === '/**') {
            const after = input[state.index + 4]
            if (after && after !== '/') {
              break
            }
            rest = rest.slice(3)
            consume('/**', 3)
          }
          if (prior.type === 'bos' && eos()) {
            prev.type = 'globstar'
            prev.value += value
            prev.output = globstar(opts)
            state.output = prev.output
            state.globstar = true
            consume(value)
            continue
          }
          if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length)
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)')
            prev.value += value
            state.globstar = true
            state.output += prior.output + prev.output
            consume(value)
            continue
          }
          if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
            const end = rest[1] !== void 0 ? '|$' : ''
            state.output = state.output.slice(0, -(prior.output + prev.output).length)
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`
            prev.value += value
            state.output += prior.output + prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          if (prior.type === 'bos' && rest[0] === '/') {
            prev.type = 'globstar'
            prev.value += value
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`
            state.output = prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          state.output = state.output.slice(0, -prev.output.length)
          prev.type = 'globstar'
          prev.output = globstar(opts)
          prev.value += value
          state.output += prev.output
          state.globstar = true
          consume(value)
          continue
        }
        const token2 = { type: 'star', value, output: star }
        if (opts.bash === true) {
          token2.output = '.*?'
          if (prev.type === 'bos' || prev.type === 'slash') {
            token2.output = nodot + token2.output
          }
          push(token2)
          continue
        }
        if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
          token2.output = value
          push(token2)
          continue
        }
        if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
          if (prev.type === 'dot') {
            state.output += NO_DOT_SLASH
            prev.output += NO_DOT_SLASH
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH
            prev.output += NO_DOTS_SLASH
          } else {
            state.output += nodot
            prev.output += nodot
          }
          if (peek() !== '*') {
            state.output += ONE_CHAR
            prev.output += ONE_CHAR
          }
        }
        push(token2)
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'))
        state.output = utils.escapeLast(state.output, '[')
        decrement('brackets')
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'))
        state.output = utils.escapeLast(state.output, '(')
        decrement('parens')
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'))
        state.output = utils.escapeLast(state.output, '{')
        decrement('braces')
      }
      if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
        push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` })
      }
      if (state.backtrack === true) {
        state.output = ''
        for (const token2 of state.tokens) {
          state.output += token2.output != null ? token2.output : token2.value
          if (token2.suffix) {
            state.output += token2.suffix
          }
        }
      }
      return state
    }
    parse.fastpaths = (input, options) => {
      const opts = { ...options }
      const max =
        typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
      const len = input.length
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
      }
      input = REPLACEMENTS[input] || input
      const win32 = utils.isWindows(options)
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR,
      } = constants.globChars(win32)
      const nodot = opts.dot ? NO_DOTS : NO_DOT
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT
      const capture = opts.capture ? '' : '?:'
      const state = { negated: false, prefix: '' }
      let star = opts.bash === true ? '.*?' : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
      }
      const create = (str) => {
        switch (str) {
          case '*':
            return `${nodot}${ONE_CHAR}${star}`
          case '.*':
            return `${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*.*':
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*/*':
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`
          case '**':
            return nodot + globstar(opts)
          case '**/*':
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`
          case '**/*.*':
            return `(?:${nodot}${globstar(
              opts
            )}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '**/.*':
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str)
            if (!match) return
            const source2 = create(match[1])
            if (!source2) return
            return source2 + DOT_LITERAL + match[2]
          }
        }
      }
      const output = utils.removePrefix(input, state)
      let source = create(output)
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`
      }
      return source
    }
    module2.exports = parse
  },
})

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  'node_modules/picomatch/lib/picomatch.js'(exports, module2) {
    'use strict'
    var path = require('path')
    var scan = require_scan()
    var parse = require_parse2()
    var utils = require_utils3()
    var constants = require_constants2()
    var isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState))
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str)
            if (state2) return state2
          }
          return false
        }
        return arrayMatcher
      }
      const isState = isObject(glob) && glob.tokens && glob.input
      if (glob === '' || (typeof glob !== 'string' && !isState)) {
        throw new TypeError('Expected pattern to be a non-empty string')
      }
      const opts = options || {}
      const posix = utils.isWindows(options)
      const regex = isState
        ? picomatch.compileRe(glob, options)
        : picomatch.makeRe(glob, options, false, true)
      const state = regex.state
      delete regex.state
      let isIgnored = () => false
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null }
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState)
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix })
        const result = { glob, state, regex, posix, input, output, match, isMatch }
        if (typeof opts.onResult === 'function') {
          opts.onResult(result)
        }
        if (isMatch === false) {
          result.isMatch = false
          return returnObject ? result : false
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === 'function') {
            opts.onIgnore(result)
          }
          result.isMatch = false
          return returnObject ? result : false
        }
        if (typeof opts.onMatch === 'function') {
          opts.onMatch(result)
        }
        return returnObject ? result : true
      }
      if (returnState) {
        matcher.state = state
      }
      return matcher
    }
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected input to be a string')
      }
      if (input === '') {
        return { isMatch: false, output: '' }
      }
      const opts = options || {}
      const format = opts.format || (posix ? utils.toPosixSlashes : null)
      let match = input === glob
      let output = match && format ? format(input) : input
      if (match === false) {
        output = format ? format(input) : input
        match = output === glob
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix)
        } else {
          match = regex.exec(output)
        }
      }
      return { isMatch: Boolean(match), match, output }
    }
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)
      return regex.test(path.basename(input))
    }
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str)
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options))
      return parse(pattern, { ...options, fastpaths: false })
    }
    picomatch.scan = (input, options) => scan(input, options)
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output
      }
      const opts = options || {}
      const prepend = opts.contains ? '' : '^'
      const append = opts.contains ? '' : '$'
      let source = `${prepend}(?:${state.output})${append}`
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`
      }
      const regex = picomatch.toRegex(source, options)
      if (returnState === true) {
        regex.state = state
      }
      return regex
    }
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== 'string') {
        throw new TypeError('Expected a non-empty string')
      }
      let parsed = { negated: false, fastpaths: true }
      if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
        parsed.output = parse.fastpaths(input, options)
      }
      if (!parsed.output) {
        parsed = parse(input, options)
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState)
    }
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {}
        return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''))
      } catch (err) {
        if (options && options.debug === true) throw err
        return /$^/
      }
    }
    picomatch.constants = constants
    module2.exports = picomatch
  },
})

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  'node_modules/picomatch/index.js'(exports, module2) {
    'use strict'
    module2.exports = require_picomatch()
  },
})

// node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  'node_modules/micromatch/index.js'(exports, module2) {
    'use strict'
    var util = require('util')
    var braces = require_braces()
    var picomatch = require_picomatch2()
    var utils = require_utils3()
    var isEmptyString = (val) => val === '' || val === './'
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns)
      list = [].concat(list)
      let omit = /* @__PURE__ */ new Set()
      let keep = /* @__PURE__ */ new Set()
      let items = /* @__PURE__ */ new Set()
      let negatives = 0
      let onResult = (state) => {
        items.add(state.output)
        if (options && options.onResult) {
          options.onResult(state)
        }
      }
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true)
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob
        if (negated) negatives++
        for (let item of list) {
          let matched = isMatch(item, true)
          let match = negated ? !matched.isMatch : matched.isMatch
          if (!match) continue
          if (negated) {
            omit.add(matched.output)
          } else {
            omit.delete(matched.output)
            keep.add(matched.output)
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep]
      let matches = result.filter((item) => !omit.has(item))
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(', ')}"`)
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, '')) : patterns
        }
      }
      return matches
    }
    micromatch.match = micromatch
    micromatch.matcher = (pattern, options) => picomatch(pattern, options)
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str)
    micromatch.any = micromatch.isMatch
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String)
      let result = /* @__PURE__ */ new Set()
      let items = []
      let onResult = (state) => {
        if (options.onResult) options.onResult(state)
        items.push(state.output)
      }
      let matches = micromatch(list, patterns, { ...options, onResult })
      for (let item of items) {
        if (!matches.includes(item)) {
          result.add(item)
        }
      }
      return [...result]
    }
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options))
      }
      if (typeof pattern === 'string') {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false
        }
        if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
          return true
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true })
    }
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError('Expected the first argument to be an object')
      }
      let keys = micromatch(Object.keys(obj), patterns, options)
      let res = {}
      for (let key of keys) res[key] = obj[key]
      return res
    }
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options)
        if (items.some((item) => isMatch(item))) {
          return true
        }
      }
      return false
    }
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options)
        if (!items.every((item) => isMatch(item))) {
          return false
        }
      }
      return true
    }
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str))
    }
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options)
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true })
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input)
      if (match) {
        return match.slice(1).map((v) => (v === void 0 ? '' : v))
      }
    }
    micromatch.makeRe = (...args) => picomatch.makeRe(...args)
    micromatch.scan = (...args) => picomatch.scan(...args)
    micromatch.parse = (patterns, options) => {
      let res = []
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options))
        }
      }
      return res
    }
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
        return [pattern]
      }
      return braces(pattern, options)
    }
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      return micromatch.braces(pattern, { ...options, expand: true })
    }
    module2.exports = micromatch
  },
})

// node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS({
  'node_modules/fast-glob/out/utils/pattern.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.matchAny =
      exports.convertPatternsToRe =
      exports.makeRe =
      exports.getPatternParts =
      exports.expandBraceExpansion =
      exports.expandPatternsWithBraceExpansion =
      exports.isAffectDepthOfReadingPattern =
      exports.endsWithSlashGlobStar =
      exports.hasGlobStar =
      exports.getBaseDirectory =
      exports.isPatternRelatedToParentDirectory =
      exports.getPatternsOutsideCurrentDirectory =
      exports.getPatternsInsideCurrentDirectory =
      exports.getPositivePatterns =
      exports.getNegativePatterns =
      exports.isPositivePattern =
      exports.isNegativePattern =
      exports.convertToNegativePattern =
      exports.convertToPositivePattern =
      exports.isDynamicPattern =
      exports.isStaticPattern =
        void 0
    var path = require('path')
    var globParent = require_glob_parent()
    var micromatch = require_micromatch()
    var GLOBSTAR = '**'
    var ESCAPE_SYMBOL = '\\'
    var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/
    var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/
    var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/
    var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/
    var BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./
    function isStaticPattern(pattern, options = {}) {
      return !isDynamicPattern(pattern, options)
    }
    exports.isStaticPattern = isStaticPattern
    function isDynamicPattern(pattern, options = {}) {
      if (pattern === '') {
        return false
      }
      if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true
      }
      if (
        COMMON_GLOB_SYMBOLS_RE.test(pattern) ||
        REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) ||
        REGEX_GROUP_SYMBOLS_RE.test(pattern)
      ) {
        return true
      }
      if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true
      }
      if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
        return true
      }
      return false
    }
    exports.isDynamicPattern = isDynamicPattern
    function hasBraceExpansion(pattern) {
      const openingBraceIndex = pattern.indexOf('{')
      if (openingBraceIndex === -1) {
        return false
      }
      const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1)
      if (closingBraceIndex === -1) {
        return false
      }
      const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex)
      return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent)
    }
    function convertToPositivePattern(pattern) {
      return isNegativePattern(pattern) ? pattern.slice(1) : pattern
    }
    exports.convertToPositivePattern = convertToPositivePattern
    function convertToNegativePattern(pattern) {
      return '!' + pattern
    }
    exports.convertToNegativePattern = convertToNegativePattern
    function isNegativePattern(pattern) {
      return pattern.startsWith('!') && pattern[1] !== '('
    }
    exports.isNegativePattern = isNegativePattern
    function isPositivePattern(pattern) {
      return !isNegativePattern(pattern)
    }
    exports.isPositivePattern = isPositivePattern
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern)
    }
    exports.getNegativePatterns = getNegativePatterns
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern))
    }
    exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory)
    }
    exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith('..') || pattern.startsWith('./..')
    }
    exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: false })
    }
    exports.getBaseDirectory = getBaseDirectory
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR)
    }
    exports.hasGlobStar = hasGlobStar
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith('/' + GLOBSTAR)
    }
    exports.endsWithSlashGlobStar = endsWithSlashGlobStar
    function isAffectDepthOfReadingPattern(pattern) {
      const basename2 = path.basename(pattern)
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename2)
    }
    exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern))
      }, [])
    }
    exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion
    function expandBraceExpansion(pattern) {
      return micromatch.braces(pattern, {
        expand: true,
        nodupes: true,
      })
    }
    exports.expandBraceExpansion = expandBraceExpansion
    function getPatternParts(pattern, options) {
      let { parts } = micromatch.scan(
        pattern,
        Object.assign(Object.assign({}, options), { parts: true })
      )
      if (parts.length === 0) {
        parts = [pattern]
      }
      if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1)
        parts.unshift('')
      }
      return parts
    }
    exports.getPatternParts = getPatternParts
    function makeRe(pattern, options) {
      return micromatch.makeRe(pattern, options)
    }
    exports.makeRe = makeRe
    function convertPatternsToRe(patterns, options) {
      return patterns.map((pattern) => makeRe(pattern, options))
    }
    exports.convertPatternsToRe = convertPatternsToRe
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry))
    }
    exports.matchAny = matchAny
  },
})

// node_modules/merge2/index.js
var require_merge2 = __commonJS({
  'node_modules/merge2/index.js'(exports, module2) {
    'use strict'
    var Stream = require('stream')
    var PassThrough = Stream.PassThrough
    var slice = Array.prototype.slice
    module2.exports = merge2
    function merge2() {
      const streamsQueue = []
      const args = slice.call(arguments)
      let merging = false
      let options = args[args.length - 1]
      if (options && !Array.isArray(options) && options.pipe == null) {
        args.pop()
      } else {
        options = {}
      }
      const doEnd = options.end !== false
      const doPipeError = options.pipeError === true
      if (options.objectMode == null) {
        options.objectMode = true
      }
      if (options.highWaterMark == null) {
        options.highWaterMark = 64 * 1024
      }
      const mergedStream = PassThrough(options)
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++) {
          streamsQueue.push(pauseStreams(arguments[i], options))
        }
        mergeStream()
        return this
      }
      function mergeStream() {
        if (merging) {
          return
        }
        merging = true
        let streams = streamsQueue.shift()
        if (!streams) {
          process.nextTick(endStream)
          return
        }
        if (!Array.isArray(streams)) {
          streams = [streams]
        }
        let pipesCount = streams.length + 1
        function next() {
          if (--pipesCount > 0) {
            return
          }
          merging = false
          mergeStream()
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener('merge2UnpipeEnd', onend)
            stream.removeListener('end', onend)
            if (doPipeError) {
              stream.removeListener('error', onerror)
            }
            next()
          }
          function onerror(err) {
            mergedStream.emit('error', err)
          }
          if (stream._readableState.endEmitted) {
            return next()
          }
          stream.on('merge2UnpipeEnd', onend)
          stream.on('end', onend)
          if (doPipeError) {
            stream.on('error', onerror)
          }
          stream.pipe(mergedStream, { end: false })
          stream.resume()
        }
        for (let i = 0; i < streams.length; i++) {
          pipe(streams[i])
        }
        next()
      }
      function endStream() {
        merging = false
        mergedStream.emit('queueDrain')
        if (doEnd) {
          mergedStream.end()
        }
      }
      mergedStream.setMaxListeners(0)
      mergedStream.add = addStream
      mergedStream.on('unpipe', function (stream) {
        stream.emit('merge2UnpipeEnd')
      })
      if (args.length) {
        addStream.apply(null, args)
      }
      return mergedStream
    }
    function pauseStreams(streams, options) {
      if (!Array.isArray(streams)) {
        if (!streams._readableState && streams.pipe) {
          streams = streams.pipe(PassThrough(options))
        }
        if (!streams._readableState || !streams.pause || !streams.pipe) {
          throw new Error('Only readable stream can be merged.')
        }
        streams.pause()
      } else {
        for (let i = 0, len = streams.length; i < len; i++) {
          streams[i] = pauseStreams(streams[i], options)
        }
      }
      return streams
    }
  },
})

// node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS({
  'node_modules/fast-glob/out/utils/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.merge = void 0
    var merge2 = require_merge2()
    function merge(streams) {
      const mergedStream = merge2(streams)
      streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error))
      })
      mergedStream.once('close', () => propagateCloseEventToSources(streams))
      mergedStream.once('end', () => propagateCloseEventToSources(streams))
      return mergedStream
    }
    exports.merge = merge
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit('close'))
    }
  },
})

// node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS({
  'node_modules/fast-glob/out/utils/string.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEmpty = exports.isString = void 0
    function isString(input) {
      return typeof input === 'string'
    }
    exports.isString = isString
    function isEmpty(input) {
      return input === ''
    }
    exports.isEmpty = isEmpty
  },
})

// node_modules/fast-glob/out/utils/index.js
var require_utils4 = __commonJS({
  'node_modules/fast-glob/out/utils/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.string =
      exports.stream =
      exports.pattern =
      exports.path =
      exports.fs =
      exports.errno =
      exports.array =
        void 0
    var array = require_array()
    exports.array = array
    var errno = require_errno()
    exports.errno = errno
    var fs3 = require_fs()
    exports.fs = fs3
    var path = require_path()
    exports.path = path
    var pattern = require_pattern()
    exports.pattern = pattern
    var stream = require_stream()
    exports.stream = stream
    var string = require_string()
    exports.string = string
  },
})

// node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS({
  'node_modules/fast-glob/out/managers/tasks.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.convertPatternGroupToTask =
      exports.convertPatternGroupsToTasks =
      exports.groupPatternsByBaseDirectory =
      exports.getNegativePatternsAsPositive =
      exports.getPositivePatterns =
      exports.convertPatternsToTasks =
      exports.generate =
        void 0
    var utils = require_utils4()
    function generate(patterns, settings) {
      const positivePatterns = getPositivePatterns(patterns)
      const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore)
      const staticPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isStaticPattern(pattern, settings)
      )
      const dynamicPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isDynamicPattern(pattern, settings)
      )
      const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false)
      const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true)
      return staticTasks.concat(dynamicTasks)
    }
    exports.generate = generate
    function convertPatternsToTasks(positive, negative, dynamic) {
      const tasks = []
      const patternsOutsideCurrentDirectory =
        utils.pattern.getPatternsOutsideCurrentDirectory(positive)
      const patternsInsideCurrentDirectory =
        utils.pattern.getPatternsInsideCurrentDirectory(positive)
      const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsOutsideCurrentDirectory
      )
      const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsInsideCurrentDirectory
      )
      tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic))
      if ('.' in insideCurrentDirectoryGroup) {
        tasks.push(
          convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic)
        )
      } else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic))
      }
      return tasks
    }
    exports.convertPatternsToTasks = convertPatternsToTasks
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getNegativePatternsAsPositive(patterns, ignore) {
      const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore)
      const positive = negative.map(utils.pattern.convertToPositivePattern)
      return positive
    }
    exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive
    function groupPatternsByBaseDirectory(patterns) {
      const group = {}
      return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern)
        if (base in collection) {
          collection[base].push(pattern)
        } else {
          collection[base] = [pattern]
        }
        return collection
      }, group)
    }
    exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic)
      })
    }
    exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern)),
      }
    }
    exports.convertPatternGroupToTask = convertPatternGroupToTask
  },
})

// node_modules/fast-glob/out/managers/patterns.js
var require_patterns = __commonJS({
  'node_modules/fast-glob/out/managers/patterns.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.removeDuplicateSlashes = exports.transform = void 0
    var DOUBLE_SLASH_RE = /(?!^)\/{2,}/g
    function transform(patterns) {
      return patterns.map((pattern) => removeDuplicateSlashes(pattern))
    }
    exports.transform = transform
    function removeDuplicateSlashes(pattern) {
      return pattern.replace(DOUBLE_SLASH_RE, '/')
    }
    exports.removeDuplicateSlashes = removeDuplicateSlashes
  },
})

// node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS({
  'node_modules/@nodelib/fs.stat/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path, settings, callback) {
      settings.fs.lstat(path, (lstatError, lstat2) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError)
          return
        }
        if (!lstat2.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat2)
          return
        }
        settings.fs.stat(path, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError)
              return
            }
            callSuccessCallback(callback, lstat2)
            return
          }
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true
          }
          callSuccessCallback(callback, stat)
        })
      })
    }
    exports.read = read
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS({
  'node_modules/@nodelib/fs.stat/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path, settings) {
      const lstat2 = settings.fs.lstatSync(path)
      if (!lstat2.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat2
      }
      try {
        const stat = settings.fs.statSync(path)
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true
        }
        return stat
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
          return lstat2
        }
        throw error
      }
    }
    exports.read = read
  },
})

// node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS({
  'node_modules/@nodelib/fs.stat/out/adapters/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs3 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs3.lstat,
      stat: fs3.stat,
      lstatSync: fs3.lstatSync,
      statSync: fs3.statSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods)
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS({
  'node_modules/@nodelib/fs.stat/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fs3 = require_fs2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true)
        this.fs = fs3.createFileSystemAdapter(this._options.fs)
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true
        )
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS({
  'node_modules/@nodelib/fs.stat/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.statSync = exports.stat = exports.Settings = void 0
    var async = require_async()
    var sync = require_sync()
    var settings_1 = require_settings()
    exports.Settings = settings_1.default
    function stat(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.stat = stat
    function statSync(path, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path, settings)
    }
    exports.statSync = statSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  'node_modules/queue-microtask/index.js'(exports, module2) {
    var promise
    module2.exports =
      typeof queueMicrotask === 'function'
        ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
        : (cb) =>
            (promise || (promise = Promise.resolve())).then(cb).catch((err) =>
              setTimeout(() => {
                throw err
              }, 0)
            )
  },
})

// node_modules/run-parallel/index.js
var require_run_parallel = __commonJS({
  'node_modules/run-parallel/index.js'(exports, module2) {
    module2.exports = runParallel
    var queueMicrotask2 = require_queue_microtask()
    function runParallel(tasks, cb) {
      let results, pending, keys
      let isSync = true
      if (Array.isArray(tasks)) {
        results = []
        pending = tasks.length
      } else {
        keys = Object.keys(tasks)
        results = {}
        pending = keys.length
      }
      function done(err) {
        function end() {
          if (cb) cb(err, results)
          cb = null
        }
        if (isSync) queueMicrotask2(end)
        else end()
      }
      function each(i, err, result) {
        results[i] = result
        if (--pending === 0 || err) {
          done(err)
        }
      }
      if (!pending) {
        done(null)
      } else if (keys) {
        keys.forEach(function (key) {
          tasks[key](function (err, result) {
            each(key, err, result)
          })
        })
      } else {
        tasks.forEach(function (task, i) {
          task(function (err, result) {
            each(i, err, result)
          })
        })
      }
      isSync = false
    }
  },
})

// node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/constants.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.')
    if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
      throw new Error(
        `Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`
      )
    }
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10)
    var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10)
    var SUPPORTED_MAJOR_VERSION = 10
    var SUPPORTED_MINOR_VERSION = 10
    var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION
    var IS_MATCHED_BY_MAJOR_AND_MINOR =
      MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES =
      IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR
  },
})

// node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/utils/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils5 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/utils/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.fs = void 0
    var fs3 = require_fs3()
    exports.fs = fs3
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/common.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments = void 0
    function joinPathSegments(a, b, separator) {
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var rpl = require_run_parallel()
    var constants_1 = require_constants3()
    var utils = require_utils5()
    var common = require_common()
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback)
        return
      }
      readdir(directory, settings, callback)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError)
          return
        }
        const entries = dirents.map((dirent) => ({
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
        }))
        if (!settings.followSymbolicLinks) {
          callSuccessCallback(callback, entries)
          return
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings))
        rpl(tasks, (rplError, rplEntries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError)
            return
          }
          callSuccessCallback(callback, rplEntries)
        })
      })
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry)
          return
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError)
              return
            }
            done(null, entry)
            return
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          done(null, entry)
        })
      }
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError)
          return
        }
        const tasks = names.map((name) => {
          const path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator)
          return (done) => {
            fsStat.stat(path, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error)
                return
              }
              const entry = {
                name,
                path,
                dirent: utils.fs.createDirentFromStats(name, stats),
              }
              if (settings.stats) {
                entry.stats = stats
              }
              done(null, entry)
            })
          }
        })
        rpl(tasks, (rplError, entries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError)
            return
          }
          callSuccessCallback(callback, entries)
        })
      })
    }
    exports.readdir = readdir
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var constants_1 = require_constants3()
    var utils = require_utils5()
    var common = require_common()
    function read(directory, settings) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings)
      }
      return readdir(directory, settings)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings) {
      const dirents = settings.fs.readdirSync(directory, { withFileTypes: true })
      return dirents.map((dirent) => {
        const entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
        }
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
          try {
            const stats = settings.fs.statSync(entry.path)
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              throw error
            }
          }
        }
        return entry
      })
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function readdir(directory, settings) {
      const names = settings.fs.readdirSync(directory)
      return names.map((name) => {
        const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator)
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings)
        const entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats),
        }
        if (settings.stats) {
          entry.stats = stats
        }
        return entry
      })
    }
    exports.readdir = readdir
  },
})

// node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/adapters/fs.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs3 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs3.lstat,
      stat: fs3.stat,
      lstatSync: fs3.lstatSync,
      statSync: fs3.statSync,
      readdir: fs3.readdir,
      readdirSync: fs3.readdirSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods)
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsStat = require_out()
    var fs3 = require_fs4()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false)
        this.fs = fs3.createFileSystemAdapter(this._options.fs)
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep)
        this.stats = this._getValue(this._options.stats, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true
        )
        this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS({
  'node_modules/@nodelib/fs.scandir/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings = exports.scandirSync = exports.scandir = void 0
    var async = require_async2()
    var sync = require_sync2()
    var settings_1 = require_settings2()
    exports.Settings = settings_1.default
    function scandir(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.scandir = scandir
    function scandirSync(path, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path, settings)
    }
    exports.scandirSync = scandirSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  'node_modules/reusify/reusify.js'(exports, module2) {
    'use strict'
    function reusify(Constructor) {
      var head = new Constructor()
      var tail = head
      function get() {
        var current = head
        if (current.next) {
          head = current.next
        } else {
          head = new Constructor()
          tail = head
        }
        current.next = null
        return current
      }
      function release(obj) {
        tail.next = obj
        tail = obj
      }
      return {
        get,
        release,
      }
    }
    module2.exports = reusify
  },
})

// node_modules/fastq/queue.js
var require_queue = __commonJS({
  'node_modules/fastq/queue.js'(exports, module2) {
    'use strict'
    var reusify = require_reusify()
    function fastqueue(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      if (concurrency < 1) {
        throw new Error('fastqueue concurrency must be greater than 1')
      }
      var cache = reusify(Task)
      var queueHead = null
      var queueTail = null
      var _running = 0
      var errorHandler = null
      var self = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: false,
        concurrency,
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error,
      }
      return self
      function running() {
        return _running
      }
      function pause() {
        self.paused = true
      }
      function length() {
        var current = queueHead
        var counter = 0
        while (current) {
          current = current.next
          counter++
        }
        return counter
      }
      function getQueue() {
        var current = queueHead
        var tasks = []
        while (current) {
          tasks.push(current.value)
          current = current.next
        }
        return tasks
      }
      function resume() {
        if (!self.paused) return
        self.paused = false
        for (var i = 0; i < self.concurrency; i++) {
          _running++
          release()
        }
      }
      function idle() {
        return _running === 0 && self.length() === 0
      }
      function push(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        current.errorHandler = errorHandler
        if (_running === self.concurrency || self.paused) {
          if (queueTail) {
            queueTail.next = current
            queueTail = current
          } else {
            queueHead = current
            queueTail = current
            self.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function unshift(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        if (_running === self.concurrency || self.paused) {
          if (queueHead) {
            current.next = queueHead
            queueHead = current
          } else {
            queueHead = current
            queueTail = current
            self.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder)
        }
        var next = queueHead
        if (next) {
          if (!self.paused) {
            if (queueTail === queueHead) {
              queueTail = null
            }
            queueHead = next.next
            next.next = null
            worker.call(context, next.value, next.worked)
            if (queueTail === null) {
              self.empty()
            }
          } else {
            _running--
          }
        } else if (--_running === 0) {
          self.drain()
        }
      }
      function kill() {
        queueHead = null
        queueTail = null
        self.drain = noop
      }
      function killAndDrain() {
        queueHead = null
        queueTail = null
        self.drain()
        self.drain = noop
      }
      function error(handler) {
        errorHandler = handler
      }
    }
    function noop() {}
    function Task() {
      this.value = null
      this.callback = noop
      this.next = null
      this.release = noop
      this.context = null
      this.errorHandler = null
      var self = this
      this.worked = function worked(err, result) {
        var callback = self.callback
        var errorHandler = self.errorHandler
        var val = self.value
        self.value = null
        self.callback = noop
        if (self.errorHandler) {
          errorHandler(err, val)
        }
        callback.call(self.context, err, result)
        self.release(self)
      }
    }
    function queueAsPromised(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function (res) {
          cb(null, res)
        }, cb)
      }
      var queue = fastqueue(context, asyncWrapper, concurrency)
      var pushCb = queue.push
      var unshiftCb = queue.unshift
      queue.push = push
      queue.unshift = unshift
      queue.drained = drained
      return queue
      function push(value) {
        var p = new Promise(function (resolve, reject) {
          pushCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function unshift(value) {
        var p = new Promise(function (resolve, reject) {
          unshiftCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function drained() {
        var previousDrain = queue.drain
        var p = new Promise(function (resolve) {
          queue.drain = function () {
            previousDrain()
            resolve()
          }
        })
        return p
      }
    }
    module2.exports = fastqueue
    module2.exports.promise = queueAsPromised
  },
})

// node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/common.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments =
      exports.replacePathSegmentSeparator =
      exports.isAppliedFilter =
      exports.isFatalError =
        void 0
    function isFatalError(settings, error) {
      if (settings.errorFilter === null) {
        return true
      }
      return !settings.errorFilter(error)
    }
    exports.isFatalError = isFatalError
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value)
    }
    exports.isAppliedFilter = isAppliedFilter
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator)
    }
    exports.replacePathSegmentSeparator = replacePathSegmentSeparator
    function joinPathSegments(a, b, separator) {
      if (a === '') {
        return b
      }
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/reader.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var common = require_common2()
    var Reader = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator)
      }
    }
    exports.default = Reader
  },
})

// node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var events_1 = require('events')
    var fsScandir = require_out2()
    var fastq = require_queue()
    var common = require_common2()
    var reader_1 = require_reader()
    var AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings)
        this._settings = _settings
        this._scandir = fsScandir.scandir
        this._emitter = new events_1.EventEmitter()
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency)
        this._isFatalError = false
        this._isDestroyed = false
        this._queue.drain = () => {
          if (!this._isFatalError) {
            this._emitter.emit('end')
          }
        }
      }
      read() {
        this._isFatalError = false
        this._isDestroyed = false
        setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath)
        })
        return this._emitter
      }
      get isDestroyed() {
        return this._isDestroyed
      }
      destroy() {
        if (this._isDestroyed) {
          throw new Error('The reader is already destroyed')
        }
        this._isDestroyed = true
        this._queue.killAndDrain()
      }
      onEntry(callback) {
        this._emitter.on('entry', callback)
      }
      onError(callback) {
        this._emitter.once('error', callback)
      }
      onEnd(callback) {
        this._emitter.once('end', callback)
      }
      _pushToQueue(directory, base) {
        const queueItem = { directory, base }
        this._queue.push(queueItem, (error) => {
          if (error !== null) {
            this._handleError(error)
          }
        })
      }
      _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
          if (error !== null) {
            done(error, void 0)
            return
          }
          for (const entry of entries) {
            this._handleEntry(entry, item.base)
          }
          done(null, void 0)
        })
      }
      _handleError(error) {
        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
          return
        }
        this._isFatalError = true
        this._isDestroyed = true
        this._emitter.emit('error', error)
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
          return
        }
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._emitEntry(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _emitEntry(entry) {
        this._emitter.emit('entry', entry)
      }
    }
    exports.default = AsyncReader
  },
})

// node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var async_1 = require_async3()
    var AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._storage = []
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error)
        })
        this._reader.onEntry((entry) => {
          this._storage.push(entry)
        })
        this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage)
        })
        this._reader.read()
      }
    }
    exports.default = AsyncProvider
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, entries) {
      callback(null, entries)
    }
  },
})

// node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var async_1 = require_async3()
    var StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._stream = new stream_1.Readable({
          objectMode: true,
          read: () => {},
          destroy: () => {
            if (!this._reader.isDestroyed) {
              this._reader.destroy()
            }
          },
        })
      }
      read() {
        this._reader.onError((error) => {
          this._stream.emit('error', error)
        })
        this._reader.onEntry((entry) => {
          this._stream.push(entry)
        })
        this._reader.onEnd(() => {
          this._stream.push(null)
        })
        this._reader.read()
        return this._stream
      }
    }
    exports.default = StreamProvider
  },
})

// node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/readers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsScandir = require_out2()
    var common = require_common2()
    var reader_1 = require_reader()
    var SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._scandir = fsScandir.scandirSync
        this._storage = []
        this._queue = /* @__PURE__ */ new Set()
      }
      read() {
        this._pushToQueue(this._root, this._settings.basePath)
        this._handleQueue()
        return this._storage
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base })
      }
      _handleQueue() {
        for (const item of this._queue.values()) {
          this._handleDirectory(item.directory, item.base)
        }
      }
      _handleDirectory(directory, base) {
        try {
          const entries = this._scandir(directory, this._settings.fsScandirSettings)
          for (const entry of entries) {
            this._handleEntry(entry, base)
          }
        } catch (error) {
          this._handleError(error)
        }
      }
      _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
          return
        }
        throw error
      }
      _handleEntry(entry, base) {
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._pushToStorage(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _pushToStorage(entry) {
        this._storage.push(entry)
      }
    }
    exports.default = SyncReader
  },
})

// node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync3()
    var SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new sync_1.default(this._root, this._settings)
      }
      read() {
        return this._reader.read()
      }
    }
    exports.default = SyncProvider
  },
})

// node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsScandir = require_out2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.basePath = this._getValue(this._options.basePath, void 0)
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY)
        this.deepFilter = this._getValue(this._options.deepFilter, null)
        this.entryFilter = this._getValue(this._options.entryFilter, null)
        this.errorFilter = this._getValue(this._options.errorFilter, null)
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep)
        this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS({
  'node_modules/@nodelib/fs.walk/out/index.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0
    var async_1 = require_async4()
    var stream_1 = require_stream2()
    var sync_1 = require_sync4()
    var settings_1 = require_settings3()
    exports.Settings = settings_1.default
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback)
        return
      }
      new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback)
    }
    exports.walk = walk
    function walkSync(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new sync_1.default(directory, settings)
      return provider.read()
    }
    exports.walkSync = walkSync
    function walkStream(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new stream_1.default(directory, settings)
      return provider.read()
    }
    exports.walkStream = walkStream
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS({
  'node_modules/fast-glob/out/readers/reader.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var fsStat = require_out()
    var utils = require_utils4()
    var Reader = class {
      constructor(_settings) {
        this._settings = _settings
        this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks,
        })
      }
      _getFullEntryPath(filepath) {
        return path.resolve(this._settings.cwd, filepath)
      }
      _makeEntry(stats, pattern) {
        const entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats),
        }
        if (this._settings.stats) {
          entry.stats = stats
        }
        return entry
      }
      _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors
      }
    }
    exports.default = Reader
  },
})

// node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS({
  'node_modules/fast-glob/out/readers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkStream = fsWalk.walkStream
        this._stat = fsStat.stat
      }
      dynamic(root, options) {
        return this._walkStream(root, options)
      }
      static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this)
        const stream = new stream_1.PassThrough({ objectMode: true })
        stream._write = (index, _enc, done) => {
          return this._getEntry(filepaths[index], patterns[index], options)
            .then((entry) => {
              if (entry !== null && options.entryFilter(entry)) {
                stream.push(entry)
              }
              if (index === filepaths.length - 1) {
                stream.end()
              }
              done()
            })
            .catch(done)
        }
        for (let i = 0; i < filepaths.length; i++) {
          stream.write(i)
        }
        return stream
      }
      _getEntry(filepath, pattern, options) {
        return this._getStat(filepath)
          .then((stats) => this._makeEntry(stats, pattern))
          .catch((error) => {
            if (options.errorFilter(error)) {
              return null
            }
            throw error
          })
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => {
            return error === null ? resolve(stats) : reject(error)
          })
        })
      }
    }
    exports.default = ReaderStream
  },
})

// node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS({
  'node_modules/fast-glob/out/providers/matchers/matcher.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils4()
    var Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this._storage = []
        this._fillStorage()
      }
      _fillStorage() {
        const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns)
        for (const pattern of patterns) {
          const segments = this._getPatternSegments(pattern)
          const sections = this._splitSegmentsIntoSections(segments)
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections,
          })
        }
      }
      _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions)
        return parts.map((part) => {
          const dynamic = utils.pattern.isDynamicPattern(part, this._settings)
          if (!dynamic) {
            return {
              dynamic: false,
              pattern: part,
            }
          }
          return {
            dynamic: true,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions),
          }
        })
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(
          segments,
          (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern)
        )
      }
    }
    exports.default = Matcher
  },
})

// node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS({
  'node_modules/fast-glob/out/providers/matchers/partial.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var matcher_1 = require_matcher()
    var PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        const parts = filepath.split('/')
        const levels = parts.length
        const patterns = this._storage.filter(
          (info) => !info.complete || info.segments.length > levels
        )
        for (const pattern of patterns) {
          const section = pattern.sections[0]
          if (!pattern.complete && levels > section.length) {
            return true
          }
          const match = parts.every((part, index) => {
            const segment = pattern.segments[index]
            if (segment.dynamic && segment.patternRe.test(part)) {
              return true
            }
            if (!segment.dynamic && segment.pattern === part) {
              return true
            }
            return false
          })
          if (match) {
            return true
          }
        }
        return false
      }
    }
    exports.default = PartialMatcher
  },
})

// node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS({
  'node_modules/fast-glob/out/providers/filters/deep.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils4()
    var partial_1 = require_partial()
    var DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
      }
      getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive)
        const negativeRe = this._getNegativePatternsRe(negative)
        return (entry) => this._filter(basePath, entry, matcher, negativeRe)
      }
      _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions)
      }
      _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(
          utils.pattern.isAffectDepthOfReadingPattern
        )
        return utils.pattern.convertPatternsToRe(
          affectDepthOfReadingPatterns,
          this._micromatchOptions
        )
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
          return false
        }
        if (this._isSkippedSymbolicLink(entry)) {
          return false
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path)
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
          return false
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe)
      }
      _isSkippedByDeep(basePath, entryPath) {
        if (this._settings.deep === Infinity) {
          return false
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep
      }
      _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length
        if (basePath === '') {
          return entryPathDepth
        }
        const basePathDepth = basePath.split('/').length
        return entryPathDepth - basePathDepth
      }
      _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink()
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath)
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe)
      }
    }
    exports.default = DeepFilter
  },
})

// node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS({
  'node_modules/fast-glob/out/providers/filters/entry.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils4()
    var EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this.index = /* @__PURE__ */ new Map()
      }
      getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions)
        const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions)
        return (entry) => this._filter(entry, positiveRe, negativeRe)
      }
      _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
          return false
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
          return false
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
          return false
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path
        const isMatched =
          this._isMatchToPatterns(filepath, positiveRe) &&
          !this._isMatchToPatterns(entry.path, negativeRe)
        if (this._settings.unique && isMatched) {
          this._createIndexRecord(entry)
        }
        return isMatched
      }
      _isDuplicateEntry(entry) {
        return this.index.has(entry.path)
      }
      _createIndexRecord(entry) {
        this.index.set(entry.path, void 0)
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile()
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory()
      }
      _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
          return false
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath)
        return utils.pattern.matchAny(fullpath, patternsRe)
      }
      _isMatchToPatterns(entryPath, patternsRe) {
        const filepath = utils.path.removeLeadingDotSegment(entryPath)
        return (
          utils.pattern.matchAny(filepath, patternsRe) ||
          utils.pattern.matchAny(filepath + '/', patternsRe)
        )
      }
    }
    exports.default = EntryFilter
  },
})

// node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS({
  'node_modules/fast-glob/out/providers/filters/error.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils4()
    var ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getFilter() {
        return (error) => this._isNonFatalError(error)
      }
      _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors
      }
    }
    exports.default = ErrorFilter
  },
})

// node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS({
  'node_modules/fast-glob/out/providers/transformers/entry.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils4()
    var EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getTransformer() {
        return (entry) => this._transform(entry)
      }
      _transform(entry) {
        let filepath = entry.path
        if (this._settings.absolute) {
          filepath = utils.path.makeAbsolute(this._settings.cwd, filepath)
          filepath = utils.path.unixify(filepath)
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
          filepath += '/'
        }
        if (!this._settings.objectMode) {
          return filepath
        }
        return Object.assign(Object.assign({}, entry), { path: filepath })
      }
    }
    exports.default = EntryTransformer
  },
})

// node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS({
  'node_modules/fast-glob/out/providers/provider.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path = require('path')
    var deep_1 = require_deep()
    var entry_1 = require_entry()
    var error_1 = require_error()
    var entry_2 = require_entry2()
    var Provider = class {
      constructor(_settings) {
        this._settings = _settings
        this.errorFilter = new error_1.default(this._settings)
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions())
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions())
        this.entryTransformer = new entry_2.default(this._settings)
      }
      _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base)
      }
      _getReaderOptions(task) {
        const basePath = task.base === '.' ? '' : task.base
        return {
          basePath,
          pathSegmentSeparator: '/',
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
          entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer(),
        }
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: true,
          strictSlashes: false,
        }
      }
    }
    exports.default = Provider
  },
})

// node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS({
  'node_modules/fast-glob/out/providers/async.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require_stream3()
    var provider_1 = require_provider()
    var ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_1.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const entries = []
        return new Promise((resolve, reject) => {
          const stream = this.api(root, task, options)
          stream.once('error', reject)
          stream.on('data', (entry) => entries.push(options.transform(entry)))
          stream.once('end', () => resolve(entries))
        })
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderAsync
  },
})

// node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS({
  'node_modules/fast-glob/out/providers/stream.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var stream_2 = require_stream3()
    var provider_1 = require_provider()
    var ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_2.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const source = this.api(root, task, options)
        const destination = new stream_1.Readable({ objectMode: true, read: () => {} })
        source
          .once('error', (error) => destination.emit('error', error))
          .on('data', (entry) => destination.emit('data', options.transform(entry)))
          .once('end', () => destination.emit('end'))
        destination.once('close', () => source.destroy())
        return destination
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderStream
  },
})

// node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS({
  'node_modules/fast-glob/out/readers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkSync = fsWalk.walkSync
        this._statSync = fsStat.statSync
      }
      dynamic(root, options) {
        return this._walkSync(root, options)
      }
      static(patterns, options) {
        const entries = []
        for (const pattern of patterns) {
          const filepath = this._getFullEntryPath(pattern)
          const entry = this._getEntry(filepath, pattern, options)
          if (entry === null || !options.entryFilter(entry)) {
            continue
          }
          entries.push(entry)
        }
        return entries
      }
      _getEntry(filepath, pattern, options) {
        try {
          const stats = this._getStat(filepath)
          return this._makeEntry(stats, pattern)
        } catch (error) {
          if (options.errorFilter(error)) {
            return null
          }
          throw error
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings)
      }
    }
    exports.default = ReaderSync
  },
})

// node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS({
  'node_modules/fast-glob/out/providers/sync.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync5()
    var provider_1 = require_provider()
    var ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new sync_1.default(this._settings)
      }
      read(task) {
        const root = this._getRootDirectory(task)
        const options = this._getReaderOptions(task)
        const entries = this.api(root, task, options)
        return entries.map(options.transform)
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options)
        }
        return this._reader.static(task.patterns, options)
      }
    }
    exports.default = ProviderSync
  },
})

// node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS({
  'node_modules/fast-glob/out/settings.js'(exports) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
    var fs3 = require('fs')
    var os3 = require('os')
    var CPU_COUNT = Math.max(os3.cpus().length, 1)
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs3.lstat,
      lstatSync: fs3.lstatSync,
      stat: fs3.stat,
      statSync: fs3.statSync,
      readdir: fs3.readdir,
      readdirSync: fs3.readdirSync,
    }
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.absolute = this._getValue(this._options.absolute, false)
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false)
        this.braceExpansion = this._getValue(this._options.braceExpansion, true)
        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true)
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT)
        this.cwd = this._getValue(this._options.cwd, process.cwd())
        this.deep = this._getValue(this._options.deep, Infinity)
        this.dot = this._getValue(this._options.dot, false)
        this.extglob = this._getValue(this._options.extglob, true)
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true)
        this.fs = this._getFileSystemMethods(this._options.fs)
        this.globstar = this._getValue(this._options.globstar, true)
        this.ignore = this._getValue(this._options.ignore, [])
        this.markDirectories = this._getValue(this._options.markDirectories, false)
        this.objectMode = this._getValue(this._options.objectMode, false)
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false)
        this.onlyFiles = this._getValue(this._options.onlyFiles, true)
        this.stats = this._getValue(this._options.stats, false)
        this.suppressErrors = this._getValue(this._options.suppressErrors, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          false
        )
        this.unique = this._getValue(this._options.unique, true)
        if (this.onlyDirectories) {
          this.onlyFiles = false
        }
        if (this.stats) {
          this.objectMode = true
        }
      }
      _getValue(option, value) {
        return option === void 0 ? value : option
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods)
      }
    }
    exports.default = Settings
  },
})

// node_modules/fast-glob/out/index.js
var require_out4 = __commonJS({
  'node_modules/fast-glob/out/index.js'(exports, module2) {
    'use strict'
    var taskManager = require_tasks()
    var patternManager = require_patterns()
    var async_1 = require_async5()
    var stream_1 = require_stream4()
    var sync_1 = require_sync6()
    var settings_1 = require_settings4()
    var utils = require_utils4()
    async function FastGlob(source, options) {
      assertPatternsInput(source)
      const works = getWorks(source, async_1.default, options)
      const result = await Promise.all(works)
      return utils.array.flatten(result)
    }
    ;(function (FastGlob2) {
      function sync(source, options) {
        assertPatternsInput(source)
        const works = getWorks(source, sync_1.default, options)
        return utils.array.flatten(works)
      }
      FastGlob2.sync = sync
      function stream(source, options) {
        assertPatternsInput(source)
        const works = getWorks(source, stream_1.default, options)
        return utils.stream.merge(works)
      }
      FastGlob2.stream = stream
      function generateTasks(source, options) {
        assertPatternsInput(source)
        const patterns = patternManager.transform([].concat(source))
        const settings = new settings_1.default(options)
        return taskManager.generate(patterns, settings)
      }
      FastGlob2.generateTasks = generateTasks
      function isDynamicPattern(source, options) {
        assertPatternsInput(source)
        const settings = new settings_1.default(options)
        return utils.pattern.isDynamicPattern(source, settings)
      }
      FastGlob2.isDynamicPattern = isDynamicPattern
      function escapePath(source) {
        assertPatternsInput(source)
        return utils.path.escape(source)
      }
      FastGlob2.escapePath = escapePath
    })(FastGlob || (FastGlob = {}))
    function getWorks(source, _Provider, options) {
      const patterns = patternManager.transform([].concat(source))
      const settings = new settings_1.default(options)
      const tasks = taskManager.generate(patterns, settings)
      const provider = new _Provider(settings)
      return tasks.map(provider.read, provider)
    }
    function assertPatternsInput(input) {
      const source = [].concat(input)
      const isValidSource = source.every(
        (item) => utils.string.isString(item) && !utils.string.isEmpty(item)
      )
      if (!isValidSource) {
        throw new TypeError('Patterns must be a string (non empty) or an array of strings')
      }
    }
    module2.exports = FastGlob
  },
})

// node_modules/adm-zip/util/fileSystem.js
var require_fileSystem = __commonJS({
  'node_modules/adm-zip/util/fileSystem.js'(exports) {
    exports.require = function () {
      if (typeof process === 'object' && process.versions && process.versions['electron']) {
        try {
          const originalFs = require('original-fs')
          if (Object.keys(originalFs).length > 0) {
            return originalFs
          }
        } catch (e) {}
      }
      return require('fs')
    }
  },
})

// node_modules/adm-zip/util/constants.js
var require_constants4 = __commonJS({
  'node_modules/adm-zip/util/constants.js'(exports, module2) {
    module2.exports = {
      LOCHDR: 30,
      LOCSIG: 67324752,
      LOCVER: 4,
      LOCFLG: 6,
      LOCHOW: 8,
      LOCTIM: 10,
      LOCCRC: 14,
      LOCSIZ: 18,
      LOCLEN: 22,
      LOCNAM: 26,
      LOCEXT: 28,
      EXTSIG: 134695760,
      EXTHDR: 16,
      EXTCRC: 4,
      EXTSIZ: 8,
      EXTLEN: 12,
      CENHDR: 46,
      CENSIG: 33639248,
      CENVEM: 4,
      CENVER: 6,
      CENFLG: 8,
      CENHOW: 10,
      CENTIM: 12,
      CENCRC: 16,
      CENSIZ: 20,
      CENLEN: 24,
      CENNAM: 28,
      CENEXT: 30,
      CENCOM: 32,
      CENDSK: 34,
      CENATT: 36,
      CENATX: 38,
      CENOFF: 42,
      ENDHDR: 22,
      ENDSIG: 101010256,
      ENDSUB: 8,
      ENDTOT: 10,
      ENDSIZ: 12,
      ENDOFF: 16,
      ENDCOM: 20,
      END64HDR: 20,
      END64SIG: 117853008,
      END64START: 4,
      END64OFF: 8,
      END64NUMDISKS: 16,
      ZIP64SIG: 101075792,
      ZIP64HDR: 56,
      ZIP64LEAD: 12,
      ZIP64SIZE: 4,
      ZIP64VEM: 12,
      ZIP64VER: 14,
      ZIP64DSK: 16,
      ZIP64DSKDIR: 20,
      ZIP64SUB: 24,
      ZIP64TOT: 32,
      ZIP64SIZB: 40,
      ZIP64OFF: 48,
      ZIP64EXTRA: 56,
      STORED: 0,
      SHRUNK: 1,
      REDUCED1: 2,
      REDUCED2: 3,
      REDUCED3: 4,
      REDUCED4: 5,
      IMPLODED: 6,
      DEFLATED: 8,
      ENHANCED_DEFLATED: 9,
      PKWARE: 10,
      BZIP2: 12,
      LZMA: 14,
      IBM_TERSE: 18,
      IBM_LZ77: 19,
      AES_ENCRYPT: 99,
      FLG_ENC: 1,
      FLG_COMP1: 2,
      FLG_COMP2: 4,
      FLG_DESC: 8,
      FLG_ENH: 16,
      FLG_PATCH: 32,
      FLG_STR: 64,
      FLG_EFS: 2048,
      FLG_MSK: 4096,
      FILE: 2,
      BUFFER: 1,
      NONE: 0,
      EF_ID: 0,
      EF_SIZE: 2,
      ID_ZIP64: 1,
      ID_AVINFO: 7,
      ID_PFS: 8,
      ID_OS2: 9,
      ID_NTFS: 10,
      ID_OPENVMS: 12,
      ID_UNIX: 13,
      ID_FORK: 14,
      ID_PATCH: 15,
      ID_X509_PKCS7: 20,
      ID_X509_CERTID_F: 21,
      ID_X509_CERTID_C: 22,
      ID_STRONGENC: 23,
      ID_RECORD_MGT: 24,
      ID_X509_PKCS7_RL: 25,
      ID_IBM1: 101,
      ID_IBM2: 102,
      ID_POSZIP: 18064,
      EF_ZIP64_OR_32: 4294967295,
      EF_ZIP64_OR_16: 65535,
      EF_ZIP64_SUNCOMP: 0,
      EF_ZIP64_SCOMP: 8,
      EF_ZIP64_RHO: 16,
      EF_ZIP64_DSN: 24,
    }
  },
})

// node_modules/adm-zip/util/utils.js
var require_utils6 = __commonJS({
  'node_modules/adm-zip/util/utils.js'(exports, module2) {
    var fsystem = require_fileSystem().require()
    var pth = require('path')
    var Constants = require_constants4()
    var isWin = typeof process === 'object' && process.platform === 'win32'
    var is_Obj = (obj) => obj && typeof obj === 'object'
    var crcTable = new Uint32Array(256).map((t, c) => {
      for (let k = 0; k < 8; k++) {
        if ((c & 1) !== 0) {
          c = 3988292384 ^ (c >>> 1)
        } else {
          c >>>= 1
        }
      }
      return c >>> 0
    })
    function Utils(opts) {
      this.sep = pth.sep
      this.fs = fsystem
      if (is_Obj(opts)) {
        if (is_Obj(opts.fs) && typeof opts.fs.statSync === 'function') {
          this.fs = opts.fs
        }
      }
    }
    module2.exports = Utils
    Utils.prototype.makeDir = function (folder) {
      const self = this
      function mkdirSync(fpath) {
        let resolvedPath = fpath.split(self.sep)[0]
        fpath.split(self.sep).forEach(function (name) {
          if (!name || name.substr(-1, 1) === ':') return
          resolvedPath += self.sep + name
          var stat
          try {
            stat = self.fs.statSync(resolvedPath)
          } catch (e) {
            self.fs.mkdirSync(resolvedPath)
          }
          if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY.replace('%s', resolvedPath)
        })
      }
      mkdirSync(folder)
    }
    Utils.prototype.writeFileTo = function (path, content, overwrite, attr) {
      const self = this
      if (self.fs.existsSync(path)) {
        if (!overwrite) return false
        var stat = self.fs.statSync(path)
        if (stat.isDirectory()) {
          return false
        }
      }
      var folder = pth.dirname(path)
      if (!self.fs.existsSync(folder)) {
        self.makeDir(folder)
      }
      var fd
      try {
        fd = self.fs.openSync(path, 'w', 438)
      } catch (e) {
        self.fs.chmodSync(path, 438)
        fd = self.fs.openSync(path, 'w', 438)
      }
      if (fd) {
        try {
          self.fs.writeSync(fd, content, 0, content.length, 0)
        } finally {
          self.fs.closeSync(fd)
        }
      }
      self.fs.chmodSync(path, attr || 438)
      return true
    }
    Utils.prototype.writeFileToAsync = function (path, content, overwrite, attr, callback) {
      if (typeof attr === 'function') {
        callback = attr
        attr = void 0
      }
      const self = this
      self.fs.exists(path, function (exist) {
        if (exist && !overwrite) return callback(false)
        self.fs.stat(path, function (err, stat) {
          if (exist && stat.isDirectory()) {
            return callback(false)
          }
          var folder = pth.dirname(path)
          self.fs.exists(folder, function (exists) {
            if (!exists) self.makeDir(folder)
            self.fs.open(path, 'w', 438, function (err2, fd) {
              if (err2) {
                self.fs.chmod(path, 438, function () {
                  self.fs.open(path, 'w', 438, function (err3, fd2) {
                    self.fs.write(fd2, content, 0, content.length, 0, function () {
                      self.fs.close(fd2, function () {
                        self.fs.chmod(path, attr || 438, function () {
                          callback(true)
                        })
                      })
                    })
                  })
                })
              } else if (fd) {
                self.fs.write(fd, content, 0, content.length, 0, function () {
                  self.fs.close(fd, function () {
                    self.fs.chmod(path, attr || 438, function () {
                      callback(true)
                    })
                  })
                })
              } else {
                self.fs.chmod(path, attr || 438, function () {
                  callback(true)
                })
              }
            })
          })
        })
      })
    }
    Utils.prototype.findFiles = function (path) {
      const self = this
      function findSync(dir, pattern, recursive) {
        if (typeof pattern === 'boolean') {
          recursive = pattern
          pattern = void 0
        }
        let files = []
        self.fs.readdirSync(dir).forEach(function (file) {
          var path2 = pth.join(dir, file)
          if (self.fs.statSync(path2).isDirectory() && recursive)
            files = files.concat(findSync(path2, pattern, recursive))
          if (!pattern || pattern.test(path2)) {
            files.push(
              pth.normalize(path2) + (self.fs.statSync(path2).isDirectory() ? self.sep : '')
            )
          }
        })
        return files
      }
      return findSync(path, void 0, true)
    }
    Utils.prototype.getAttributes = function () {}
    Utils.prototype.setAttributes = function () {}
    Utils.crc32update = function (crc, byte) {
      return crcTable[(crc ^ byte) & 255] ^ (crc >>> 8)
    }
    Utils.crc32 = function (buf) {
      if (typeof buf === 'string') {
        buf = Buffer.from(buf, 'utf8')
      }
      if (!crcTable.length) genCRCTable()
      let len = buf.length
      let crc = ~0
      for (let off = 0; off < len; ) crc = Utils.crc32update(crc, buf[off++])
      return ~crc >>> 0
    }
    Utils.methodToString = function (method) {
      switch (method) {
        case Constants.STORED:
          return 'STORED (' + method + ')'
        case Constants.DEFLATED:
          return 'DEFLATED (' + method + ')'
        default:
          return 'UNSUPPORTED (' + method + ')'
      }
    }
    Utils.canonical = function (path) {
      if (!path) return ''
      var safeSuffix = pth.posix.normalize('/' + path.split('\\').join('/'))
      return pth.join('.', safeSuffix)
    }
    Utils.sanitize = function (prefix, name) {
      prefix = pth.resolve(pth.normalize(prefix))
      var parts = name.split('/')
      for (var i = 0, l = parts.length; i < l; i++) {
        var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)))
        if (path.indexOf(prefix) === 0) {
          return path
        }
      }
      return pth.normalize(pth.join(prefix, pth.basename(name)))
    }
    Utils.toBuffer = function toBuffer(input) {
      if (Buffer.isBuffer(input)) {
        return input
      } else if (input instanceof Uint8Array) {
        return Buffer.from(input)
      } else {
        return typeof input === 'string' ? Buffer.from(input, 'utf8') : Buffer.alloc(0)
      }
    }
    Utils.readBigUInt64LE = function (buffer, index) {
      var slice = Buffer.from(buffer.slice(index, index + 8))
      slice.swap64()
      return parseInt(`0x${slice.toString('hex')}`)
    }
    Utils.isWin = isWin
    Utils.crcTable = crcTable
  },
})

// node_modules/adm-zip/util/errors.js
var require_errors = __commonJS({
  'node_modules/adm-zip/util/errors.js'(exports, module2) {
    module2.exports = {
      INVALID_LOC: 'Invalid LOC header (bad signature)',
      INVALID_CEN: 'Invalid CEN header (bad signature)',
      INVALID_END: 'Invalid END header (bad signature)',
      NO_DATA: 'Nothing to decompress',
      BAD_CRC: 'CRC32 checksum failed',
      FILE_IN_THE_WAY: 'There is a file in the way: %s',
      UNKNOWN_METHOD: 'Invalid/unsupported compression method',
      AVAIL_DATA: 'inflate::Available inflate data did not terminate',
      INVALID_DISTANCE:
        'inflate::Invalid literal/length or distance code in fixed or dynamic block',
      TO_MANY_CODES: 'inflate::Dynamic block code description: too many length or distance codes',
      INVALID_REPEAT_LEN:
        'inflate::Dynamic block code description: repeat more than specified lengths',
      INVALID_REPEAT_FIRST:
        'inflate::Dynamic block code description: repeat lengths with no first length',
      INCOMPLETE_CODES: 'inflate::Dynamic block code description: code lengths codes incomplete',
      INVALID_DYN_DISTANCE:
        'inflate::Dynamic block code description: invalid distance code lengths',
      INVALID_CODES_LEN:
        'inflate::Dynamic block code description: invalid literal/length code lengths',
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: 'inflate::Invalid block type (type == 3)',
      CANT_EXTRACT_FILE: 'Could not extract the file',
      CANT_OVERRIDE: 'Target file already exists',
      NO_ZIP: 'No zip file was loaded',
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: 'A directory cannot have content',
      FILE_NOT_FOUND: 'File not found: %s',
      NOT_IMPLEMENTED: 'Not implemented',
      INVALID_FILENAME: 'Invalid filename',
      INVALID_FORMAT: 'Invalid or unsupported zip format. No END header found',
    }
  },
})

// node_modules/adm-zip/util/fattr.js
var require_fattr = __commonJS({
  'node_modules/adm-zip/util/fattr.js'(exports, module2) {
    var fs3 = require_fileSystem().require()
    var pth = require('path')
    fs3.existsSync = fs3.existsSync || pth.existsSync
    module2.exports = function (path) {
      var _path = path || '',
        _obj = newAttr(),
        _stat = null
      function newAttr() {
        return {
          directory: false,
          readonly: false,
          hidden: false,
          executable: false,
          mtime: 0,
          atime: 0,
        }
      }
      if (_path && fs3.existsSync(_path)) {
        _stat = fs3.statSync(_path)
        _obj.directory = _stat.isDirectory()
        _obj.mtime = _stat.mtime
        _obj.atime = _stat.atime
        _obj.executable = (73 & _stat.mode) !== 0
        _obj.readonly = (128 & _stat.mode) === 0
        _obj.hidden = pth.basename(_path)[0] === '.'
      } else {
        console.warn('Invalid path: ' + _path)
      }
      return {
        get directory() {
          return _obj.directory
        },
        get readOnly() {
          return _obj.readonly
        },
        get hidden() {
          return _obj.hidden
        },
        get mtime() {
          return _obj.mtime
        },
        get atime() {
          return _obj.atime
        },
        get executable() {
          return _obj.executable
        },
        decodeAttributes: function () {},
        encodeAttributes: function () {},
        toJSON: function () {
          return {
            path: _path,
            isDirectory: _obj.directory,
            isReadOnly: _obj.readonly,
            isHidden: _obj.hidden,
            isExecutable: _obj.executable,
            mTime: _obj.mtime,
            aTime: _obj.atime,
          }
        },
        toString: function () {
          return JSON.stringify(this.toJSON(), null, '	')
        },
      }
    }
  },
})

// node_modules/adm-zip/util/index.js
var require_util = __commonJS({
  'node_modules/adm-zip/util/index.js'(exports, module2) {
    module2.exports = require_utils6()
    module2.exports.Constants = require_constants4()
    module2.exports.Errors = require_errors()
    module2.exports.FileAttr = require_fattr()
  },
})

// node_modules/adm-zip/headers/entryHeader.js
var require_entryHeader = __commonJS({
  'node_modules/adm-zip/headers/entryHeader.js'(exports, module2) {
    var Utils = require_util()
    var Constants = Utils.Constants
    module2.exports = function () {
      var _verMade = 20,
        _version = 10,
        _flags = 0,
        _method = 0,
        _time = 0,
        _crc = 0,
        _compressedSize = 0,
        _size = 0,
        _fnameLen = 0,
        _extraLen = 0,
        _comLen = 0,
        _diskStart = 0,
        _inattr = 0,
        _attr = 0,
        _offset = 0
      _verMade |= Utils.isWin ? 2560 : 768
      _flags |= Constants.FLG_EFS
      var _dataHeader = {}
      function setTime(val) {
        val = new Date(val)
        _time =
          (((val.getFullYear() - 1980) & 127) << 25) |
          ((val.getMonth() + 1) << 21) |
          (val.getDate() << 16) |
          (val.getHours() << 11) |
          (val.getMinutes() << 5) |
          (val.getSeconds() >> 1)
      }
      setTime(+new Date())
      return {
        get made() {
          return _verMade
        },
        set made(val) {
          _verMade = val
        },
        get version() {
          return _version
        },
        set version(val) {
          _version = val
        },
        get flags() {
          return _flags
        },
        set flags(val) {
          _flags = val
        },
        get method() {
          return _method
        },
        set method(val) {
          switch (val) {
            case Constants.STORED:
              this.version = 10
            case Constants.DEFLATED:
            default:
              this.version = 20
          }
          _method = val
        },
        get time() {
          return new Date(
            ((_time >> 25) & 127) + 1980,
            ((_time >> 21) & 15) - 1,
            (_time >> 16) & 31,
            (_time >> 11) & 31,
            (_time >> 5) & 63,
            (_time & 31) << 1
          )
        },
        set time(val) {
          setTime(val)
        },
        get crc() {
          return _crc
        },
        set crc(val) {
          _crc = Math.max(0, val) >>> 0
        },
        get compressedSize() {
          return _compressedSize
        },
        set compressedSize(val) {
          _compressedSize = Math.max(0, val) >>> 0
        },
        get size() {
          return _size
        },
        set size(val) {
          _size = Math.max(0, val) >>> 0
        },
        get fileNameLength() {
          return _fnameLen
        },
        set fileNameLength(val) {
          _fnameLen = val
        },
        get extraLength() {
          return _extraLen
        },
        set extraLength(val) {
          _extraLen = val
        },
        get commentLength() {
          return _comLen
        },
        set commentLength(val) {
          _comLen = val
        },
        get diskNumStart() {
          return _diskStart
        },
        set diskNumStart(val) {
          _diskStart = Math.max(0, val) >>> 0
        },
        get inAttr() {
          return _inattr
        },
        set inAttr(val) {
          _inattr = Math.max(0, val) >>> 0
        },
        get attr() {
          return _attr
        },
        set attr(val) {
          _attr = Math.max(0, val) >>> 0
        },
        get fileAttr() {
          return _attr ? (((_attr >>> 0) | 0) >> 16) & 4095 : 0
        },
        get offset() {
          return _offset
        },
        set offset(val) {
          _offset = Math.max(0, val) >>> 0
        },
        get encripted() {
          return (_flags & 1) === 1
        },
        get entryHeaderSize() {
          return Constants.CENHDR + _fnameLen + _extraLen + _comLen
        },
        get realDataOffset() {
          return _offset + Constants.LOCHDR + _dataHeader.fnameLen + _dataHeader.extraLen
        },
        get dataHeader() {
          return _dataHeader
        },
        loadDataHeaderFromBinary: function (input) {
          var data = input.slice(_offset, _offset + Constants.LOCHDR)
          if (data.readUInt32LE(0) !== Constants.LOCSIG) {
            throw new Error(Utils.Errors.INVALID_LOC)
          }
          _dataHeader = {
            version: data.readUInt16LE(Constants.LOCVER),
            flags: data.readUInt16LE(Constants.LOCFLG),
            method: data.readUInt16LE(Constants.LOCHOW),
            time: data.readUInt32LE(Constants.LOCTIM),
            crc: data.readUInt32LE(Constants.LOCCRC),
            compressedSize: data.readUInt32LE(Constants.LOCSIZ),
            size: data.readUInt32LE(Constants.LOCLEN),
            fnameLen: data.readUInt16LE(Constants.LOCNAM),
            extraLen: data.readUInt16LE(Constants.LOCEXT),
          }
        },
        loadFromBinary: function (data) {
          if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
            throw new Error(Utils.Errors.INVALID_CEN)
          }
          _verMade = data.readUInt16LE(Constants.CENVEM)
          _version = data.readUInt16LE(Constants.CENVER)
          _flags = data.readUInt16LE(Constants.CENFLG)
          _method = data.readUInt16LE(Constants.CENHOW)
          _time = data.readUInt32LE(Constants.CENTIM)
          _crc = data.readUInt32LE(Constants.CENCRC)
          _compressedSize = data.readUInt32LE(Constants.CENSIZ)
          _size = data.readUInt32LE(Constants.CENLEN)
          _fnameLen = data.readUInt16LE(Constants.CENNAM)
          _extraLen = data.readUInt16LE(Constants.CENEXT)
          _comLen = data.readUInt16LE(Constants.CENCOM)
          _diskStart = data.readUInt16LE(Constants.CENDSK)
          _inattr = data.readUInt16LE(Constants.CENATT)
          _attr = data.readUInt32LE(Constants.CENATX)
          _offset = data.readUInt32LE(Constants.CENOFF)
        },
        dataHeaderToBinary: function () {
          var data = Buffer.alloc(Constants.LOCHDR)
          data.writeUInt32LE(Constants.LOCSIG, 0)
          data.writeUInt16LE(_version, Constants.LOCVER)
          data.writeUInt16LE(_flags, Constants.LOCFLG)
          data.writeUInt16LE(_method, Constants.LOCHOW)
          data.writeUInt32LE(_time, Constants.LOCTIM)
          data.writeUInt32LE(_crc, Constants.LOCCRC)
          data.writeUInt32LE(_compressedSize, Constants.LOCSIZ)
          data.writeUInt32LE(_size, Constants.LOCLEN)
          data.writeUInt16LE(_fnameLen, Constants.LOCNAM)
          data.writeUInt16LE(_extraLen, Constants.LOCEXT)
          return data
        },
        entryHeaderToBinary: function () {
          var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
          data.writeUInt32LE(Constants.CENSIG, 0)
          data.writeUInt16LE(_verMade, Constants.CENVEM)
          data.writeUInt16LE(_version, Constants.CENVER)
          data.writeUInt16LE(_flags, Constants.CENFLG)
          data.writeUInt16LE(_method, Constants.CENHOW)
          data.writeUInt32LE(_time, Constants.CENTIM)
          data.writeUInt32LE(_crc, Constants.CENCRC)
          data.writeUInt32LE(_compressedSize, Constants.CENSIZ)
          data.writeUInt32LE(_size, Constants.CENLEN)
          data.writeUInt16LE(_fnameLen, Constants.CENNAM)
          data.writeUInt16LE(_extraLen, Constants.CENEXT)
          data.writeUInt16LE(_comLen, Constants.CENCOM)
          data.writeUInt16LE(_diskStart, Constants.CENDSK)
          data.writeUInt16LE(_inattr, Constants.CENATT)
          data.writeUInt32LE(_attr, Constants.CENATX)
          data.writeUInt32LE(_offset, Constants.CENOFF)
          data.fill(0, Constants.CENHDR)
          return data
        },
        toJSON: function () {
          const bytes = function (nr) {
            return nr + ' bytes'
          }
          return {
            made: _verMade,
            version: _version,
            flags: _flags,
            method: Utils.methodToString(_method),
            time: this.time,
            crc: '0x' + _crc.toString(16).toUpperCase(),
            compressedSize: bytes(_compressedSize),
            size: bytes(_size),
            fileNameLength: bytes(_fnameLen),
            extraLength: bytes(_extraLen),
            commentLength: bytes(_comLen),
            diskNumStart: _diskStart,
            inAttr: _inattr,
            attr: _attr,
            offset: _offset,
            entryHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen),
          }
        },
        toString: function () {
          return JSON.stringify(this.toJSON(), null, '	')
        },
      }
    }
  },
})

// node_modules/adm-zip/headers/mainHeader.js
var require_mainHeader = __commonJS({
  'node_modules/adm-zip/headers/mainHeader.js'(exports, module2) {
    var Utils = require_util()
    var Constants = Utils.Constants
    module2.exports = function () {
      var _volumeEntries = 0,
        _totalEntries = 0,
        _size = 0,
        _offset = 0,
        _commentLength = 0
      return {
        get diskEntries() {
          return _volumeEntries
        },
        set diskEntries(val) {
          _volumeEntries = _totalEntries = val
        },
        get totalEntries() {
          return _totalEntries
        },
        set totalEntries(val) {
          _totalEntries = _volumeEntries = val
        },
        get size() {
          return _size
        },
        set size(val) {
          _size = val
        },
        get offset() {
          return _offset
        },
        set offset(val) {
          _offset = val
        },
        get commentLength() {
          return _commentLength
        },
        set commentLength(val) {
          _commentLength = val
        },
        get mainHeaderSize() {
          return Constants.ENDHDR + _commentLength
        },
        loadFromBinary: function (data) {
          if (
            (data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) &&
            (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)
          ) {
            throw new Error(Utils.Errors.INVALID_END)
          }
          if (data.readUInt32LE(0) === Constants.ENDSIG) {
            _volumeEntries = data.readUInt16LE(Constants.ENDSUB)
            _totalEntries = data.readUInt16LE(Constants.ENDTOT)
            _size = data.readUInt32LE(Constants.ENDSIZ)
            _offset = data.readUInt32LE(Constants.ENDOFF)
            _commentLength = data.readUInt16LE(Constants.ENDCOM)
          } else {
            _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB)
            _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT)
            _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZ)
            _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF)
            _commentLength = 0
          }
        },
        toBinary: function () {
          var b = Buffer.alloc(Constants.ENDHDR + _commentLength)
          b.writeUInt32LE(Constants.ENDSIG, 0)
          b.writeUInt32LE(0, 4)
          b.writeUInt16LE(_volumeEntries, Constants.ENDSUB)
          b.writeUInt16LE(_totalEntries, Constants.ENDTOT)
          b.writeUInt32LE(_size, Constants.ENDSIZ)
          b.writeUInt32LE(_offset, Constants.ENDOFF)
          b.writeUInt16LE(_commentLength, Constants.ENDCOM)
          b.fill(' ', Constants.ENDHDR)
          return b
        },
        toJSON: function () {
          const offset = function (nr, len) {
            let offs = nr.toString(16).toUpperCase()
            while (offs.length < len) offs = '0' + offs
            return '0x' + offs
          }
          return {
            diskEntries: _volumeEntries,
            totalEntries: _totalEntries,
            size: _size + ' bytes',
            offset: offset(_offset, 4),
            commentLength: _commentLength,
          }
        },
        toString: function () {
          return JSON.stringify(this.toJSON(), null, '	')
        },
      }
    }
  },
})

// node_modules/adm-zip/headers/index.js
var require_headers = __commonJS({
  'node_modules/adm-zip/headers/index.js'(exports) {
    exports.EntryHeader = require_entryHeader()
    exports.MainHeader = require_mainHeader()
  },
})

// node_modules/adm-zip/methods/deflater.js
var require_deflater = __commonJS({
  'node_modules/adm-zip/methods/deflater.js'(exports, module2) {
    module2.exports = function (inbuf) {
      var zlib = require('zlib')
      var opts = { chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024 }
      return {
        deflate: function () {
          return zlib.deflateRawSync(inbuf, opts)
        },
        deflateAsync: function (callback) {
          var tmp = zlib.createDeflateRaw(opts),
            parts = [],
            total = 0
          tmp.on('data', function (data) {
            parts.push(data)
            total += data.length
          })
          tmp.on('end', function () {
            var buf = Buffer.alloc(total),
              written = 0
            buf.fill(0)
            for (var i = 0; i < parts.length; i++) {
              var part = parts[i]
              part.copy(buf, written)
              written += part.length
            }
            callback && callback(buf)
          })
          tmp.end(inbuf)
        },
      }
    }
  },
})

// node_modules/adm-zip/methods/inflater.js
var require_inflater = __commonJS({
  'node_modules/adm-zip/methods/inflater.js'(exports, module2) {
    module2.exports = function (inbuf) {
      var zlib = require('zlib')
      return {
        inflate: function () {
          return zlib.inflateRawSync(inbuf)
        },
        inflateAsync: function (callback) {
          var tmp = zlib.createInflateRaw(),
            parts = [],
            total = 0
          tmp.on('data', function (data) {
            parts.push(data)
            total += data.length
          })
          tmp.on('end', function () {
            var buf = Buffer.alloc(total),
              written = 0
            buf.fill(0)
            for (var i = 0; i < parts.length; i++) {
              var part = parts[i]
              part.copy(buf, written)
              written += part.length
            }
            callback && callback(buf)
          })
          tmp.end(inbuf)
        },
      }
    }
  },
})

// node_modules/adm-zip/methods/zipcrypto.js
var require_zipcrypto = __commonJS({
  'node_modules/adm-zip/methods/zipcrypto.js'(exports, module2) {
    'use strict'
    var { randomFillSync } = require('crypto')
    var crctable = new Uint32Array(256).map((t, crc) => {
      for (let j = 0; j < 8; j++) {
        if ((crc & 1) !== 0) {
          crc = (crc >>> 1) ^ 3988292384
        } else {
          crc >>>= 1
        }
      }
      return crc >>> 0
    })
    var uMul = (a, b) => Math.imul(a, b) >>> 0
    var crc32update = (pCrc32, bval) => {
      return crctable[(pCrc32 ^ bval) & 255] ^ (pCrc32 >>> 8)
    }
    var genSalt = () => {
      if (typeof randomFillSync === 'function') {
        return randomFillSync(Buffer.alloc(12))
      } else {
        return genSalt.node()
      }
    }
    genSalt.node = () => {
      const salt = Buffer.alloc(12)
      const len = salt.length
      for (let i = 0; i < len; i++) salt[i] = (Math.random() * 256) & 255
      return salt
    }
    var config = {
      genSalt,
    }
    function Initkeys(pw) {
      const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw)
      this.keys = new Uint32Array([305419896, 591751049, 878082192])
      for (let i = 0; i < pass.length; i++) {
        this.updateKeys(pass[i])
      }
    }
    Initkeys.prototype.updateKeys = function (byteValue) {
      const keys = this.keys
      keys[0] = crc32update(keys[0], byteValue)
      keys[1] += keys[0] & 255
      keys[1] = uMul(keys[1], 134775813) + 1
      keys[2] = crc32update(keys[2], keys[1] >>> 24)
      return byteValue
    }
    Initkeys.prototype.next = function () {
      const k = (this.keys[2] | 2) >>> 0
      return (uMul(k, k ^ 1) >> 8) & 255
    }
    function make_decrypter(pwd) {
      const keys = new Initkeys(pwd)
      return function (data) {
        const result = Buffer.alloc(data.length)
        let pos = 0
        for (let c of data) {
          result[pos++] = keys.updateKeys(c ^ keys.next())
        }
        return result
      }
    }
    function make_encrypter(pwd) {
      const keys = new Initkeys(pwd)
      return function (data, result, pos = 0) {
        if (!result) result = Buffer.alloc(data.length)
        for (let c of data) {
          const k = keys.next()
          result[pos++] = c ^ k
          keys.updateKeys(c)
        }
        return result
      }
    }
    function decrypt(data, header, pwd) {
      if (!data || !Buffer.isBuffer(data) || data.length < 12) {
        return Buffer.alloc(0)
      }
      const decrypter = make_decrypter(pwd)
      const salt = decrypter(data.slice(0, 12))
      if (salt[11] !== header.crc >>> 24) {
        throw 'ADM-ZIP: Wrong Password'
      }
      return decrypter(data.slice(12))
    }
    function _salter(data) {
      if (Buffer.isBuffer(data) && data.length >= 12) {
        config.genSalt = function () {
          return data.slice(0, 12)
        }
      } else if (data === 'node') {
        config.genSalt = genSalt.node
      } else {
        config.genSalt = genSalt
      }
    }
    function encrypt(data, header, pwd, oldlike = false) {
      if (data == null) data = Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString())
      const encrypter = make_encrypter(pwd)
      const salt = config.genSalt()
      salt[11] = (header.crc >>> 24) & 255
      if (oldlike) salt[10] = (header.crc >>> 16) & 255
      const result = Buffer.alloc(data.length + 12)
      encrypter(salt, result)
      return encrypter(data, result, 12)
    }
    module2.exports = { decrypt, encrypt, _salter }
  },
})

// node_modules/adm-zip/methods/index.js
var require_methods = __commonJS({
  'node_modules/adm-zip/methods/index.js'(exports) {
    exports.Deflater = require_deflater()
    exports.Inflater = require_inflater()
    exports.ZipCrypto = require_zipcrypto()
  },
})

// node_modules/adm-zip/zipEntry.js
var require_zipEntry = __commonJS({
  'node_modules/adm-zip/zipEntry.js'(exports, module2) {
    var Utils = require_util()
    var Headers = require_headers()
    var Constants = Utils.Constants
    var Methods = require_methods()
    module2.exports = function (input) {
      var _entryHeader = new Headers.EntryHeader(),
        _entryName = Buffer.alloc(0),
        _comment = Buffer.alloc(0),
        _isDirectory = false,
        uncompressedData = null,
        _extra = Buffer.alloc(0)
      function getCompressedDataFromZip() {
        if (!input || !Buffer.isBuffer(input)) {
          return Buffer.alloc(0)
        }
        _entryHeader.loadDataHeaderFromBinary(input)
        return input.slice(
          _entryHeader.realDataOffset,
          _entryHeader.realDataOffset + _entryHeader.compressedSize
        )
      }
      function crc32OK(data) {
        if ((_entryHeader.flags & 8) !== 8) {
          if (Utils.crc32(data) !== _entryHeader.dataHeader.crc) {
            return false
          }
        } else {
        }
        return true
      }
      function decompress(async, callback, pass) {
        if (typeof callback === 'undefined' && typeof async === 'string') {
          pass = async
          async = void 0
        }
        if (_isDirectory) {
          if (async && callback) {
            callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR)
          }
          return Buffer.alloc(0)
        }
        var compressedData = getCompressedDataFromZip()
        if (compressedData.length === 0) {
          if (async && callback) callback(compressedData)
          return compressedData
        }
        if (_entryHeader.encripted) {
          if (typeof pass !== 'string' && !Buffer.isBuffer(pass)) {
            throw new Error('ADM-ZIP: Incompatible password parameter')
          }
          compressedData = Methods.ZipCrypto.decrypt(compressedData, _entryHeader, pass)
        }
        var data = Buffer.alloc(_entryHeader.size)
        switch (_entryHeader.method) {
          case Utils.Constants.STORED:
            compressedData.copy(data)
            if (!crc32OK(data)) {
              if (async && callback) callback(data, Utils.Errors.BAD_CRC)
              throw new Error(Utils.Errors.BAD_CRC)
            } else {
              if (async && callback) callback(data)
              return data
            }
          case Utils.Constants.DEFLATED:
            var inflater = new Methods.Inflater(compressedData)
            if (!async) {
              const result = inflater.inflate(data)
              result.copy(data, 0)
              if (!crc32OK(data)) {
                throw new Error(Utils.Errors.BAD_CRC + ' ' + _entryName.toString())
              }
              return data
            } else {
              inflater.inflateAsync(function (result) {
                result.copy(result, 0)
                if (callback) {
                  if (!crc32OK(result)) {
                    callback(result, Utils.Errors.BAD_CRC)
                  } else {
                    callback(result)
                  }
                }
              })
            }
            break
          default:
            if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD)
            throw new Error(Utils.Errors.UNKNOWN_METHOD)
        }
      }
      function compress(async, callback) {
        if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
          if (async && callback) callback(getCompressedDataFromZip())
          return getCompressedDataFromZip()
        }
        if (uncompressedData.length && !_isDirectory) {
          var compressedData
          switch (_entryHeader.method) {
            case Utils.Constants.STORED:
              _entryHeader.compressedSize = _entryHeader.size
              compressedData = Buffer.alloc(uncompressedData.length)
              uncompressedData.copy(compressedData)
              if (async && callback) callback(compressedData)
              return compressedData
            default:
            case Utils.Constants.DEFLATED:
              var deflater = new Methods.Deflater(uncompressedData)
              if (!async) {
                var deflated = deflater.deflate()
                _entryHeader.compressedSize = deflated.length
                return deflated
              } else {
                deflater.deflateAsync(function (data) {
                  compressedData = Buffer.alloc(data.length)
                  _entryHeader.compressedSize = data.length
                  data.copy(compressedData)
                  callback && callback(compressedData)
                })
              }
              deflater = null
              break
          }
        } else if (async && callback) {
          callback(Buffer.alloc(0))
        } else {
          return Buffer.alloc(0)
        }
      }
      function readUInt64LE(buffer, offset) {
        return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset)
      }
      function parseExtra(data) {
        var offset = 0
        var signature, size, part
        while (offset < data.length) {
          signature = data.readUInt16LE(offset)
          offset += 2
          size = data.readUInt16LE(offset)
          offset += 2
          part = data.slice(offset, offset + size)
          offset += size
          if (Constants.ID_ZIP64 === signature) {
            parseZip64ExtendedInformation(part)
          }
        }
      }
      function parseZip64ExtendedInformation(data) {
        var size, compressedSize, offset, diskNumStart
        if (data.length >= Constants.EF_ZIP64_SCOMP) {
          size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP)
          if (_entryHeader.size === Constants.EF_ZIP64_OR_32) {
            _entryHeader.size = size
          }
        }
        if (data.length >= Constants.EF_ZIP64_RHO) {
          compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP)
          if (_entryHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
            _entryHeader.compressedSize = compressedSize
          }
        }
        if (data.length >= Constants.EF_ZIP64_DSN) {
          offset = readUInt64LE(data, Constants.EF_ZIP64_RHO)
          if (_entryHeader.offset === Constants.EF_ZIP64_OR_32) {
            _entryHeader.offset = offset
          }
        }
        if (data.length >= Constants.EF_ZIP64_DSN + 4) {
          diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN)
          if (_entryHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
            _entryHeader.diskNumStart = diskNumStart
          }
        }
      }
      return {
        get entryName() {
          return _entryName.toString()
        },
        get rawEntryName() {
          return _entryName
        },
        set entryName(val) {
          _entryName = Utils.toBuffer(val)
          var lastChar = _entryName[_entryName.length - 1]
          _isDirectory = lastChar === 47 || lastChar === 92
          _entryHeader.fileNameLength = _entryName.length
        },
        get extra() {
          return _extra
        },
        set extra(val) {
          _extra = val
          _entryHeader.extraLength = val.length
          parseExtra(val)
        },
        get comment() {
          return _comment.toString()
        },
        set comment(val) {
          _comment = Utils.toBuffer(val)
          _entryHeader.commentLength = _comment.length
        },
        get name() {
          var n = _entryName.toString()
          return _isDirectory
            ? n
                .substr(n.length - 1)
                .split('/')
                .pop()
            : n.split('/').pop()
        },
        get isDirectory() {
          return _isDirectory
        },
        getCompressedData: function () {
          return compress(false, null)
        },
        getCompressedDataAsync: function (callback) {
          compress(true, callback)
        },
        setData: function (value) {
          uncompressedData = Utils.toBuffer(value)
          if (!_isDirectory && uncompressedData.length) {
            _entryHeader.size = uncompressedData.length
            _entryHeader.method = Utils.Constants.DEFLATED
            _entryHeader.crc = Utils.crc32(value)
            _entryHeader.changed = true
          } else {
            _entryHeader.method = Utils.Constants.STORED
          }
        },
        getData: function (pass) {
          if (_entryHeader.changed) {
            return uncompressedData
          } else {
            return decompress(false, null, pass)
          }
        },
        getDataAsync: function (callback, pass) {
          if (_entryHeader.changed) {
            callback(uncompressedData)
          } else {
            decompress(true, callback, pass)
          }
        },
        set attr(attr) {
          _entryHeader.attr = attr
        },
        get attr() {
          return _entryHeader.attr
        },
        set header(data) {
          _entryHeader.loadFromBinary(data)
        },
        get header() {
          return _entryHeader
        },
        packHeader: function () {
          var header = _entryHeader.entryHeaderToBinary()
          var addpos = Utils.Constants.CENHDR
          _entryName.copy(header, addpos)
          addpos += _entryName.length
          if (_entryHeader.extraLength) {
            _extra.copy(header, addpos)
            addpos += _entryHeader.extraLength
          }
          if (_entryHeader.commentLength) {
            _comment.copy(header, addpos)
          }
          return header
        },
        toJSON: function () {
          const bytes = function (nr) {
            return '<' + ((nr && nr.length + ' bytes buffer') || 'null') + '>'
          }
          return {
            entryName: this.entryName,
            name: this.name,
            comment: this.comment,
            isDirectory: this.isDirectory,
            header: _entryHeader.toJSON(),
            compressedData: bytes(input),
            data: bytes(uncompressedData),
          }
        },
        toString: function () {
          return JSON.stringify(this.toJSON(), null, '	')
        },
      }
    }
  },
})

// node_modules/adm-zip/zipFile.js
var require_zipFile = __commonJS({
  'node_modules/adm-zip/zipFile.js'(exports, module2) {
    var ZipEntry = require_zipEntry()
    var Headers = require_headers()
    var Utils = require_util()
    module2.exports = function (inBuffer, options) {
      var entryList = [],
        entryTable = {},
        _comment = Buffer.alloc(0),
        mainHeader = new Headers.MainHeader(),
        loadedEntries = false
      const opts = Object.assign(/* @__PURE__ */ Object.create(null), options)
      const { noSort } = opts
      if (inBuffer) {
        readMainHeader(opts.readEntries)
      } else {
        loadedEntries = true
      }
      function iterateEntries(callback) {
        const totalEntries = mainHeader.diskEntries
        let index = mainHeader.offset
        for (let i = 0; i < totalEntries; i++) {
          let tmp = index
          const entry = new ZipEntry(inBuffer)
          entry.header = inBuffer.slice(tmp, (tmp += Utils.Constants.CENHDR))
          entry.entryName = inBuffer.slice(tmp, (tmp += entry.header.fileNameLength))
          index += entry.header.entryHeaderSize
          callback(entry)
        }
      }
      function readEntries() {
        loadedEntries = true
        entryTable = {}
        entryList = new Array(mainHeader.diskEntries)
        var index = mainHeader.offset
        for (var i = 0; i < entryList.length; i++) {
          var tmp = index,
            entry = new ZipEntry(inBuffer)
          entry.header = inBuffer.slice(tmp, (tmp += Utils.Constants.CENHDR))
          entry.entryName = inBuffer.slice(tmp, (tmp += entry.header.fileNameLength))
          if (entry.header.extraLength) {
            entry.extra = inBuffer.slice(tmp, (tmp += entry.header.extraLength))
          }
          if (entry.header.commentLength)
            entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength)
          index += entry.header.entryHeaderSize
          entryList[i] = entry
          entryTable[entry.entryName] = entry
        }
      }
      function readMainHeader(readNow) {
        var i = inBuffer.length - Utils.Constants.ENDHDR,
          max = Math.max(0, i - 65535),
          n = max,
          endStart = inBuffer.length,
          endOffset = -1,
          commentEnd = 0
        for (i; i >= n; i--) {
          if (inBuffer[i] !== 80) continue
          if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
            endOffset = i
            commentEnd = i
            endStart = i + Utils.Constants.ENDHDR
            n = i - Utils.Constants.END64HDR
            continue
          }
          if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
            n = max
            continue
          }
          if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
            endOffset = i
            endStart =
              i +
              Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) +
              Utils.Constants.ZIP64LEAD
            break
          }
        }
        if (!~endOffset) throw new Error(Utils.Errors.INVALID_FORMAT)
        mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart))
        if (mainHeader.commentLength) {
          _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR)
        }
        if (readNow) readEntries()
      }
      function sortEntries() {
        if (entryList.length > 1 && !noSort) {
          entryList.sort((a, b) =>
            a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase())
          )
        }
      }
      return {
        get entries() {
          if (!loadedEntries) {
            readEntries()
          }
          return entryList
        },
        get comment() {
          return _comment.toString()
        },
        set comment(val) {
          _comment = Utils.toBuffer(val)
          mainHeader.commentLength = _comment.length
        },
        getEntryCount: function () {
          if (!loadedEntries) {
            return mainHeader.diskEntries
          }
          return entryList.length
        },
        forEach: function (callback) {
          if (!loadedEntries) {
            iterateEntries(callback)
            return
          }
          entryList.forEach(callback)
        },
        getEntry: function (entryName) {
          if (!loadedEntries) {
            readEntries()
          }
          return entryTable[entryName] || null
        },
        setEntry: function (entry) {
          if (!loadedEntries) {
            readEntries()
          }
          entryList.push(entry)
          entryTable[entry.entryName] = entry
          mainHeader.totalEntries = entryList.length
        },
        deleteEntry: function (entryName) {
          if (!loadedEntries) {
            readEntries()
          }
          var entry = entryTable[entryName]
          if (entry && entry.isDirectory) {
            var _self = this
            this.getEntryChildren(entry).forEach(function (child) {
              if (child.entryName !== entryName) {
                _self.deleteEntry(child.entryName)
              }
            })
          }
          entryList.splice(entryList.indexOf(entry), 1)
          delete entryTable[entryName]
          mainHeader.totalEntries = entryList.length
        },
        getEntryChildren: function (entry) {
          if (!loadedEntries) {
            readEntries()
          }
          if (entry && entry.isDirectory) {
            const list = []
            const name = entry.entryName
            const len = name.length
            entryList.forEach(function (zipEntry) {
              if (zipEntry.entryName.substr(0, len) === name) {
                list.push(zipEntry)
              }
            })
            return list
          }
          return []
        },
        compressToBuffer: function () {
          if (!loadedEntries) {
            readEntries()
          }
          sortEntries()
          const dataBlock = []
          const entryHeaders = []
          let totalSize = 0
          let dindex = 0
          mainHeader.size = 0
          mainHeader.offset = 0
          for (const entry of entryList) {
            const compressedData = entry.getCompressedData()
            entry.header.offset = dindex
            const dataHeader = entry.header.dataHeaderToBinary()
            const entryNameLen = entry.rawEntryName.length
            const postHeader = Buffer.alloc(entryNameLen + entry.extra.length)
            entry.rawEntryName.copy(postHeader, 0)
            postHeader.copy(entry.extra, entryNameLen)
            const dataLength = dataHeader.length + postHeader.length + compressedData.length
            dindex += dataLength
            dataBlock.push(dataHeader)
            dataBlock.push(postHeader)
            dataBlock.push(compressedData)
            const entryHeader = entry.packHeader()
            entryHeaders.push(entryHeader)
            mainHeader.size += entryHeader.length
            totalSize += dataLength + entryHeader.length
          }
          totalSize += mainHeader.mainHeaderSize
          mainHeader.offset = dindex
          dindex = 0
          const outBuffer = Buffer.alloc(totalSize)
          for (const content of dataBlock) {
            content.copy(outBuffer, dindex)
            dindex += content.length
          }
          for (const content of entryHeaders) {
            content.copy(outBuffer, dindex)
            dindex += content.length
          }
          const mh = mainHeader.toBinary()
          if (_comment) {
            _comment.copy(mh, Utils.Constants.ENDHDR)
          }
          mh.copy(outBuffer, dindex)
          return outBuffer
        },
        toAsyncBuffer: function (onSuccess, onFail, onItemStart, onItemEnd) {
          try {
            if (!loadedEntries) {
              readEntries()
            }
            sortEntries()
            const dataBlock = []
            const entryHeaders = []
            let totalSize = 0
            let dindex = 0
            mainHeader.size = 0
            mainHeader.offset = 0
            const compress2Buffer = function (entryLists) {
              if (entryLists.length) {
                const entry = entryLists.pop()
                const name = entry.entryName + entry.extra.toString()
                if (onItemStart) onItemStart(name)
                entry.getCompressedDataAsync(function (compressedData) {
                  if (onItemEnd) onItemEnd(name)
                  entry.header.offset = dindex
                  const dataHeader = entry.header.dataHeaderToBinary()
                  const postHeader = Buffer.alloc(name.length, name)
                  const dataLength = dataHeader.length + postHeader.length + compressedData.length
                  dindex += dataLength
                  dataBlock.push(dataHeader)
                  dataBlock.push(postHeader)
                  dataBlock.push(compressedData)
                  const entryHeader = entry.packHeader()
                  entryHeaders.push(entryHeader)
                  mainHeader.size += entryHeader.length
                  totalSize += dataLength + entryHeader.length
                  compress2Buffer(entryLists)
                })
              } else {
                totalSize += mainHeader.mainHeaderSize
                mainHeader.offset = dindex
                dindex = 0
                const outBuffer = Buffer.alloc(totalSize)
                dataBlock.forEach(function (content) {
                  content.copy(outBuffer, dindex)
                  dindex += content.length
                })
                entryHeaders.forEach(function (content) {
                  content.copy(outBuffer, dindex)
                  dindex += content.length
                })
                const mh = mainHeader.toBinary()
                if (_comment) {
                  _comment.copy(mh, Utils.Constants.ENDHDR)
                }
                mh.copy(outBuffer, dindex)
                onSuccess(outBuffer)
              }
            }
            compress2Buffer(entryList)
          } catch (e) {
            onFail(e)
          }
        },
      }
    }
  },
})

// node_modules/adm-zip/adm-zip.js
var require_adm_zip = __commonJS({
  'node_modules/adm-zip/adm-zip.js'(exports, module2) {
    var Utils = require_util()
    var pth = require('path')
    var ZipEntry = require_zipEntry()
    var ZipFile = require_zipFile()
    var get_Bool = (val, def) => (typeof val === 'boolean' ? val : def)
    var get_Str = (val, def) => (typeof val === 'string' ? val : def)
    var defaultOptions = {
      noSort: false,
      readEntries: false,
      method: Utils.Constants.NONE,
      fs: null,
    }
    module2.exports = function (input, options) {
      let inBuffer = null
      const opts = Object.assign(/* @__PURE__ */ Object.create(null), defaultOptions)
      if (input && typeof input === 'object') {
        if (!(input instanceof Uint8Array)) {
          Object.assign(opts, input)
          input = opts.input ? opts.input : void 0
          if (opts.input) delete opts.input
        }
        if (Buffer.isBuffer(input)) {
          inBuffer = input
          opts.method = Utils.Constants.BUFFER
          input = void 0
        }
      }
      Object.assign(opts, options)
      const filetools = new Utils(opts)
      if (input && typeof input === 'string') {
        if (filetools.fs.existsSync(input)) {
          opts.method = Utils.Constants.FILE
          opts.filename = input
          inBuffer = filetools.fs.readFileSync(input)
        } else {
          throw new Error(Utils.Errors.INVALID_FILENAME)
        }
      }
      const _zip = new ZipFile(inBuffer, opts)
      const { canonical, sanitize } = Utils
      function getEntry(entry) {
        if (entry && _zip) {
          var item
          if (typeof entry === 'string') item = _zip.getEntry(entry)
          if (
            typeof entry === 'object' &&
            typeof entry.entryName !== 'undefined' &&
            typeof entry.header !== 'undefined'
          )
            item = _zip.getEntry(entry.entryName)
          if (item) {
            return item
          }
        }
        return null
      }
      function fixPath(zipPath) {
        const { join: join2, normalize, sep: sep2 } = pth.posix
        return join2('.', normalize(sep2 + zipPath.split('\\').join(sep2) + sep2))
      }
      return {
        readFile: function (entry, pass) {
          var item = getEntry(entry)
          return (item && item.getData(pass)) || null
        },
        readFileAsync: function (entry, callback) {
          var item = getEntry(entry)
          if (item) {
            item.getDataAsync(callback)
          } else {
            callback(null, 'getEntry failed for:' + entry)
          }
        },
        readAsText: function (entry, encoding) {
          var item = getEntry(entry)
          if (item) {
            var data = item.getData()
            if (data && data.length) {
              return data.toString(encoding || 'utf8')
            }
          }
          return ''
        },
        readAsTextAsync: function (entry, callback, encoding) {
          var item = getEntry(entry)
          if (item) {
            item.getDataAsync(function (data, err) {
              if (err) {
                callback(data, err)
                return
              }
              if (data && data.length) {
                callback(data.toString(encoding || 'utf8'))
              } else {
                callback('')
              }
            })
          } else {
            callback('')
          }
        },
        deleteFile: function (entry) {
          var item = getEntry(entry)
          if (item) {
            _zip.deleteEntry(item.entryName)
          }
        },
        addZipComment: function (comment) {
          _zip.comment = comment
        },
        getZipComment: function () {
          return _zip.comment || ''
        },
        addZipEntryComment: function (entry, comment) {
          var item = getEntry(entry)
          if (item) {
            item.comment = comment
          }
        },
        getZipEntryComment: function (entry) {
          var item = getEntry(entry)
          if (item) {
            return item.comment || ''
          }
          return ''
        },
        updateFile: function (entry, content) {
          var item = getEntry(entry)
          if (item) {
            item.setData(content)
          }
        },
        addLocalFile: function (localPath, zipPath, zipName, comment) {
          if (filetools.fs.existsSync(localPath)) {
            zipPath = zipPath ? fixPath(zipPath) : ''
            var p = localPath.split('\\').join('/').split('/').pop()
            zipPath += zipName ? zipName : p
            const _attr = filetools.fs.statSync(localPath)
            this.addFile(zipPath, filetools.fs.readFileSync(localPath), comment, _attr)
          } else {
            throw new Error(Utils.Errors.FILE_NOT_FOUND.replace('%s', localPath))
          }
        },
        addLocalFolder: function (localPath, zipPath, filter) {
          if (filter instanceof RegExp) {
            filter = (function (rx) {
              return function (filename) {
                return rx.test(filename)
              }
            })(filter)
          } else if (typeof filter !== 'function') {
            filter = function () {
              return true
            }
          }
          zipPath = zipPath ? fixPath(zipPath) : ''
          localPath = pth.normalize(localPath)
          if (filetools.fs.existsSync(localPath)) {
            const items = filetools.findFiles(localPath)
            const self = this
            if (items.length) {
              items.forEach(function (filepath) {
                var p = pth.relative(localPath, filepath).split('\\').join('/')
                if (filter(p)) {
                  var stats = filetools.fs.statSync(filepath)
                  if (stats.isFile()) {
                    self.addFile(zipPath + p, filetools.fs.readFileSync(filepath), '', stats)
                  } else {
                    self.addFile(zipPath + p + '/', Buffer.alloc(0), '', stats)
                  }
                }
              })
            }
          } else {
            throw new Error(Utils.Errors.FILE_NOT_FOUND.replace('%s', localPath))
          }
        },
        addLocalFolderAsync: function (localPath, callback, zipPath, filter) {
          if (filter instanceof RegExp) {
            filter = (function (rx) {
              return function (filename) {
                return rx.test(filename)
              }
            })(filter)
          } else if (typeof filter !== 'function') {
            filter = function () {
              return true
            }
          }
          zipPath = zipPath ? fixPath(zipPath) : ''
          localPath = pth.normalize(localPath)
          var self = this
          filetools.fs.open(localPath, 'r', function (err) {
            if (err && err.code === 'ENOENT') {
              callback(void 0, Utils.Errors.FILE_NOT_FOUND.replace('%s', localPath))
            } else if (err) {
              callback(void 0, err)
            } else {
              var items = filetools.findFiles(localPath)
              var i = -1
              var next = function () {
                i += 1
                if (i < items.length) {
                  var filepath = items[i]
                  var p = pth.relative(localPath, filepath).split('\\').join('/')
                  p = p
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\x20-\x7E]/g, '')
                  if (filter(p)) {
                    filetools.fs.stat(filepath, function (er0, stats) {
                      if (er0) callback(void 0, er0)
                      if (stats.isFile()) {
                        filetools.fs.readFile(filepath, function (er1, data) {
                          if (er1) {
                            callback(void 0, er1)
                          } else {
                            self.addFile(zipPath + p, data, '', stats)
                            next()
                          }
                        })
                      } else {
                        self.addFile(zipPath + p + '/', Buffer.alloc(0), '', stats)
                        next()
                      }
                    })
                  } else {
                    next()
                  }
                } else {
                  callback(true, void 0)
                }
              }
              next()
            }
          })
        },
        addLocalFolderPromise: function (localPath, props) {
          return new Promise((resolve, reject) => {
            const { filter, zipPath } = Object.assign({}, props)
            this.addLocalFolderAsync(
              localPath,
              (done, err) => {
                if (err) reject(err)
                if (done) resolve(this)
              },
              zipPath,
              filter
            )
          })
        },
        addFile: function (entryName, content, comment, attr) {
          let entry = getEntry(entryName)
          const update = entry != null
          if (!update) {
            entry = new ZipEntry()
            entry.entryName = entryName
          }
          entry.comment = comment || ''
          const isStat = typeof attr === 'object' && attr instanceof filetools.fs.Stats
          if (isStat) {
            entry.header.time = attr.mtime
          }
          var fileattr = entry.isDirectory ? 16 : 0
          if (!Utils.isWin) {
            let unix = entry.isDirectory ? 16384 : 32768
            if (isStat) {
              unix |= 4095 & attr.mode
            } else if (typeof attr === 'number') {
              unix |= 4095 & attr
            } else {
              unix |= entry.isDirectory ? 493 : 420
            }
            fileattr = (fileattr | (unix << 16)) >>> 0
          }
          entry.attr = fileattr
          entry.setData(content)
          if (!update) _zip.setEntry(entry)
        },
        getEntries: function () {
          return _zip ? _zip.entries : []
        },
        getEntry: function (name) {
          return getEntry(name)
        },
        getEntryCount: function () {
          return _zip.getEntryCount()
        },
        forEach: function (callback) {
          return _zip.forEach(callback)
        },
        extractEntryTo: function (
          entry,
          targetPath,
          maintainEntryPath,
          overwrite,
          keepOriginalPermission,
          outFileName
        ) {
          overwrite = get_Bool(overwrite, false)
          keepOriginalPermission = get_Bool(keepOriginalPermission, false)
          maintainEntryPath = get_Bool(maintainEntryPath, true)
          outFileName = get_Str(outFileName, get_Str(keepOriginalPermission, void 0))
          var item = getEntry(entry)
          if (!item) {
            throw new Error(Utils.Errors.NO_ENTRY)
          }
          var entryName = canonical(item.entryName)
          var target = sanitize(
            targetPath,
            outFileName && !item.isDirectory
              ? outFileName
              : maintainEntryPath
              ? entryName
              : pth.basename(entryName)
          )
          if (item.isDirectory) {
            var children = _zip.getEntryChildren(item)
            children.forEach(function (child) {
              if (child.isDirectory) return
              var content2 = child.getData()
              if (!content2) {
                throw new Error(Utils.Errors.CANT_EXTRACT_FILE)
              }
              var name = canonical(child.entryName)
              var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name))
              const fileAttr2 = keepOriginalPermission ? child.header.fileAttr : void 0
              filetools.writeFileTo(childName, content2, overwrite, fileAttr2)
            })
            return true
          }
          var content = item.getData()
          if (!content) throw new Error(Utils.Errors.CANT_EXTRACT_FILE)
          if (filetools.fs.existsSync(target) && !overwrite) {
            throw new Error(Utils.Errors.CANT_OVERRIDE)
          }
          const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0
          filetools.writeFileTo(target, content, overwrite, fileAttr)
          return true
        },
        test: function (pass) {
          if (!_zip) {
            return false
          }
          for (var entry in _zip.entries) {
            try {
              if (entry.isDirectory) {
                continue
              }
              var content = _zip.entries[entry].getData(pass)
              if (!content) {
                return false
              }
            } catch (err) {
              return false
            }
          }
          return true
        },
        extractAllTo: function (targetPath, overwrite, keepOriginalPermission, pass) {
          overwrite = get_Bool(overwrite, false)
          pass = get_Str(keepOriginalPermission, pass)
          keepOriginalPermission = get_Bool(keepOriginalPermission, false)
          if (!_zip) {
            throw new Error(Utils.Errors.NO_ZIP)
          }
          _zip.entries.forEach(function (entry) {
            var entryName = sanitize(targetPath, canonical(entry.entryName.toString()))
            if (entry.isDirectory) {
              filetools.makeDir(entryName)
              return
            }
            var content = entry.getData(pass)
            if (!content) {
              throw new Error(Utils.Errors.CANT_EXTRACT_FILE)
            }
            const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0
            filetools.writeFileTo(entryName, content, overwrite, fileAttr)
            try {
              filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time)
            } catch (err) {
              throw new Error(Utils.Errors.CANT_EXTRACT_FILE)
            }
          })
        },
        extractAllToAsync: function (targetPath, overwrite, keepOriginalPermission, callback) {
          if (!callback) {
            callback = function () {}
          }
          overwrite = get_Bool(overwrite, false)
          if (typeof keepOriginalPermission === 'function' && !callback)
            callback = keepOriginalPermission
          keepOriginalPermission = get_Bool(keepOriginalPermission, false)
          if (!_zip) {
            callback(new Error(Utils.Errors.NO_ZIP))
            return
          }
          targetPath = pth.resolve(targetPath)
          const getPath = (entry) =>
            sanitize(targetPath, pth.normalize(canonical(entry.entryName.toString())))
          const getError = (msg, file) => new Error(msg + ': "' + file + '"')
          const dirEntries = []
          const fileEntries = /* @__PURE__ */ new Set()
          _zip.entries.forEach((e) => {
            if (e.isDirectory) {
              dirEntries.push(e)
            } else {
              fileEntries.add(e)
            }
          })
          for (const entry of dirEntries) {
            const dirPath = getPath(entry)
            const dirAttr = keepOriginalPermission ? entry.header.fileAttr : void 0
            try {
              filetools.makeDir(dirPath)
              if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr)
              filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time)
            } catch (er) {
              callback(getError('Unable to create folder', dirPath))
            }
          }
          const done = () => {
            if (fileEntries.size === 0) {
              callback()
            }
          }
          for (const entry of fileEntries.values()) {
            const entryName = pth.normalize(canonical(entry.entryName.toString()))
            const filePath = sanitize(targetPath, entryName)
            entry.getDataAsync(function (content, err_1) {
              if (err_1) {
                callback(new Error(err_1))
                return
              }
              if (!content) {
                callback(new Error(Utils.Errors.CANT_EXTRACT_FILE))
              } else {
                const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0
                filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function (succ) {
                  if (!succ) {
                    callback(getError('Unable to write file', filePath))
                    return
                  }
                  filetools.fs.utimes(
                    filePath,
                    entry.header.time,
                    entry.header.time,
                    function (err_2) {
                      if (err_2) {
                        callback(getError('Unable to set times', filePath))
                        return
                      }
                      fileEntries.delete(entry)
                      done()
                    }
                  )
                })
              }
            })
          }
          done()
        },
        writeZip: function (targetFileName, callback) {
          if (arguments.length === 1) {
            if (typeof targetFileName === 'function') {
              callback = targetFileName
              targetFileName = ''
            }
          }
          if (!targetFileName && opts.filename) {
            targetFileName = opts.filename
          }
          if (!targetFileName) return
          var zipData = _zip.compressToBuffer()
          if (zipData) {
            var ok = filetools.writeFileTo(targetFileName, zipData, true)
            if (typeof callback === 'function') callback(!ok ? new Error('failed') : null, '')
          }
        },
        writeZipPromise: function (targetFileName, props) {
          const { overwrite, perm } = Object.assign({ overwrite: true }, props)
          return new Promise((resolve, reject) => {
            if (!targetFileName && opts.filename) targetFileName = opts.filename
            if (!targetFileName) reject('ADM-ZIP: ZIP File Name Missing')
            this.toBufferPromise().then((zipData) => {
              const ret = (done) =>
                done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file")
              filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret)
            }, reject)
          })
        },
        toBufferPromise: function () {
          return new Promise((resolve, reject) => {
            _zip.toAsyncBuffer(resolve, reject)
          })
        },
        toBuffer: function (onSuccess, onFail, onItemStart, onItemEnd) {
          this.valueOf = 2
          if (typeof onSuccess === 'function') {
            _zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd)
            return null
          }
          return _zip.compressToBuffer()
        },
      }
    }
  },
})

// src/action/index.ts
var import_core = __toESM(require_core(), 1)
var import_url2 = require('url')

// src/tokenAuthenticator.ts
function tokenAuthenticator(token2) {
  return () => ({
    Authorization: `Bearer ${token2}`,
  })
}

// node_modules/@cucumber/ci-environment/dist/esm/src/detectCiEnvironment.js
var import_fs = require('fs')

// node_modules/@cucumber/ci-environment/dist/esm/src/CiEnvironments.js
var CiEnvironments = [
  {
    name: 'Azure Pipelines',
    url: '${BUILD_BUILDURI}',
    buildNumber: '${BUILD_BUILDNUMBER}',
    git: {
      remote: '${BUILD_REPOSITORY_URI}',
      revision: '${BUILD_SOURCEVERSION}',
      branch: '${BUILD_SOURCEBRANCH/refs/heads/(.*)/\\1}',
      tag: '${BUILD_SOURCEBRANCH/refs/tags/(.*)/\\1}',
    },
  },
  {
    name: 'Bamboo',
    url: '${bamboo_buildResultsUrl}',
    buildNumber: '${bamboo_buildNumber}',
    git: {
      remote: '${bamboo_planRepository_repositoryUrl}',
      revision: '${bamboo_planRepository_revision}',
      branch: '${bamboo_planRepository_branch}',
    },
  },
  {
    name: 'Buddy',
    url: '${BUDDY_EXECUTION_URL}',
    buildNumber: '${BUDDY_EXECUTION_ID}',
    git: {
      remote: '${BUDDY_SCM_URL}',
      revision: '${BUDDY_EXECUTION_REVISION}',
      branch: '${BUDDY_EXECUTION_BRANCH}',
      tag: '${BUDDY_EXECUTION_TAG}',
    },
  },
  {
    name: 'Bitrise',
    url: '${BITRISE_BUILD_URL}',
    buildNumber: '${BITRISE_BUILD_NUMBER}',
    git: {
      remote: '${GIT_REPOSITORY_URL}',
      revision: '${BITRISE_GIT_COMMIT}',
      branch: '${BITRISE_GIT_BRANCH}',
      tag: '${BITRISE_GIT_TAG}',
    },
  },
  {
    name: 'CircleCI',
    url: '${CIRCLE_BUILD_URL}',
    buildNumber: '${CIRCLE_BUILD_NUM}',
    git: {
      remote: '${CIRCLE_REPOSITORY_URL}',
      revision: '${CIRCLE_SHA1}',
      branch: '${CIRCLE_BRANCH}',
      tag: '${CIRCLE_TAG}',
    },
  },
  {
    name: 'CodeFresh',
    url: '${CF_BUILD_URL}',
    buildNumber: '${CF_BUILD_ID}',
    git: {
      remote: '${CF_COMMIT_URL/(.*)\\/commit.+$/\\1}.git',
      revision: '${CF_REVISION}',
      branch: '${CF_BRANCH}',
    },
  },
  {
    name: 'CodeShip',
    url: '${CI_BUILD_URL}',
    buildNumber: '${CI_BUILD_NUMBER}',
    git: {
      remote: '${CI_PULL_REQUEST/(.*)\\/pull\\/\\d+/\\1.git}',
      revision: '${CI_COMMIT_ID}',
      branch: '${CI_BRANCH}',
    },
  },
  {
    name: 'GitHub Actions',
    url: '${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}',
    buildNumber: '${GITHUB_RUN_ID}',
    git: {
      remote: '${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}.git',
      revision: '${GITHUB_SHA}',
      branch: '${GITHUB_HEAD_REF}',
      tag: '${GITHUB_REF/refs/tags/(.*)/\\1}',
    },
  },
  {
    name: 'GitLab',
    url: '${CI_JOB_URL}',
    buildNumber: '${CI_JOB_ID}',
    git: {
      remote: '${CI_REPOSITORY_URL}',
      revision: '${CI_COMMIT_SHA}',
      branch: '${CI_COMMIT_BRANCH}',
      tag: '${CI_COMMIT_TAG}',
    },
  },
  {
    name: 'GoCD',
    url: '${GO_SERVER_URL}/pipelines/${GO_PIPELINE_NAME}/${GO_PIPELINE_COUNTER}/${GO_STAGE_NAME}/${GO_STAGE_COUNTER}',
    buildNumber: '${GO_PIPELINE_NAME}/${GO_PIPELINE_COUNTER}/${GO_STAGE_NAME}/${GO_STAGE_COUNTER}',
    git: {
      remote: '${GO_SCM_*_PR_URL/(.*)\\/pull\\/\\d+/\\1.git}',
      revision: '${GO_REVISION}',
      branch: '${GO_SCM_*_PR_BRANCH/.*:(.*)/\\1}',
    },
  },
  {
    name: 'Jenkins',
    url: '${BUILD_URL}',
    buildNumber: '${BUILD_NUMBER}',
    git: {
      remote: '${GIT_URL}',
      revision: '${GIT_COMMIT}',
      branch: '${GIT_LOCAL_BRANCH}',
    },
  },
  {
    name: 'Semaphore',
    url: '${SEMAPHORE_ORGANIZATION_URL}/jobs/${SEMAPHORE_JOB_ID}',
    buildNumber: '${SEMAPHORE_JOB_ID}',
    git: {
      remote: '${SEMAPHORE_GIT_URL}',
      revision: '${SEMAPHORE_GIT_SHA}',
      branch: '${SEMAPHORE_GIT_BRANCH}',
      tag: '${SEMAPHORE_GIT_TAG_NAME}',
    },
  },
  {
    name: 'Travis CI',
    url: '${TRAVIS_BUILD_WEB_URL}',
    buildNumber: '${TRAVIS_JOB_NUMBER}',
    git: {
      remote: 'https://github.com/${TRAVIS_REPO_SLUG}.git',
      revision: '${TRAVIS_COMMIT}',
      branch: '${TRAVIS_BRANCH}',
      tag: '${TRAVIS_TAG}',
    },
  },
  {
    name: 'Wercker',
    url: '${WERCKER_RUN_URL}',
    buildNumber: '${WERCKER_RUN_URL/.*\\/([^\\/]+)$/\\1}',
    git: {
      remote: 'https://${WERCKER_GIT_DOMAIN}/${WERCKER_GIT_OWNER}/${WERCKER_GIT_REPOSITORY}.git',
      revision: '${WERCKER_GIT_COMMIT}',
      branch: '${WERCKER_GIT_BRANCH}',
    },
  },
]

// node_modules/@cucumber/ci-environment/dist/esm/src/evaluateVariableExpression.js
function evaluateVariableExpression(expression, env) {
  if (expression === void 0) {
    return void 0
  }
  try {
    const re = new RegExp('\\${(.*?)(?:(?<!\\\\)/(.*)/(.*))?}', 'g')
    return expression.replace(re, (substring, ...args) => {
      const variable = args[0]
      const value = getValue(env, variable)
      if (value === void 0) {
        throw new Error(`Undefined variable: ${variable}`)
      }
      const pattern = args[1]
      if (!pattern) {
        return value
      }
      const regExp = new RegExp(pattern.replace('/', '/'))
      const match = regExp.exec(value)
      if (!match) {
        throw new Error(`No match for: ${variable}`)
      }
      let replacement = args[2]
      let ref = 1
      for (const group of match.slice(1)) {
        replacement = replacement.replace(`\\${ref++}`, group)
      }
      return replacement
    })
  } catch (err) {
    return void 0
  }
}
function getValue(env, variable) {
  if (variable.includes('*')) {
    const regexp = new RegExp(variable.replace('*', '.*'))
    for (const [name, value] of Object.entries(env)) {
      if (regexp.exec(name)) {
        return value
      }
    }
  }
  return env[variable]
}

// node_modules/@cucumber/ci-environment/dist/esm/src/detectCiEnvironment.js
function detectCiEnvironment(env) {
  for (const ciEnvironment of CiEnvironments) {
    const detected = detect(ciEnvironment, env)
    if (detected) {
      return detected
    }
  }
}
function removeUserInfoFromUrl(value) {
  if (!value) return value
  try {
    const url = new URL(value)
    url.password = ''
    url.username = ''
    return url.toString()
  } catch (ignore) {
    return value
  }
}
function detectGit(ciEnvironment, env) {
  var _a, _b, _c
  const revision = detectRevision(ciEnvironment, env)
  if (!revision) {
    return void 0
  }
  const remote = evaluateVariableExpression(
    (_a = ciEnvironment.git) === null || _a === void 0 ? void 0 : _a.remote,
    env
  )
  if (!remote) {
    return void 0
  }
  const tag = evaluateVariableExpression(
    (_b = ciEnvironment.git) === null || _b === void 0 ? void 0 : _b.tag,
    env
  )
  const branch = evaluateVariableExpression(
    (_c = ciEnvironment.git) === null || _c === void 0 ? void 0 : _c.branch,
    env
  )
  return Object.assign(
    Object.assign({ revision, remote: removeUserInfoFromUrl(remote) }, tag && { tag }),
    branch && { branch }
  )
}
function detectRevision(ciEnvironment, env) {
  var _a, _b, _c
  if (env.GITHUB_EVENT_NAME === 'pull_request') {
    if (!env.GITHUB_EVENT_PATH) throw new Error('GITHUB_EVENT_PATH not set')
    const json = (0, import_fs.readFileSync)(env.GITHUB_EVENT_PATH, 'utf-8')
    const event = JSON.parse(json)
    const revision =
      (_b = (_a = event.pull_request) === null || _a === void 0 ? void 0 : _a.head) === null ||
      _b === void 0
        ? void 0
        : _b.sha
    if (!revision) {
      throw new Error(`Could not find .pull_request.head.sha in ${env.GITHUB_EVENT_PATH}:
${JSON.stringify(event, null, 2)}`)
    }
    return revision
  }
  return evaluateVariableExpression(
    (_c = ciEnvironment.git) === null || _c === void 0 ? void 0 : _c.revision,
    env
  )
}
function detect(ciEnvironment, env) {
  const url = evaluateVariableExpression(ciEnvironment.url, env)
  if (url === void 0) {
    return void 0
  }
  const buildNumber = evaluateVariableExpression(ciEnvironment.buildNumber, env)
  const git = detectGit(ciEnvironment, env)
  return Object.assign(
    {
      name: ciEnvironment.name,
      url,
      buildNumber,
    },
    git && { git }
  )
}

// node_modules/@cucumber/ci-environment/dist/esm/src/index.js
var src_default = detectCiEnvironment

// src/publish.ts
var import_fs3 = __toESM(require('fs'), 1)
var import_http = __toESM(require('http'), 1)
var import_https = __toESM(require('https'), 1)
var import_path2 = require('path')
var import_stream = require('stream')
var import_url = require('url')
var import_util2 = require('util')

// src/manyglob.ts
var import_fast_glob = __toESM(require_out4(), 1)
var os = __toESM(require('os'), 1)
async function manyglob(globs2) {
  return (
    await Promise.all(
      globs2.reduce((prev, glob) => {
        return prev.concat((0, import_fast_glob.default)(glob.replace(/^~/, os.homedir())))
      }, [])
    )
  ).flatMap((paths) => paths)
}

// src/readStream.ts
async function readStream(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

// src/zipPaths.ts
var import_adm_zip = __toESM(require_adm_zip(), 1)
var import_fs2 = __toESM(require('fs'), 1)
var os2 = __toESM(require('os'), 1)
var import_path = require('path')
var import_util = require('util')
var readFile = (0, import_util.promisify)(import_fs2.default.readFile)
var writeFile = (0, import_util.promisify)(import_fs2.default.writeFile)
var mkdtemp = (0, import_util.promisify)(import_fs2.default.mkdtemp)
var realpath = (0, import_util.promisify)(import_fs2.default.realpath)
var rm = (0, import_util.promisify)(import_fs2.default.rm)
async function zipPaths(paths) {
  const nonZips = paths.filter((path) => (0, import_path.extname)(path) !== '.zip')
  const zips = paths.filter((path) => (0, import_path.extname)(path) === '.zip')
  const admZip = new import_adm_zip.default()
  for (const nonZip of nonZips) {
    const content = await readFile(nonZip)
    const name = (0, import_path.basename)(nonZip)
    admZip.addFile(name, content)
  }
  const resultPaths = []
  await withTempFile(
    'one-report-publisher.zip',
    (zipPath) => {
      resultPaths.push(zipPath)
      return writeFile(zipPath, admZip.toBuffer())
    },
    false
  )
  return resultPaths.concat(zips)
}
var withTempFile = (baseName, fn, remove) =>
  withTempDir((dir) => fn((0, import_path.join)(dir, baseName)), remove)
async function withTempDir(fn, remove) {
  const dir = await mkdtemp((await realpath(os2.tmpdir())) + import_path.sep)
  try {
    await fn(dir)
  } finally {
    if (remove) {
      await rm(dir, { recursive: true })
    }
  }
}

// src/publish.ts
var lstat = (0, import_util2.promisify)(import_fs3.default.lstat)
var extensions = ['.xml', '.json', '.ndjson', '.zip']
var contentTypes = {
  '.xml': 'text/xml',
  '.json': 'application/json',
  '.ndjson': 'application/x-ndjson',
  '.zip': 'application/zip',
}
async function publish(globs2, zip2, organizationId2, baseUrl2, env, authenticate, requestTimeout) {
  if (!Array.isArray(globs2)) {
    throw new Error('globs must be an array')
  }
  if (globs2.length === 0) {
    throw new Error('globs cannot be empty')
  }
  const authHeaders = authenticate()
  const url = new import_url.URL(
    `/api/organization/${encodeURIComponent(organizationId2)}/test-cycle`,
    baseUrl2
  )
  const ciEnv = src_default(env)
  const paths = (await manyglob(globs2))
    .filter((path) => extensions.includes((0, import_path2.extname)(path)))
    .sort()
  if (paths.length === 0) {
    throw new Error(`No report files found. Please check your globs: ${JSON.stringify(globs2)}`)
  }
  const publishPaths = zip2 ? await zipPaths(paths) : paths
  return Promise.all(
    publishPaths.map((path) => publishFile(path, url, ciEnv, authHeaders, requestTimeout))
  )
}
async function publishFile(path, url, ciEnv, authHeaders, requestTimeout) {
  return new Promise((resolve, reject) => {
    lstat(path)
      .then((stat) => {
        let h
        switch (url.protocol) {
          case 'http:':
            h = import_http.default
            break
          case 'https:':
            h = import_https.default
            break
          default:
            return reject(new Error(`Unsupported protocol: ${url.toString()}`))
        }
        const headers = {
          'Content-Type': contentTypes[(0, import_path2.extname)(path)],
          'Content-Length': stat.size,
          ...(ciEnv?.git?.remote ? { 'OneReport-SourceControl': ciEnv.git.remote } : {}),
          ...(ciEnv?.git?.revision ? { 'OneReport-Revision': ciEnv.git.revision } : {}),
          ...(ciEnv?.git?.branch ? { 'OneReport-Branch': ciEnv.git.branch } : {}),
          ...(ciEnv?.git?.tag ? { 'OneReport-Tag': ciEnv.git.tag } : {}),
          ...authHeaders,
        }
        const req = h.request(
          url.toString(),
          {
            method: 'POST',
            headers,
          },
          (res) => {
            if (res.statusCode !== 201) {
              return reject(
                new Error(`Unexpected status code ${res.statusCode}
POST ${url.toString()} -d @${path}
> ${Object.entries(headers)
                  .map(([h2, v]) => `${h2}: ${v}`)
                  .join('\n> ')}

< ${Object.entries(res.headers)
                  .map(([h2, v]) => `${h2}: ${v}`)
                  .join('\n< ')}
`)
              )
            }
            readStream(res)
              .then((buffer) => {
                try {
                  const responseBody = JSON.parse(buffer.toString('utf-8'))
                  return resolve(responseBody)
                } catch (err) {
                  reject(err)
                }
              })
              .catch(reject)
          }
        )
        if (requestTimeout) {
          req.setTimeout(requestTimeout)
        }
        req.on('error', reject)
        req.on('timeout', () =>
          reject(new Error(`request to ${url.toString()} timed out after ${requestTimeout}ms`))
        )
        const file = import_fs3.default.createReadStream(path)
        ;(0, import_stream.pipeline)(file, req, (err) => {
          try {
            if (err) return reject(err)
          } finally {
            req.end()
          }
        })
      })
      .catch(reject)
  })
}

// src/action/index.ts
var organizationId = import_core.default.getInput('organization-id')
var token = import_core.default.getInput('token')
var globs = import_core.default.getMultilineInput('reports')
var maxTime = import_core.default.getInput('max-time')
var ignoreError = import_core.default.getBooleanInput('ignore-error')
var baseUrl = import_core.default.getInput('url')
var zip = import_core.default.getBooleanInput('zip')
async function main() {
  const requestTimeout = maxTime ? +maxTime * 1e3 : void 0
  const responseBodies = await publish(
    globs,
    zip,
    organizationId,
    baseUrl,
    process.env,
    tokenAuthenticator(token),
    requestTimeout
  )
  return responseBodies.map((body) =>
    new import_url2.URL(
      `/organization/${organizationId}/test-cycles/${body.testCycleId}`,
      baseUrl
    ).toString()
  )
}
main()
  .then((reportUrls) => {
    import_core.default.setOutput('report-urls', reportUrls)
    import_core.default.startGroup('Report URLs')
    for (const reportUrl of reportUrls) {
      import_core.default.info(reportUrl)
    }
    import_core.default.endGroup()
  })
  .catch((error) => {
    if (ignoreError) {
      import_core.default.info(error.message)
    } else {
      import_core.default.setFailed(error.message)
    }
  })
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
