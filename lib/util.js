var util = module.exports;

util.isSimpleType = function (type) {
	return (type === 'uInt32' ||
		type === 'sInt32' ||
		type === 'int32' ||
		type === 'uInt64' ||
		type === 'sInt64' ||
		type === 'float' ||
		type === 'double');
};

util.equal = function (obj0, obj1) {
	for (var key in obj0) {
		var m = obj0[key];
		var n = obj1[key];

		if (typeof (m) === 'object') {
			if (!util.equal(m, n)) {
				return false;
			}
		} else if (m !== n) {
			return false;
		}
	}

	return true;
};


function guessObjectSize(o) {
	let sz = 12;
	for (let k in o) {
		sz += k.length;
		sz += util.guessSize(o[k])
	}
	return sz;
}

function guessArraySize(arr) {
	let sz = 12;
	for (let i = 0; i < arr.length; i++) {
		sz += util.guessSize(arr[i]);
	}
	return sz;
}

util.guessSize = function (o) {
	let sz = 0;
	if (Array.isArray(o)) {
		sz = guessArraySize(o);
	} else if (typeof o === 'object') {
		sz = guessObjectSize(o);
	} else {
		if (typeof o === 'string') sz = o.length * 3;
		else sz = 8;
	}
	return sz;
};