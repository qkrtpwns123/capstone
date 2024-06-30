const login_page_btn = document.getElementById("login_btn")


login_page_btn.addEventListener('click', (e)=> {
  e.preventDefault();
  try {
    const userId = document.getElementById("id").value;
    const userPassword = document.getElementById("password").value;
    console.log("로그인 시도: ", { userId, userPassword });
    api.login(userId,userPassword);
  } catch (error) {
    console.log("로그인 실패");
  }
})