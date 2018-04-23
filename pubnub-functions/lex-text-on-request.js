const vault = require('vault');
const xhr = require('xhr');

/**
 * This is a REST (On Request) Event handler. Make a POST request here and Amazon Lex
 *     API will return the Chatbot reply!
 *
 * @note Sample POST body:
        {
            "data": {
                "lex": {
                    "botAlias": "MyBotAlias",
                    "botName": "MyBotName",
                    "contentType": "text/plain; charset=utf-8",
                    "inputText": "hi bot!",
                    "userId": "SomeID"
                }
            }
        }
 *
 * @return {Object} A JSON Object with "lex_text" as a human readable string and
 *     "lex_sound" as a base64 string of audio content of the reply
 */
 
 
/**
 * Convert ByteArray to Base64 encoded string.
 *
 * @param {ByteArray} arrayBuffer - Reference on array buffer which should be encoded to
 *     Base64 string.
 *
 * @note Code taken from https://gist.github.com/jonleighton/958841#gistcomment-1953137.
 *
 * @return {String} Base64 encoded ByteArray.
 */
const ByteArrayToBase64 = (arrayBuffer) => {
    let base64 = '';
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    let a;
    let b;
    let c;
    let d;
    let chunk;

    for (let i = 0; i < mainLength; i += 3) {
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        a = (chunk & 16515072) >> 18;
        b = (chunk & 258048) >> 12;
        c = (chunk & 4032) >> 6;
        d = chunk & 63;

        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    if (byteRemainder === 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2;
        b = (chunk & 3) << 4;

        base64 += `${encodings[a]}${encodings[b]}==`;
    } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10;
        b = (chunk & 1008) >> 4;

        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += `${encodings[a]}${encodings[b]}${encodings[c]}=`;
    }

    return base64;
};

export default (request, response) => {

    var crypto;!function(){var ERROR="input is invalid type",WINDOW=!1;crypto=WINDOW?window:{};var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!crypto.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?crypto=global:WEB_WORKER&&(crypto=self);var COMMON_JS=!1,AMD="function"==typeof define&&define.amd,ARRAY_BUFFER=true,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[];!crypto.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!crypto.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t,h){return function(r){return new Sha256(h,!0).update(r)[t]()}},createMethod=function(t){var h=createOutputMethod("hex",t);NODE_JS&&(h=nodeWrap(h,t)),h.create=function(){return new Sha256(t)},h.update=function(t){return h.create().update(t)};for(var r=0;r<OUTPUT_TYPES.length;++r){var s=OUTPUT_TYPES[r];h[s]=createOutputMethod(s,t)}return h},nodeWrap=function(method,is224){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),algorithm=is224?"sha224":"sha256",nodeMethod=function(t){if("string"==typeof t)return crypto.createHash(algorithm).update(t,"utf8").digest("hex");if(null==t)throw new Error(ERROR);return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash(algorithm).update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod},createHmacOutputMethod=function(t,h){return function(r,s){return new HmacSha256(r,h,!0).update(s)[t]()}},createHmacMethod=function(t){var h=createHmacOutputMethod("hex",t);h.create=function(h){return new HmacSha256(h,t)},h.update=function(t,r){return h.create(t).update(r)};for(var r=0;r<OUTPUT_TYPES.length;++r){var s=OUTPUT_TYPES[r];h[s]=createHmacOutputMethod(s,t)}return h};function Sha256(t,h){h?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function HmacSha256(t,h,r){var s,e=typeof t;if("string"===e){var i,o=[],a=t.length,H=0;for(s=0;s<a;++s)(i=t.charCodeAt(s))<128?o[H++]=i:i<2048?(o[H++]=192|i>>6,o[H++]=128|63&i):i<55296||i>=57344?(o[H++]=224|i>>12,o[H++]=128|i>>6&63,o[H++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),o[H++]=240|i>>18,o[H++]=128|i>>12&63,o[H++]=128|i>>6&63,o[H++]=128|63&i);t=o}else{if("object"!==e)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR)}t.length>64&&(t=new Sha256(h,!0).update(t).array());var n=[],c=[];for(s=0;s<64;++s){var S=t[s]||0;n[s]=92^S,c[s]=54^S}Sha256.call(this,h,r),this.update(c),this.oKeyPad=n,this.inner=!0,this.sharedMemory=r}Sha256.prototype.update=function(t){if(!this.finalized){var h,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR);h=!0}for(var s,e,i=0,o=t.length,a=this.blocks;i<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),h)for(e=this.start;i<o&&e<64;++i)a[e>>2]|=t[i]<<SHIFT[3&e++];else for(e=this.start;i<o&&e<64;++i)(s=t.charCodeAt(i))<128?a[e>>2]|=s<<SHIFT[3&e++]:s<2048?(a[e>>2]|=(192|s>>6)<<SHIFT[3&e++],a[e>>2]|=(128|63&s)<<SHIFT[3&e++]):s<55296||s>=57344?(a[e>>2]|=(224|s>>12)<<SHIFT[3&e++],a[e>>2]|=(128|s>>6&63)<<SHIFT[3&e++],a[e>>2]|=(128|63&s)<<SHIFT[3&e++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++i)),a[e>>2]|=(240|s>>18)<<SHIFT[3&e++],a[e>>2]|=(128|s>>12&63)<<SHIFT[3&e++],a[e>>2]|=(128|s>>6&63)<<SHIFT[3&e++],a[e>>2]|=(128|63&s)<<SHIFT[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha256.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=EXTRA[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha256.prototype.hash=function(){var t,h,r,s,e,i,o,a,H,n=this.h0,c=this.h1,S=this.h2,f=this.h3,R=this.h4,A=this.h5,u=this.h6,E=this.h7,_=this.blocks;for(t=16;t<64;++t)h=((e=_[t-15])>>>7|e<<25)^(e>>>18|e<<14)^e>>>3,r=((e=_[t-2])>>>17|e<<15)^(e>>>19|e<<13)^e>>>10,_[t]=_[t-16]+h+_[t-7]+r<<0;for(H=c&S,t=0;t<64;t+=4)this.first?(this.is224?(i=300032,E=(e=_[0]-1413257819)-150054599<<0,f=e+24177077<<0):(i=704751109,E=(e=_[0]-210244248)-1521486534<<0,f=e+143694565<<0),this.first=!1):(h=(n>>>2|n<<30)^(n>>>13|n<<19)^(n>>>22|n<<10),s=(i=n&c)^n&S^H,E=f+(e=E+(r=(R>>>6|R<<26)^(R>>>11|R<<21)^(R>>>25|R<<7))+(R&A^~R&u)+K[t]+_[t])<<0,f=e+(h+s)<<0),h=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),s=(o=f&n)^f&c^i,u=S+(e=u+(r=(E>>>6|E<<26)^(E>>>11|E<<21)^(E>>>25|E<<7))+(E&R^~E&A)+K[t+1]+_[t+1])<<0,h=((S=e+(h+s)<<0)>>>2|S<<30)^(S>>>13|S<<19)^(S>>>22|S<<10),s=(a=S&f)^S&n^o,A=c+(e=A+(r=(u>>>6|u<<26)^(u>>>11|u<<21)^(u>>>25|u<<7))+(u&E^~u&R)+K[t+2]+_[t+2])<<0,h=((c=e+(h+s)<<0)>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),s=(H=c&S)^c&f^a,R=n+(e=R+(r=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))+(A&u^~A&E)+K[t+3]+_[t+3])<<0,n=e+(h+s)<<0;this.h0=this.h0+n<<0,this.h1=this.h1+c<<0,this.h2=this.h2+S<<0,this.h3=this.h3+f<<0,this.h4=this.h4+R<<0,this.h5=this.h5+A<<0,this.h6=this.h6+u<<0,this.h7=this.h7+E<<0},Sha256.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,r=this.h2,s=this.h3,e=this.h4,i=this.h5,o=this.h6,a=this.h7,H=HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[h>>28&15]+HEX_CHARS[h>>24&15]+HEX_CHARS[h>>20&15]+HEX_CHARS[h>>16&15]+HEX_CHARS[h>>12&15]+HEX_CHARS[h>>8&15]+HEX_CHARS[h>>4&15]+HEX_CHARS[15&h]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o];return this.is224||(H+=HEX_CHARS[a>>28&15]+HEX_CHARS[a>>24&15]+HEX_CHARS[a>>20&15]+HEX_CHARS[a>>16&15]+HEX_CHARS[a>>12&15]+HEX_CHARS[a>>8&15]+HEX_CHARS[a>>4&15]+HEX_CHARS[15&a]),H},Sha256.prototype.toString=Sha256.prototype.hex,Sha256.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,r=this.h2,s=this.h3,e=this.h4,i=this.h5,o=this.h6,a=this.h7,H=[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,r>>24&255,r>>16&255,r>>8&255,255&r,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o];return this.is224||H.push(a>>24&255,a>>16&255,a>>8&255,255&a),H},Sha256.prototype.array=Sha256.prototype.digest,Sha256.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),h.setUint32(20,this.h5),h.setUint32(24,this.h6),this.is224||h.setUint32(28,this.h7),t},HmacSha256.prototype=new Sha256,HmacSha256.prototype.finalize=function(){if(Sha256.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();Sha256.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports,exports.sha224=createMethod(!0),exports.sha256.hmac=createHmacMethod(),exports.sha224.hmac=createHmacMethod(!0),COMMON_JS?module.exports=exports:(crypto.sha256=exports.sha256,crypto.sha224=exports.sha224,AMD&&define(function(){return exports}))}();

    // http://docs.amazonwebservices.com/general/latest/gr/signature-version-4.html
    
    function hmac(key, string, encoding) {
     
      var hash = crypto.sha256.hmac.create(key).update(string);
     
      if (encoding && encoding == "hex") {
          return hash.hex();
      }
      return hash.array();
    }
    
    function hash(string, encoding) {
      var hash = crypto.sha256.create().update(string);
 
      if (encoding && encoding == "hex") {
          return hash.hex();
      }
      return hash;
    }
    
    // This function assumes the string has already been percent encoded
    function encodeRfc3986(urlEncodedString) {
      return urlEncodedString.replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase()
      })
    }
    
    // request: { path | body, [host], [method], [headers], [service], [region] }
    // credentials: { accessKeyId, secretAccessKey, [sessionToken] }
    function RequestSigner(request, credentials) {
    
      var headers = request.headers = (request.headers || {}),
          hostParts = this.matchHost(request.hostname || request.host || headers.Host || headers.host)
    
      this.request = request
      this.credentials = credentials
    
      this.service = request.service || hostParts[0] || ''
      this.region = request.region || hostParts[1] || 'us-east-1'
    
      // SES uses a different domain from the service name
      if (this.service === 'email') this.service = 'ses'
    
      if (!request.method && request.body)
        request.method = 'POST'
    
      if (!headers.Host && !headers.host) {
        headers.Host = request.hostname || request.host || this.createHost()
    
        // If a port is specified explicitly, use it as is
        if (request.port)
          headers.Host += ':' + request.port
      }
      if (!request.hostname && !request.host)
        request.hostname = headers.Host || headers.host
    
      this.isCodeCommitGit = this.service === 'codecommit' && request.method === 'GIT'
    }
    
    RequestSigner.prototype.matchHost = function(host) {
      var match = (host || '').match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com$/)
      var hostParts = (match || []).slice(1, 3);

      // ES's hostParts are sometimes the other way round, if the value that is expected
      // to be region equals ‘es’ switch them back
      // e.g. search-cluster-name-aaaa00aaaa0aaa0aaaaaaa0aaa.us-east-1.es.amazonaws.com
      if (hostParts[1] === 'es')
        hostParts = hostParts.reverse()
    
      return hostParts
    }
    
    // http://docs.aws.amazon.com/general/latest/gr/rande.html
    RequestSigner.prototype.isSingleRegion = function() {
      // Special case for S3 and SimpleDB in us-east-1
      if (['s3', 'sdb'].indexOf(this.service) >= 0 && this.region === 'us-east-1') return true
    
      return ['cloudfront', 'ls', 'route53', 'iam', 'importexport', 'sts']
        .indexOf(this.service) >= 0
    }
    
    RequestSigner.prototype.createHost = function() {
      var region = this.isSingleRegion() ? '' :
            (this.service === 's3' && this.region !== 'us-east-1' ? '-' : '.') + this.region,
          service = this.service === 'ses' ? 'email' : this.service
      return service + region + '.amazonaws.com'
    }
    
    RequestSigner.prototype.prepareRequest = function() {
      this.parsePath()
    
      var request = this.request, headers = request.headers, query
      var requestBody = request.body;

      headers['X-Amz-Content-Sha256'] = 'UNSIGNED-PAYLOAD';

      if (headers['X-Amz-Date'] || headers['x-amz-date'])
          this.datetime = headers['X-Amz-Date'] || headers['x-amz-date']
      else
        headers['X-Amz-Date'] = this.getDateTime();

      delete headers['Content-Type'];
      delete headers.Authorization
      delete headers.authorization
    }
    
    RequestSigner.prototype.sign = function() {
      if (!this.parsedPath) this.prepareRequest()
    
      if (this.request.signQuery) {
        this.parsedPath.query['X-Amz-Signature'] = this.signature()
      } else {
        this.request.headers.Authorization = this.authHeader()
      }
    
      this.request.path = this.formatPath()
    
      return this.request
    }
    
    RequestSigner.prototype.getDateTime = function() {
      if (!this.datetime) {
        var headers = this.request.headers,
          date = new Date(headers.Date || headers.date || new Date)
    
        this.datetime = date.toISOString().replace(/[:\-]|\.\d{3}/g, '')
    
        // Remove the trailing 'Z' on the timestamp string for CodeCommit git access
        if (this.isCodeCommitGit) this.datetime = this.datetime.slice(0, -1)
      }
      return this.datetime
    }
    
    RequestSigner.prototype.getDate = function() {
      return this.getDateTime().substr(0, 8)
    }
    
    RequestSigner.prototype.authHeader = function() {
      return [
        'AWS4-HMAC-SHA256 Credential=' + this.credentials.accessKeyId + '/' + this.credentialString(),
        'SignedHeaders=' + this.signedHeaders(),
        'Signature=' + this.signature(),
      ].join(', ')
    }
    
    RequestSigner.prototype.signature = function() {
      var date = this.getDate(),
          cacheKey = [this.credentials.secretAccessKey, date, this.region, this.service].join(),
          kDate, kRegion, kService, kCredentials
    
      kDate = hmac('AWS4' + this.credentials.secretAccessKey, date)
      kRegion = hmac(kDate, this.region)
      kService = hmac(kRegion, this.service)
      kCredentials = hmac(kService, 'aws4_request')
      return hmac(kCredentials, this.stringToSign(), 'hex')
    }
    
    RequestSigner.prototype.stringToSign = function() {
      return [
        'AWS4-HMAC-SHA256',
        this.getDateTime(),
        this.credentialString(),
        hash(this.canonicalString(), 'hex'),
      ].join('\n')
    }
    
    RequestSigner.prototype.canonicalString = function() {
      if (!this.parsedPath) this.prepareRequest()
    
      var pathStr = this.parsedPath.path,
          query = this.parsedPath.query,
          headers = this.request.headers,
          queryStr = '',
          normalizePath = this.service !== 's3',
          decodePath = this.service === 's3' || this.request.doNotEncodePath,
          decodeSlashesInPath = this.service === 's3',
          firstValOnly = this.service === 's3',
          bodyHash
    
      if (this.service === 's3' && this.request.signQuery) {
        bodyHash = 'UNSIGNED-PAYLOAD'
      } else if (this.isCodeCommitGit) {
        bodyHash = ''
      } else {
        bodyHash = headers['X-Amz-Content-Sha256'] || headers['x-amz-content-sha256'] ||
          hash(this.request.body || '', 'hex')
      }
    
      return [
        this.request.method || 'GET',
        pathStr,
        queryStr,
        this.canonicalHeaders() + '\n',
        this.signedHeaders(),
        bodyHash,
      ].join('\n')
    }
    
    RequestSigner.prototype.canonicalHeaders = function() {
      var headers = this.request.headers
      function trimAll(header) {
        return header.toString().trim().replace(/\s+/g, ' ')
      }
      return Object.keys(headers)
        .sort(function(a, b) { return a.toLowerCase() < b.toLowerCase() ? -1 : 1 })
        .map(function(key) { return key.toLowerCase() + ':' + trimAll(headers[key]) })
        .join('\n')
    }
    
    RequestSigner.prototype.signedHeaders = function() {
      return Object.keys(this.request.headers)
        .map(function(key) { return key.toLowerCase() })
        .sort()
        .join(';')
    }
    
    RequestSigner.prototype.credentialString = function() {
      return [
        this.getDate(),
        this.region,
        this.service,
        'aws4_request',
      ].join('/')
    }
    
    RequestSigner.prototype.parsePath = function() {
      var path = this.request.path || '/',
          queryIx = path.indexOf('?'),
          query = null
    
      this.parsedPath = {
        path: path,
        query: query,
      }
    }
    
    RequestSigner.prototype.formatPath = function() {
      var path = this.parsedPath.path,
          query = this.parsedPath.query
    
      if (!query) return path
    
      // Services don't support empty query string keys
      if (query[''] != null) delete query['']
    
      return path
    }
    
    function signAWS(request, credentials) {
      return new RequestSigner(request, credentials).sign()
    }
    
    let payload;
    
    try {
        payload = JSON.parse(request.body).data;
    } catch (e) {
        console.error(e);
        response.status = 400;
        return response.send("Malformed JSON body.");
    }
    
    if (payload.lex) {
        return vault.get('AWS_access_key').then((AWS_access_key) => {
            return vault.get('AWS_secret_key').then((AWS_secret_key) => {
                let lex = payload.lex;
                const botName = lex.botName;
                const botAlias = lex.botAlias;
                const user = lex.user || 'PubNubFunctionsLex';
                const contentType = lex.contentType;
                const inputText = lex.inputText;

                let opts = {
                    path: `/bot/${botName}/alias/${botAlias}/user/${user}/content`,
                    service: 'lex',
                    region: 'us-east-1',
                    headers: {},
                    host: 'runtime.lex.us-east-1.amazonaws.com',
                    body: inputText,
                };
                
                signAWS(opts, { accessKeyId: AWS_access_key, secretAccessKey: AWS_secret_key });

                const http_options = {
                  'method': 'POST',
                  'body': opts.body,
                  'headers': opts.headers
                };

                opts.headers['Content-Type'] = contentType;

                return xhr.fetch('https://' + opts.host + opts.path, http_options).then((res) => {
                    let payload = {};
                    
                    if (res.body) {
                        payload['lex_text'] = res.headers['x-amz-lex-message'];
                        payload['lex_sound'] = ByteArrayToBase64(res['$buffer'].data);
                    } else {
                        const body = JSON.parse(res.body);
                        payload['error'] = body['message'];
                        response.status = 400;
                        return response.send('Bad Request');
                    }
                    
                    response.status = 200;
                    return response.send(payload);
                }).catch((error) => {
                    console.error(error);
                    response.status = 400;
                    return response.send('Bad Request');
                });
            });
        });
    } else {
        console.error(error);
        response.status = 400;
        return response.send('Bad Request');
    }
};
