const forms = document.querySelectorAll('form');
const messageContainer = document.getElementById('message-container');

forms.forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Perform form field validation
    if (!validateFormFields(form)) {
      return;
    }

    // Construct the form data manually
    const formData = new URLSearchParams();
    for (const pair of new FormData(form)) {
      formData.append(pair[0], pair[1]);
    }

    // Determine the appropriate form submission URL based on the current file
    const currentPath = window.location.pathname;
    let submitURL;

    // Add conditions for different file paths
    if (currentPath === '/') {
      submitURL = '/submit-form';
    } else if (currentPath === '/classes') {
      submitURL = '/submit-form2';
    }

    // Send the form data to the server
    try {
      const response = await fetch(submitURL, {
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
        messageContainer.innerText = 'Form submitted successfully!';
        messageContainer.classList.remove('error');
        messageContainer.classList.add('success');
      } else {
        // Display error message
        messageContainer.innerText = data.error || 'Error submitting the form. Please try again.';
        messageContainer.classList.remove('success');
        messageContainer.classList.add('error');
      }
    } catch (error) {
      console.error('Error:', error);
      messageContainer.innerText = 'An error occurred. Please try again later.';
      messageContainer.classList.remove('success');
      messageContainer.classList.add('error');
    }
  });
});

function validateFormFields(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  if (!isValid) {
    messageContainer.innerText = 'Please fill in all the required fields.';
    messageContainer.classList.remove('success');
    messageContainer.classList.add('error');
  } else {
    messageContainer.innerText = '';
    messageContainer.classList.remove('error');
    messageContainer.classList.add('success');
  }

  // Hide the messages after 5 seconds
  setTimeout(() => {
    messageContainer.innerText = '';
    messageContainer.classList.remove('success', 'error');
  }, 5000);

  return isValid;
}