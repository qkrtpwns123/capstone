const { contextBridge, ipcRenderer } = require("electron");
const log = require("electron-log");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: 'capstone',
    password: '',
    database: 'capstone',
    dateStrings: 'date'
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
});

connection.connect(() => {});

contextBridge.exposeInMainWorld('api', {
  login: (userId, userPassword) => {
    const query = 'SELECT * FROM usertable WHERE id = ? AND password = ?';
    connection.query(query, [userId, userPassword], (err, idpass) => {
      if (idpass.length != 0) { 
        ipcRenderer.send('login-success');  
      }
    });
  }
});

contextBridge.exposeInMainWorld('NameBridge', {
  student_name: (num) => {
    return new Promise((resolve, reject) => {
      const query1 = 'SELECT name FROM student WHERE class_num = ?';
      connection.query(query1, num, (err, results) => {
          console.log(results[0].name);
          resolve(results[0].name);
      });
    });
  }
});

contextBridge.exposeInMainWorld('all', {
  all_col: (num) => {
    return new Promise((resolve, reject) => {
      const query1 = 'SELECT datetime,webapp_name,time FROM document WHERE class_num = ?';
      connection.query(query1, num, (err, results) => {
          resolve(results);
      });
    });
  }
});

