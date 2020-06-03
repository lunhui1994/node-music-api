/* eslint-disable */
export function getSign (data) {
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let count = Math.floor(Math.random() * 7 + 10)
  let sign = 'zza';
  for (let i = 0; i < count; i++) {
    sign += str[Math.floor(Math.random() * 36)]
  }
  sign += createSign('CJBPACrRuNy7' + JSON.stringify(data))
  return sign
}

function createSign (n, t) {
  function f (n, t) {
    return n << t | n >>> 32 - t
  }

  function h (n, t) {
    var o, e, u, p, r
    return u = 2147483648 & n,
      p = 2147483648 & t,
      r = (1073741823 & n) + (1073741823 & t),
      (o = 1073741824 & n) & (e = 1073741824 & t) ? 2147483648 ^ r ^ u ^ p : o |
      e ? 1073741824 & r ? 3221225472 ^ r ^ u ^ p : 1073741824 ^ r ^ u ^ p : r ^
        u ^ p
  }

  function o (n, t, o, e, u, p, r) {
    var i
    return n = h(n, h(h((i = t) & o | ~i & e, u), r)),
      h(f(n, p), t)
  }

  function e (n, t, o, e, u, p, r) {
    var i
    return n = h(n, h(h(t & (i = e) | o & ~i, u), r)),
      h(f(n, p), t)
  }

  function u (n, t, o, e, u, p, r) {
    return n = h(n, h(h(t ^ o ^ e, u), r)),
      h(f(n, p), t)
  }

  function p (n, t, o, e, u, p, r) {
    return n = h(n, h(h(o ^ (t | ~e), u), r)),
      h(f(n, p), t)
  }

  function r (n) {
    var t, o = '',
      e = ''
    for (t = 0; t <= 3; t++) {
      o += (e = '0' +
        (n >>> 8 * t & 255).toString(16)).substr(e.length - 2, 2)
    }
    return o
  }

  var i, l, c, g, a, s, v, d, y, b
  for (t = t || 32, i = function (n) {
    for (var t, o = n.length,
      e = o + 8,
      u = 16 * (1 + (e - e % 64) / 64), p = Array(u - 1), r = 0, i = 0; i <
    o;) {
      r = i % 4 * 8,
        p[t = (i - i % 4) / 4] = p[t] | n.charCodeAt(i) << r,
        i++
    }
    return r = i % 4 * 8,
      p[t = (i - i % 4) / 4] = p[t] | 128 << r,
      p[u - 2] = o << 3,
      p[u - 1] = o >>> 29,
      p
  }(n = function (n) {
    n = n.replace(/\r\n/g, '\n')
    for (var t = '',
      o = 0; o < n.length; o++) {
      var e = n.charCodeAt(o)
      e < 128 ? t += String.fromCharCode(e) : (127 < e && e < 2048
        ? t += String.fromCharCode(e >> 6 | 192)
        : (t += String.fromCharCode(e >> 12 | 224), t += String.fromCharCode(
          e >> 6 & 63 | 128)), t += String.fromCharCode(63 & e | 128))
    }
    return t
  }(n)), v = 1732584193, d = 4023233417, y = 2562383102, b = 271733878, l = 0; l <
  i.length; l += 16) {
    v = o(c = v, g = d, a = y, s = b, i[l + 0], 7, 3614090360),
      b = o(b, v, d, y, i[l + 1], 12, 3905402710),
      y = o(y, b, v, d, i[l + 2], 17, 606105819),
      d = o(d, y, b, v, i[l + 3], 22, 3250441966),
      v = o(v, d, y, b, i[l + 4], 7, 4118548399),
      b = o(b, v, d, y, i[l + 5], 12, 1200080426),
      y = o(y, b, v, d, i[l + 6], 17, 2821735955),
      d = o(d, y, b, v, i[l + 7], 22, 4249261313),
      v = o(v, d, y, b, i[l + 8], 7, 1770035416),
      b = o(b, v, d, y, i[l + 9], 12, 2336552879),
      y = o(y, b, v, d, i[l + 10], 17, 4294925233),
      d = o(d, y, b, v, i[l + 11], 22, 2304563134),
      v = o(v, d, y, b, i[l + 12], 7, 1804603682),
      b = o(b, v, d, y, i[l + 13], 12, 4254626195),
      y = o(y, b, v, d, i[l + 14], 17, 2792965006),
      v = e(v, d = o(d, y, b, v, i[l + 15], 22, 1236535329), y, b, i[l + 1], 5,
        4129170786),
      b = e(b, v, d, y, i[l + 6], 9, 3225465664),
      y = e(y, b, v, d, i[l + 11], 14, 643717713),
      d = e(d, y, b, v, i[l + 0], 20, 3921069994),
      v = e(v, d, y, b, i[l + 5], 5, 3593408605),
      b = e(b, v, d, y, i[l + 10], 9, 38016083),
      y = e(y, b, v, d, i[l + 15], 14, 3634488961),
      d = e(d, y, b, v, i[l + 4], 20, 3889429448),
      v = e(v, d, y, b, i[l + 9], 5, 568446438),
      b = e(b, v, d, y, i[l + 14], 9, 3275163606),
      y = e(y, b, v, d, i[l + 3], 14, 4107603335),
      d = e(d, y, b, v, i[l + 8], 20, 1163531501),
      v = e(v, d, y, b, i[l + 13], 5, 2850285829),
      b = e(b, v, d, y, i[l + 2], 9, 4243563512),
      y = e(y, b, v, d, i[l + 7], 14, 1735328473),
      v = u(v, d = e(d, y, b, v, i[l + 12], 20, 2368359562), y, b, i[l + 5], 4,
        4294588738),
      b = u(b, v, d, y, i[l + 8], 11, 2272392833),
      y = u(y, b, v, d, i[l + 11], 16, 1839030562),
      d = u(d, y, b, v, i[l + 14], 23, 4259657740),
      v = u(v, d, y, b, i[l + 1], 4, 2763975236),
      b = u(b, v, d, y, i[l + 4], 11, 1272893353),
      y = u(y, b, v, d, i[l + 7], 16, 4139469664),
      d = u(d, y, b, v, i[l + 10], 23, 3200236656),
      v = u(v, d, y, b, i[l + 13], 4, 681279174),
      b = u(b, v, d, y, i[l + 0], 11, 3936430074),
      y = u(y, b, v, d, i[l + 3], 16, 3572445317),
      d = u(d, y, b, v, i[l + 6], 23, 76029189),
      v = u(v, d, y, b, i[l + 9], 4, 3654602809),
      b = u(b, v, d, y, i[l + 12], 11, 3873151461),
      y = u(y, b, v, d, i[l + 15], 16, 530742520),
      v = p(v, d = u(d, y, b, v, i[l + 2], 23, 3299628645), y, b, i[l + 0], 6,
        4096336452),
      b = p(b, v, d, y, i[l + 7], 10, 1126891415),
      y = p(y, b, v, d, i[l + 14], 15, 2878612391),
      d = p(d, y, b, v, i[l + 5], 21, 4237533241),
      v = p(v, d, y, b, i[l + 12], 6, 1700485571),
      b = p(b, v, d, y, i[l + 3], 10, 2399980690),
      y = p(y, b, v, d, i[l + 10], 15, 4293915773),
      d = p(d, y, b, v, i[l + 1], 21, 2240044497),
      v = p(v, d, y, b, i[l + 8], 6, 1873313359),
      b = p(b, v, d, y, i[l + 15], 10, 4264355552),
      y = p(y, b, v, d, i[l + 6], 15, 2734768916),
      d = p(d, y, b, v, i[l + 13], 21, 1309151649),
      v = p(v, d, y, b, i[l + 4], 6, 4149444226),
      b = p(b, v, d, y, i[l + 11], 10, 3174756917),
      y = p(y, b, v, d, i[l + 2], 15, 718787259),
      d = p(d, y, b, v, i[l + 9], 21, 3951481745),
      v = h(v, c),
      d = h(d, g),
      y = h(y, a),
      b = h(b, s)
  }
  return 32 == t ? r(v) + r(d) + r(y) + r(b) : r(d) + r(y)
}