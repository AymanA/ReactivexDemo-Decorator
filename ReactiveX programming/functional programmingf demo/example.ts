let strArray = ['aa1', 'bb1', 'cc1', 'dd1', 'aa2', 'bb2', 'cc2', 'dd2'];
strArray.filter(str => str.startsWith('a'))
    .map(str => str.toUpperCase())
    .forEach(str => console.log(str));

