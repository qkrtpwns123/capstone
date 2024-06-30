const test_btn = document.getElementById("test_btn");
test_btn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const record = document.getElementById("record");
    record.innerHTML = `<div class="student-name2" id="nm2"></div>`
    const class_ = document.getElementById("class").value;
    const num_ = document.getElementById("number").value;
    const grade_ = document.getElementById("grade").value;
    const nm2 = document.getElementById("nm2");
    const nm = document.getElementById("nm");
    let num = grade_ + class_ + num_;
    const name = await NameBridge.student_name(num); 
    const recordload = await all.all_col(num)
    nm.innerText = name;
    nm2.innerText = `학생 ${name} 기록` 
    for(start=0; start<recordload.length; start++){
      record.innerHTML += (`<div class="student-record-container">
          <div class="flex-item record"><a id="text">${recordload[start].webapp_name}</a></div>
          <div class="flex-item record"><a id="text">날짜:${recordload[start].datetime}<br>사용시간:${recordload[start].time}</a></div>
        </div>`)
    }
  } catch (error) {}
});


