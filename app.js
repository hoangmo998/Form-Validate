let userName = document.getElementById("UserName");
let email = document.getElementById("Email");
let pwd = document.getElementById("Password");
let conPwd = document.getElementById("ConPwd");
let form = document.querySelector("form");
let btn_submit = document.getElementById('btn-submit');

function validate() {
    validateFieldName(userName);
    validateFieldEmail(email);
    validateFieldPwd(pwd);
    validateFieldRepeatPwd(conPwd);
}

userName.onblur = function() {
    validateFieldName(userName)
};
email.onblur = function() {
    validateFieldEmail(email)
};
pwd.onblur = function() {
    validateFieldPwd(pwd)
}
conPwd.onblur = function() {
    validateFieldRepeatPwd(conPwd)
}

// validate từng field

// userName
function validateFieldName(userName) {
    if (userName.value === "") {
        onError(userName, "Tên không được để trống");
        return false
    } else {
        if (isValideName(userName)) {
            onSuccess(userName);
            return true
        } else {
            onError(userName, "Tên chữ hoa, chữ thường, không có kí tự đặc biệt");
            return false
        }
    }
}
// email
function validateFieldEmail(email) {
    if (email.value.trim() === "") {
        onError(email, "Email không được để trống");
        return false
    } else {
        if (!isValidEmail(email.value.trim())) {
            onError(email, "Email không hợp lệ");
            return false
        } else {
            onSuccess(email);
            return true
        }
    }
}
// password
function validateFieldPwd(pwd) {
    if (pwd.value.trim() === "") {
        onError(pwd, "Password không được để trống");
        return false
    } else {
        if (!isValidPassword(pwd.value)) {
            onError(pwd, "Password từ 8-32 ký tự gồm 1 chữ hoa và 1 chữ thường")
            return false
        } else {
            onSuccess(pwd);
            return true
        }
    }
}
// repeat Password 
function validateFieldRepeatPwd(conPwd) {
    if (conPwd.value.trim() === "") {
        onError(conPwd, "Password lặp lại không được để trống");
        return false
    } else {
        if (pwd.value.trim() !== conPwd.value.trim()) {
            onError(conPwd, "Password & Xác nhận Password không khớp");
            return false
        } else {
            onSuccess(conPwd);
            return true
        }
    }

}


form.onsubmit = function(e) {
    e.preventDefault()
    var isFormValid;
    validate()
    if (validateFieldName(userName) && validateFieldEmail(email) && validateFieldPwd(pwd) && validateFieldRepeatPwd(conPwd)) {
        let allInput = form.querySelectorAll('[name]')
            // console.log(allInput)
        var formValues = Array.from(allInput).reduce((Values_Obj, input) => {
                Values_Obj[input.name] = input.value
                return Values_Obj
            }, {})
            // console.log(formValues)
        document.getElementById('submit-success').innerHTML = "Đăng ký thành công! Chúc mừng " + formValues.username
        document.getElementById('popup').style.display = "block";

        isFormValid = true
    } else {
        isFormValid = false
    }
    // console.log(isFormValid)
    return isFormValid;
}

function onSuccess(input) {
    let parent = input.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.visibility = "hidden";
    parent.classList.remove("error");
    parent.classList.add("success");
    btn_submit.disabled = false;
}

function onError(input, message) {
    let parent = input.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.visibility = "visible";
    messageEle.innerText = message;
    parent.classList.add("error");
    parent.classList.remove("success");
    btn_submit.disabled = true;
}

function isValideName(userName) {
    let specialCharacter = new RegExp('[!@#$%^&*(),.?":{}|<>]')
    let vietnameseName = new RegExp("^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$");
    if (vietnameseName.test(userName.value) || !specialCharacter.test(userName.value) && userName.value.trim()) {
        return true;
    } else {
        return false;
    }
}

function isValidEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password);
}