class PasswordValidator {
    constructor(passwordInput, confirmPasswordInput, strengthDiv, errorDiv) {
      this.passwordInput = passwordInput;
      this.confirmPasswordInput = confirmPasswordInput;
      this.strengthDiv = strengthDiv;
      this.errorDiv = errorDiv;
  
      this.widths = ["1%", "25%", "50%", "75%", "100%"];
      this.colors = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
      
      this.hasUppercase = /[A-Z]/;
      this.hasLowercase = /[a-z]/;
      this.hasNumber = /[0-9]/;
      this.hasSymbol = /[^0-9a-zA-Z]/;
  
      this.init();
    }
  
    init() {
      this.passwordInput.addEventListener('input', () => this.pwdStrength());
      this.confirmPasswordInput.addEventListener('keyup', () => this.chkPassword());
    }
  
    pwdStrength() {
      let point = 0;
      let password = this.passwordInput.value;
      
      if (password.length > 0) {
        let criteriaMet = [
          this.hasUppercase.test(password),
          this.hasLowercase.test(password),
          this.hasNumber.test(password),
          this.hasSymbol.test(password),
        ];
  
        point = criteriaMet.filter(Boolean).length;
        point = Math.min(Math.max(point, 0), this.widths.length - 1);
  
        this.strengthDiv.style.width = this.widths[point];
        this.strengthDiv.style.backgroundColor = this.colors[point];
        this.errorDiv.style.display = 'none';
      } else {
        this.strengthDiv.style.width = '0%';
        this.strengthDiv.style.backgroundColor = '#D3D3D3'; // Grey for no input
        this.errorDiv.innerHTML = 'Password is less than 8 characters';
        this.errorDiv.style.display = 'initial';
        this.errorDiv.style.color = 'red';
      }
    }
  
    chkPassword() {
      if (this.passwordInput.value !== this.confirmPasswordInput.value) {
        this.errorDiv.innerHTML = 'Passwords do not match';
        this.errorDiv.style.display = 'initial';
        this.errorDiv.style.color = 'red';
      } else {
        this.errorDiv.innerHTML = 'Passwords match';
        this.errorDiv.style.display = 'initial';
        this.errorDiv.style.color = 'green';
      }
    }
  }
  