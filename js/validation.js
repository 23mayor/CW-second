let form = document.querySelector('.formWithValidation');

let validateBtn = form.querySelector('.validateBtn');
let name = form.querySelector('.name');
let email = form.querySelector('.email');
let date = form.querySelector('.date');
let fields = form.querySelectorAll('.field');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var errors = form.querySelectorAll('.error')

    for (var i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
    
    if (!name.value) {
        name.style = 'border: 1px solid #DC5656; background-color: rgba(220, 86, 86, 0.2);'
        let error = document.createElement('div')
        error.className = 'error'
        error.style = 'margin-top: -20px; margin-bottom: 30px; color: #DC5656;'
        error.innerHTML = 'Fill out the field'
        name.after(error)
    }
    if (!email.value) {
        email.style = 'border: 1px solid #DC5656; background-color: rgba(220, 86, 86, 0.2);'
        let error = document.createElement('div')
        error.className = 'error'
        error.style = 'margin-top: -20px; margin-bottom: 30px; color: #DC5656;'
        error.innerHTML = 'Wrong email'
        email.after(error)
    }
    
});
