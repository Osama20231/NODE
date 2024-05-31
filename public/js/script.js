function doBindings() {
    let submitBtn = document.getElementById("submitBtn");
    submitBtn.onclick = handleFormSubmission; 
    scrolldown;
    bindContactNavigation;
}
$(doBindings);

function handleFormSubmission(event) {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        event.preventDefault();
    }else{
         $('#contactForm').hide();
         $('#successMessage').show();
    }
}
  
function scrolldown(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function bindContactNavigation() {
    var contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function() {
            window.location.href = './contact-us.ejs';
        });
    }
}