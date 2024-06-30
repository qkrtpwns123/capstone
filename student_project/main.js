const { app } = require('electron');
const activeWin = require('active-win');
const mysql = require('mysql');
const fetch = require('node-fetch'); // 외부 API 요청을 위해 사용

var connection = mysql.createConnection({
  host: '',//주소
  user: 'capstone', // db 유저
  password: '',
  database: 'capstone'
});

connection.connect();

let class_num = 1234;
let title = "";
let time = 0;
let on_time_minutes = [25, 45, 15]; // 꺼지는 시간, 켜지는 시간, 야자 시작 시간
let on_time_switch = true;
let on_computer = true;

async function getCurrentTime() {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/etc/utc');
    const data = await response.json();
    return new Date(data.datetime);
  } catch (error) {}
}

app.on('ready', async () => {
  setInterval(async () => {
    const window = await activeWin();
    try {
      let today = await getCurrentTime();
      if (title !== window.title && window.title !== "" && on_time_switch == true) {
        if (time >= 0) {
          sql = 'INSERT INTO document (id,class_num, datetime, webapp_name, time) VALUES(null,?, ?, ?, ?)';
          params = [class_num, today.getFullYear() + ':' + (today.getMonth() + 1) + ':' + today.getDate(), title, Math.floor(time / 3600) + ':' + Math.floor(time / 60) + ':' + Math.floor(time % 60)];
          console.log(params)
          connection.query(sql, params, function (err, rows, fields) {});
          title = window.title;
          time = 0;
        } else {
          title = window.title;
          time = 0;
        }
      }
      time += 0.1;
    } catch (e) {
      console.log(e);
    }
  }, 100);
}); // 0.1초마다 앱 정보를 출력합니다.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
