
document.getElementById("login-btn").addEventListener("click", function () {

  const usernameInput = document.getElementById("input-username");

  const username = usernameInput.value;
  console.log(username);

  const inputpassword = document.getElementById("input-password");
  const password = inputpassword.value;
  console.log(password);

  if (username == "admin" && password == "admin123") {
    alert("login Success"); 
    window.location.assign("/home.html"); 
  } else {
    alert("login Failed");
    return;
  }
});

//Username: admin
//Password: admin123