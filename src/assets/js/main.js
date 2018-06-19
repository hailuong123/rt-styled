window.onload = () => { 
  // SET VAR GLOBAL
  let JSONurl      = null;

  // BUTTON DOWNLOAD
  const buttonDown = document.getElementById('download');

  // SET PATH 
  const filePath       = './api.json';

  // READ FILE
  const ReadFile = (file) => {
    let rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
        JSONurl = rawFile.responseText;
      }
    }
    rawFile.send(null);
  }

  // CONVERT TO CSV
  const ConvertToCSV = (objArray) => {
    
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += '\n'
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }

  // RUN READ FILE
  ReadFile(filePath);

  buttonDown.onclick = (e) => {
    const jsonText = ConvertToCSV(JSONurl);
    buttonDown.setAttribute('download', 'download.csv');
    buttonDown.setAttribute('href', 'data:application/csv;charset=UTF-8,' + jsonText);
  }
}


