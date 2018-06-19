
export let ReadFile = (file: any) => {
  let rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = (): any => {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
      var JSONurl = rawFile.responseText;
      return JSONurl;
    }
  };
  return rawFile.send(null);
};

// CONVERT TO CSV
export let ConvertToCSV = (objArray: any) => {
  var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  /*var headerCsv = Object.keys(array[0]).filter(i => {
    return i !== '_id' && i !== 'createdAt' && i !== 'createdAt' && i !== 'updatedAt' && i !== '__v';
  }).join(',');*/
  var headerCsv = Object.keys(array[0]).join(',');
  
  var str = headerCsv + '\n';

  Object.keys(array).map((item: any, i: number) => {
    var line = '';
    Object.keys(array[item]).map((childItem: any, index: number) => {
      
      if (line !== '') {
        line += ',';
      }
      line += array[item][childItem];
    });
    str += line + '\r\n';
  });
  return str;
};
