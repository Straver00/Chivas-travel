document.getElementById('toggleButton').addEventListener('click', function() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const button = document.getElementById('toggleButton');
    
    if (signInForm.classList.contains('hidden')) {
      signInForm.classList.remove('hidden');
      signUpForm.classList.add('hidden');
      button.textContent = 'Switch to Sign Up';
    } else {
      signInForm.classList.add('hidden');
      signUpForm.classList.remove('hidden');
      button.textContent = 'Switch to Sign In';
    }
  });
  