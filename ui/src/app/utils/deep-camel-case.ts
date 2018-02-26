import {
  camelCase as _camelCase_,
  isArray as _isArray_,
  isPlainObject as _isPlainObject_,
  mapKeys as _mapKeys_
} from 'lodash';

export function deepCamelCase<T>(src: any): T {
  return _deepCamelCase(src);
}

function _deepCamelCase(src: any) {
  if (!_isArray_(src) && !_isPlainObject_(src)) {
    return src;
  }

  if (_isArray_(src)) {
    let arr = [];

    src.forEach((el, i) => {
      arr.push(_deepCamelCase(el));
    });

    return arr;
  }

  if (_isPlainObject_(src)) {
    let obj = {};

    Object.keys(src).forEach((el) => {
      obj[_camelCase_(el)] = _deepCamelCase(src[el]);
    });

    return obj;
  }
}
