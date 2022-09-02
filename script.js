let username = document.querySelector(".Username");
//username 0 is alert message
//Not Longer than 20 chars is ok
let email = document.querySelector(".Email");
//Too complex later do
let password = document.querySelector(".Password");
//Over 8 word, with special symbol, cap and small
//and numeric number
let submit = document.querySelector('input[type="submit"]');

let alertanprop = {
  duration: 100,
  easing: "linear ",
  direction: "alternate",
  iterations: 2,
};
submit.addEventListener("click", (e) => {
  e.preventDefault(); //prevent refreshing
  //Validate username
  let uservalid = null;

  if (
    username.children[2].value.length <= 2 ||
    username.children[2].value.length > 20 ||
    specialp(username.children[2].value) ||
    !userformat(username.children[2].value)
  ) {
    uservalid = false;
    username.children[0].style.display = "none";
    username.children[1].style.display = "inline";
    username.children[1].textContent =
      " must be more than 2, less than 20 characters";
    if (specialp(username.children[2].value)) {
      username.children[1].textContent = "No special characters is allowed";
    }
    if (!userformat(username.children[2].value)) {
      username.children[1].textContent = "Wrong Format";
    }
    username.children[1].animate(
      [
        { transform: "translate(-10px,20px)" },
        { transform: "translate(0px, 20px)" },
        { transform: "translate(10px,20px)" },
        { transform: "translate(0px, 20px)" },
        { transform: "translate(-10px,20px)" },
      ],
      alertanprop
    );
    username.children[2].setAttribute("id", "notvalidstate");
    username.children[3].setAttribute("id", "notvalidstate");

    if (username.children[2].value.length === 0) {
      username.children[1].style.display = "none";
      username.children[0].style.display = "inline";
      username.children[0].animate(
        [
          { transform: "translate(-10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(-10px,20px)" },
        ],
        alertanprop
      );
    }
  } else {
    uservalid = true;
  }
  //initialize slot states
  username.children[2].addEventListener("focus", () => {
    username.children[2].removeAttribute("id", "notvalidstate");
    username.children[3].removeAttribute("id", "notvalidstate");
    username.children[0].style.display = "none";
    username.children[1].style.display = "none";
  });
  //validate password
  let passvalid = null;
  let passval = password.children[2].value;
  if (
    passval.length < 8 ||
    !specialp(passval) ||
    !numericp(passval) ||
    !Upperp(passval) ||
    !Lowerp(passval)
  ) {
    passvalid = false;
    password.children[0].style.display = "none";
    password.children[1].style.display = "inline";
    password.children[1].animate(
      [
        { transform: "translate(-10px,100px)" },
        { transform: "translate(0px, 100px)" },
        { transform: "translate(10px,100px)" },
        { transform: "translate(0px, 100px)" },
        { transform: "translate(-10px,100px)" },
      ],
      alertanprop
    );
    password.children[2].setAttribute("id", "notvalidstate");
    password.children[3].setAttribute("id", "notvalidstate");

    if (password.children[2].value.length === 0) {
      password.children[1].style.display = "none";
      password.children[0].style.display = "inline";
      password.children[0].animate(
        [
          { transform: "translate(-10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(-10px,20px)" },
        ],
        alertanprop
      );
    }
  } else {
    passvalid = true;
  }
  password.children[2].addEventListener("focus", () => {
    password.children[2].removeAttribute("id", "notvalidstate");
    password.children[3].removeAttribute("id", "notvalidstate");
    password.children[0].style.display = "none";
    password.children[1].style.display = "none";
  });
  //email validation
  let emailvalid = null;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.children[2].value.match(mailformat)) {
    emailvalid = false;
    email.children[0].style.display = "none";
    email.children[1].style.display = "inline";
    email.children[1].animate(
      [
        { transform: "translate(-10px,20px)" },
        { transform: "translate(0px, 20px)" },
        { transform: "translate(10px,20px)" },
        { transform: "translate(0px, 20px)" },
        { transform: "translate(-10px,20px)" },
      ],
      alertanprop
    );
    email.children[2].setAttribute("id", "notvalidstate");
    email.children[3].setAttribute("id", "notvalidstate");

    if (email.children[2].value.length == 0) {
      email.children[0].style.display = "inline";
      email.children[1].style.display = "none";
      email.children[0].animate(
        [
          { transform: "translate(-10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(10px,20px)" },
          { transform: "translate(0px, 20px)" },
          { transform: "translate(-10px,20px)" },
        ],
        alertanprop
      );
    }
  } else {
    emailvalid = true;
  }
  email.children[2].addEventListener("focus", () => {
    email.children[2].removeAttribute("id", "notvalidstate");
    email.children[3].removeAttribute("id", "notvalidstate");
    email.children[0].style.display = "none";
    email.children[1].style.display = "none";
  });
  if (uservalid && emailvalid && passvalid) {
    console.log("All Set!");
    var myBlob = new Blob(
      [
        `Username: ${username.children[2].value}\nEmail: ${email.children[2].value}\nPassword: ${password.children[2].value}\n\nThank you, ${username.children[2].value}`,
      ],
      {
        type: "text/plain",
      }
    );
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Details.txt";
    anchor.click();
    username.children[2].value = "";
    email.children[2].value = "";
    password.children[2].value = "";
  } else {
    console.log("Retype");
  }
});
function specialp(password) {
  for (var i in password) {
    var fal = null;
    if (
      (password[i] >= "!" && password[i] <= "/") ||
      (password[i] >= ":" && password[i] <= "@") ||
      (password[i] >= "[" && password[i] <= "`") ||
      (password[i] >= "{" && password[i] <= "~")
    ) {
      return true;
    } else {
      fal = false;
    }
  }
  return fal;
}
function numericp(password) {
  var fal = null;
  for (var i in password) {
    if (password[i] >= "0" && password[i] <= "9") {
      return true;
    } else {
      fal = false;
    }
  }
  return fal;
}
function Upperp(password) {
  var fal = null;
  for (var i in password) {
    if (password[i] >= "A" && password[i] <= "Z") {
      return true;
    } else {
      fal = false;
    }
  }
  return fal;
}
function Lowerp(password) {
  var fal = null;
  for (var i in password) {
    if (password[i] >= "a" && password[i] <= "z") {
      return true;
    } else {
      fal = false;
    }
  }
  return fal;
}
function userformat(user) {
  for (var i = 0; i < user.length; i++) {
    if (user[i] === " " && user[i - 1] === " ") {
      return false;
    }
  }
  if (user[0] === " " || user[user.length - 1] === " " || user === "") {
    return false;
  }

  return true;
}

let html = document.getElementsByTagName("html")[0];
window.addEventListener("resize", (e) => {
  if (parseFloat(window.getComputedStyle(html).width) <= 1000) {
    var audio = new Audio("Audio.mp3");
    audio.volume = 0.09;
    audio.play();
  }
});
