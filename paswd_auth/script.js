var chkbx = document.getElementById('showPassword');
var newpass = document.getElementById('newPassword');
var confirmpass = document.getElementById('confirmPassword');
var error = document.getElementById('error');
var submit = document.getElementById('submit');
var stregthTxt = document.getElementById('stregth');
var stregthdiv = document.querySelector('.load');

//chkbx.style.display = 'none';
chkbx.addEventListener('change',()=>{
    if(chkbx.checked)
        {
            newpass.type = 'text';
            confirmpass.type = 'text';
            //console.log("checked");
        }else{
            newpass.type = 'password';
            confirmpass.type = 'password';
        }
        
});
function pwdStrength()
{
    let point = 0;
    let widths = ["1%","25%","50%","75%","100%"];
    let colors = ["#D73F40","#DC6551","#F2B84F","#BDE952","#3ba62f"];
    // Regular expressions for each criterion
    let hasUppercase = /[A-Z]/;
    let hasLowercase = /[a-z]/;
    let hasNumber = /[0-9]/;
    let hasSymbol = /[^0-9a-zA-Z]/;
    // Check if the password length is greater than 6
    if (newpass.value.length >0) {
        // Initialize a boolean flag for each criterion
        let criteriaMet = [false, false, false, false];

        // Check each criterion
        criteriaMet[0] = hasUppercase.test(newpass.value);
        criteriaMet[1] = hasLowercase.test(newpass.value);
        criteriaMet[2] = hasNumber.test(newpass.value);
        criteriaMet[3] = hasSymbol.test(newpass.value);

        // Calculate points based on how many criteria are met
        point = criteriaMet.filter(Boolean).length;

        // Ensure point is between 0 and the length of widths/colors arrays
        point = Math.min(Math.max(point, 0), widths.length - 1);
    }else{
        point -=1;
        error.innerHTML = 'Password is less than 8';
        error.style.display = 'initial';
        error.style.color = 'red';
    }   
        stregthdiv.style.width = widths[point];
        stregthdiv.style.backgroundColor = colors[point];
}

function chkpassword(){
 if(newpass.value!=confirmpass.value)
    {
        error.innerHTML = 'Password do no match';
        error.style.display = 'initial';
        error.style.color = 'red';
    } 
    else{
        error.innerHTML = 'Password  match';
        error.style.display = 'initial';
        error.style.color = 'green';
    }
}
newpass.addEventListener('input',pwdStrength);
confirmpass.addEventListener('keyup',chkpassword);

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(newpass.value.trim() ==='' && confirmpass.value.trim() ==='')
    {
        error.innerHTML = 'Input Fied is Empty';
        error.style.display = 'initial';
        error.style.color = 'red';
    }else{
        error.innerHTML = 'call login function';
        error.style.display = 'initial';
        error.style.color = 'blue';
    }
    
});
    
