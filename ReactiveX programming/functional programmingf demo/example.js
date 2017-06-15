var strArray = ['aa1', 'bb1', 'cc1', 'dd1', 'aa2', 'bb2', 'cc2', 'dd2'];
strArray.filter(function (str) { return str.startsWith('a'); })
    .map(function (str) { return str.toUpperCase(); })
    .forEach(function (str) { return console.log(str); });
