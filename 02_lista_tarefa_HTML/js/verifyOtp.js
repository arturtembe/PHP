import endpoint from "./endpoint.js";

let otpGen;
let timer;
let secondsRemaining = 10;
function OTPFn() {
	const btn = document.getElementById('generateBtn');
	btn.disabled = true;
	clearFn();
	otpGen = Math.floor(1000 + Math.random() * 9000);
	const temp = document.getElementById('content');
	const showOtp = document.createElement('div');
    showOtp.setAttribute("id","otp-display-div")
	showOtp.classList.add('otp-display');
	showOtp.innerHTML = 
		`<p class="otp-text">Generated OTP</p>`;
	temp.appendChild(showOtp);
	document.getElementById('otpForm').style.display = 'flex';
	startTimer();
}

function clearFn() {
	const prevOtp = 
		document.querySelector('.otp-display');
	if (prevOtp) {
		prevOtp.remove();
	}
	resetTimer();
	document.
		getElementById('errorMessage').innerText = '';
	enableInputField();
}
function OTPVerifyFn() {
	const userOtp = 
		document.getElementById('userOTP').value;
	if (userOtp === "") {
		alert("Please enter OTP.");
		return;
	}
	const enterOtp = parseInt(userOtp);
	if (!isNaN(enterOtp)) {
		if (secondsRemaining > 0) {
			if (enterOtp === otpGen) {
				showMsgFn();
				document.
					getElementById('generateBtn').disabled = false;
				resetTimer();
				enableInputField();
			} else {
				document.getElementById('errorMessage').innerText = 
					'Invalid OTP. Please try again.';
			}
		} else {
			document.getElementById('errorMessage').innerText = 
				'OTP Expired. Please generate a new OTP.';
			resetTimer();
		}
	} else {
		alert("Invalid OTP. Please try again.");
	}
}
function showMsgFn() {
	const successMessage = 
		document.getElementById('successMessage');
	successMessage.style.animation = 'fadeIn 1s forwards';
	successMessage.style.display = 'flex';
	setTimeout(() => {
		successMessage.style.display = 'none';
	}, 3000);
}
function startTimer() {
	timer = setInterval(function () {
		if (secondsRemaining <= 0) {
			clearInterval(timer);
			document.getElementById('generateBtn').disabled = false;
			document.getElementById('errorMessage').innerText = 
				'OTP Expired. Please generate a new OTP.';
            
            document.getElementById('otpForm').style.display = 'none';
            document.getElementById("otp-display-div").remove();

            resetTimer();
			disableInputField();
		} else {
			document.getElementById('timer').innerText = 
				`Time Remaining: ${secondsRemaining} seconds`;
			secondsRemaining--;
		}
	}, 1000);
}
function resetTimer() {
	clearInterval(timer);
	document.getElementById('timer').innerText = '';
	secondsRemaining = 300;
}
function disableInputField() {
	document.getElementById('userOTP').disabled = true;
}
function enableInputField() {
	document.getElementById('userOTP').disabled = false;
}
function clearFields() {
	document.getElementById('userOTP').value = '';
	clearFn();
}

/* ================ MY PROJECT ================== */

/* ================ GET EMAIL ================== */
const getEmalOTP = async()=>{

    const formData = new FormData();
    formData.append("email",sessionStorage.getItem("otpEmailGTask"));

    let dataObj = new URLSearchParams(formData);
    
    await fetch(endpoint.otpEmail,{
        method: "post",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*" 
        },
        body: dataObj
    }).then(res=>res.json())
    .then(res=>{

        if(res.status==200){
            document.getElementById("email").value = res.email;
        }
        else{   
            //console.log(res); 
            sessionStorage.removeItem("otpEmailGTask");
            location.href = "/login.html";
        }

    }).catch(error=>{
        sessionStorage.removeItem("otpEmailGTask");
        location.href = "/login.html";
        //console.log(`Houve um erro ao carregar! ${error}`);
    });

}

/* ================ GENERATE BTN ================== */
document.getElementById("generateBtn")
.addEventListener("click",async()=>{
    
    let href = `${location.protocol}//${location.host}`;

    const formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("href", href)

    let dataObj = new URLSearchParams(formData);
    
    await fetch(endpoint.otpCreate,{
        method: "post",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "/" 
        },
        body: dataObj
    }).then(res=>res.json())
    .then(res=>{

        if(res.status==500){
            sessionStorage.removeItem("otpEmailGTask");
            location.href = "/login.html";
        }
        else if(res.status==200){
            alert(res.message);
            OTPFn();
        }
        else{
            alert(res.message);
            OTPFn();
        }

    }).catch(error=>{
        console.log(`Houve um erro! ${error}`);
    });

});

/* ================ VERIFY OTP ================== */
document.getElementById("otpVerifyFn")
.addEventListener("click",async()=>{
    
    const userOtp = document.getElementById('userOTP').value;
	if (userOtp === "") {
		alert("Please enter OTP.");
		return;
	}

    const formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("otp", userOtp);

    let dataObj = new URLSearchParams(formData);
    
    await fetch(endpoint.otpVerify,{
        method: "post",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "/" 
        },
        body: dataObj
    }).then(res=>res.json())
    .then(res=>{

        if(res.status==200){
            sessionStorage.removeItem("otpEmailGTask");
            sessionStorage.setItem("tokenGTask",res.token);
            location.href = "/list.html";
        }
        else if(res.status==401){
            sessionStorage.removeItem("otpEmailGTask");
            location.href = '/login.html';
        }
        else{
            alert(res.message);
        }

    }).catch(error=>{
        console.log(`Houve um erro! ${error}`);
    });

});



window.addEventListener("load",async()=>{

    // Recuperar Email
    await getEmalOTP()
});