const form = document.getElementById('myForm');
const messageContainer = document.getElementById('message-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Perform form field validation
  if (!validateFormFields()) {
    return;
  }

  // Construct the form data manually
  const formData = new URLSearchParams();
  for (const pair of new FormData(form)) {
    formData.append(pair[0], pair[1]);
  }

  // Send the form data to the server
  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      // Clear the form fields
      form.reset();

      // Display success message
      messageContainer.textContent = 'Form submitted successfully!';
      messageContainer.classList.remove('error');
      messageContainer.classList.add('success');
    } else {
      // Display error message
      messageContainer.textContent = data.error || 'Error submitting the form. Please try again.';
      messageContainer.classList.remove('success');
      messageContainer.classList.add('error');
    }
  } catch (error) {
    console.error('Error:', error);
    messageContainer.textContent = 'An error occurred. Please try again later.';
    messageContainer.classList.remove('success');
    messageContainer.classList.add('error');
  }
});

function validateFormFields() {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  if (!isValid) {
    messageContainer.textContent = 'Please fill in all the required fields.';
    messageContainer.classList.remove('success');
    messageContainer.classList.add('error');
    messageContainer.style.backgroundColor = 'red';
    messageContainer.style.color = 'white';
  } else {
    messageContainer.textContent = '';
    messageContainer.classList.remove('error');
    messageContainer.classList.add('success');
    messageContainer.style.backgroundColor = 'green';
    messageContainer.style.color = 'white';
  }

  // Hide the messages after 5 seconds
  setTimeout(() => {
    messageContainer.textContent = '';
    messageContainer.classList.remove('success', 'error');
    messageContainer.style.backgroundColor = '';
    messageContainer.style.color = '';
  }, 5000);

  return isValid;
}

