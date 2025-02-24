function showSignupForm() {
    document.querySelector('.signin-form').style.display = 'none';
    document.querySelector('.signup-form').style.display = 'block';
  }
  
  function showSigninForm() {
    document.querySelector('.signin-form').style.display = 'block';
    document.querySelector('.signup-form').style.display = 'none';
  }
  
  function validateSigninForm() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    if (!email || !password) {
      alert("Both fields are required.");
      return false;
    }
  
    return true;
  }
  
  function validateSignupForm() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    if (!name || !email || !password) {
      alert("All fields are required.");
      return false;
    }
  
    // Further validation like email format can be added here.
  
    return true;
  }
  