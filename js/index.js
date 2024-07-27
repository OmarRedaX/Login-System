document.addEventListener("DOMContentLoaded", function() {

    //------------------------------variables-----------------------------

    var signupName = document.getElementById("signupName");
    var signupEmail = document.getElementById("signupEmail");
    var signupPassword = document.getElementById("signupPassword");
    var signupBtn = document.getElementById("signupBtn");
    var signupList = JSON.parse(localStorage.getItem("signupInfo")) || [];
    var signinEmail = document.getElementById("signinEmail");
    var signinPassword = document.getElementById("signinPassword");
    var signinBtn = document.getElementById("signinBtn");
    var userName = document.getElementById("userName");

    //------------------------------functions-----------------------------



    //------------------------------sign up-----------------------------
    function signUp() {

        var checker = true; 

        var signupInfo = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        };

        if (validateInput(signupName) && validateInput(signupEmail)) {

            for (var i = 0; i < signupList.length; i++) {

                if (signupEmail.value === signupList[i].email) {
                    checker = false;
                    break;
                }

            }

            if (checker) {

                signupList.push(signupInfo);
                localStorage.setItem("signupInfo", JSON.stringify(signupList));
                document.getElementById("error").innerHTML = "Signup Successful!";
                document.getElementById("error").classList.replace("text-danger", "text-success");

            } 
            
            else {

                document.getElementById("error").innerHTML = "Email Already Exists";
                document.getElementById("error").classList.replace("text-success", "text-danger");
            }

        } 
        
        else {

            document.getElementById("error").innerHTML = "Email or Name is invalid";
            document.getElementById("error").classList.replace("text-success", "text-danger");
        }
    }


    //------------------------------validation-----------------------------
    function validateInput(element) {

        var regex = {
            signupName: /^[a-zA-Z]{3,}$/,
            signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        };

        return regex[element.id].test(element.value);
    }


    //------------------------------sign in-----------------------------
    function signIn() {
        var check = false;
        var user = {};

        for (var i = 0; i < signupList.length; i++) {
            if (signinEmail.value === signupList[i].email && signinPassword.value === signupList[i].password) {
                check = true;
                user = signupList[i];
                break;
            }
        }

        if (check) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            location.href = "home.html";
        } else {
            document.getElementById("signinError").innerHTML = "Invalid email or password";
            document.getElementById("signinError").classList.add("text-danger");
        }
    }


    //------------------------------evenlisteners-----------------------------
    // before i put if statment there's an error that (TypeError: Cannot read properties of null (reading 'addEventListener')at HTMLDocument)
    if (signinBtn) {

        signinBtn.addEventListener("click", function() {
            signIn();
        });
    }

    if (signupBtn) {

        signupBtn.addEventListener("click", function() {
            signUp();
        });
    }

    //------------------------------welcome message with user name-----------------------------
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && userName) {
        userName.innerHTML = `<h1>Welcome ${user.name} <i class="fa-solid fa-face-smile-beam"></i></h1>`;
    }
});
