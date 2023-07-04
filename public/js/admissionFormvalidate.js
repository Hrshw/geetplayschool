// Get the form element
const form = document.getElementById('admissionForm');

// Attach event listener to form submission
form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form fields
  const studentName = document.getElementById('studentName').value;
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const adharNumber = document.getElementById('adharNumber').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  const religion = document.getElementById('religion').value;
  const castCategory = document.getElementById('castCategory').value;
  const nationality = document.getElementById('nationality').value;
  const classAdmission = document.getElementById('classAdmission').value;
  const fatherName = document.getElementById('fatherName').value;
  const fatherEmail = document.getElementById('fatherEmail').value;
  const fatherOccupation = document.getElementById('fatherOccupation').value;
  const fatherAddress = document.getElementById('fatherAddress').value;
  const fatherAdharNo = document.getElementById('fatherAdharNo').value;
  const fatherMobileNo = document.getElementById('fatherMobileNo').value;
  const motherName = document.getElementById('motherName').value;
  const motherEmail = document.getElementById('motherEmail').value;
  const motherOccupation = document.getElementById('motherOccupation').value;
  const motherAddress = document.getElementById('motherAddress').value;
  const motherAdharNo = document.getElementById('motherAdharNo').value;
  const motherMobileNo = document.getElementById('motherMobileNo').value;
  const agree = document.getElementById('agree').checked;
  const birthCertificate = document.getElementById('birthCertificate');
  const birthCertificateFileInput = document.getElementById('birthCertificateFile');
  const adharCard = document.getElementById('adharCard');
  const adharCardFileInput = document.getElementById('adharCardFile');

  // Perform validation checks
  if (studentName === '') {
    displayError('studentName', 'Please enter the student name.');
    return;
  }

  if (gender === '') {
    displayError('gender', 'Please select the gender.');
    return;
  }

  if (dob === '') {
    displayError('dob', 'Please enter the DOB.');
    return;
  }

  if (adharNumber === '') {
    displayError('adharNumber', 'Please enter the Adhar Number.');
    return;
  } else if (!/^\d{12}$/.test(adharNumber)) {
    displayError('adharNumber', 'Adhar Number should contain 12 digits.');
    return;
  }

  if (mobileNumber === '') {
    displayError('mobileNumber', 'Please enter the Mobile Number.');
    return;
  } else if (!/^\d{10}$/.test(mobileNumber)) {
    displayError('mobileNumber', 'Mobile Number should contain 10 digits.');
    return;
  }

  if (religion === '') {
    displayError('religion', 'Please enter the religion.');
    return;
  }

  if (castCategory === '') {
    displayError('castCategory', 'Please enter the Cast Category.');
    return;
  }

  if (nationality === '') {
    displayError('nationality', 'Please enter the Nationality.');
    return;
  }
  if (classAdmission === '') {
    displayError('classAdmission', 'Please write the class in which you want to enroll your child.');
    return;
  }
  if (fatherName === '') {
    displayError('fatherName', "Please enter the Father's Name.");
    return;
  }
  if (fatherEmail === '') {
    displayError('fatherEmail', 'Please enter the Email Address.');
    return;
  }
  if (fatherOccupation === '') {
    displayError('fatherOccupation', 'Please enter the Occupation.');
    return;
  }
  if (fatherAddress === '') {
    displayError('fatherAddress', 'Please enter the Address.');
    return;
  }
  if (fatherAdharNo === '') {
    displayError('fatherAdharNo', 'Please enter the Adhar Number.');
    return;
  } else if (!/^\d{12}$/.test(fatherAdharNo)) {
    displayError('fatherAdharNo', 'Adhar Number should contain 12 digits.');
    return;
  }

  if (fatherMobileNo === '') {
    displayError('fatherMobileNo', 'Please enter the MobileNo.');
    return;
  } else if (!/^\d{10}$/.test(fatherMobileNo)) {
    displayError('fatherMobileNo', 'Mobile Number should contain 10 digits.');
    return;
  }
  if (motherName === '') {
    displayError('motherName', "Please enter the Mother's Names.");
    return;
  }
  if (motherEmail === '') {
    displayError('motherEmail', 'Please enter the email address.');
    return;
  }

  if (motherOccupation === '') {
    displayError('motherOccupation', 'Please enter the Occupation.');
    return;
  }

  if (motherAddress === '') {
    displayError('motherAddress', 'Please enter the Address.');
    return;
  }

  if (motherAdharNo === '') {
    displayError('motherAdharNo', 'Please enter the Adhar Number.');
    return;
  } else if (!/^\d{12}$/.test(motherAdharNo)) {
    displayError('motherAdharNo', 'Adhar Number should contain 12 digits.');
    return;
  }

  if (motherMobileNo === '') {
    displayError('motherMobileNo', 'Please enter the MobileNo.');
    return;
  } else if (!/^\d{10}$/.test(motherMobileNo)) {
    displayError('motherMobileNo', 'Mobile Number should contain 10 digits.');
    return;
  }

  if (!agree) {
    displayError('agree', 'Please check the Mark.');
    return;
  }

  // Validate the Birth Certificate checkbox and file upload
  if (!birthCertificate.checked) {
    if (!validateFileUpload(birthCertificateFileInput, 'birthCertificateFile')) {
      return;
    }
  }

  // Validate the Aadhar card checkbox and file upload
  if (!adharCard.checked) {
    if (!validateFileUpload(adharCardFileInput, 'adharCardFile')) {
      return;
    }
  }

  // If all validation passes, allow form submission
  submitForm();
});

// Function to validate file upload
function validateFileUpload(fileInput, fieldId) {
  if (fileInput.files.length === 0) {
    displayError(fieldId, `Please upload the ${getFieldLabel(fieldId)} file.`);
    return false;
  }

  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
  const file = fileInput.files[0];

  if (!allowedFileTypes.includes(file.type)) {
    displayError(fieldId, `Invalid file type. Only PDF, jpeg and JPG files are allowed.`);
    return false;
  }

  return true;
};

// Function to get the label text of a field
function getFieldLabel(fieldId) {
  const labelElement = document.querySelector(`label[for="${fieldId}"]`);
  return labelElement ? labelElement.innerText.trim() : '';
}

// Function to display error messages
function displayError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  errorElement.textContent = message;
  errorElement.style.display = 'block';

  // Scroll to the error message for better visibility
  errorElement.scrollIntoView({ behavior: 'smooth' });
}


// Function to submit the form data asynchronously
async function submitForm() {
  const formData = new FormData(form);

  try {
    const response = await fetch('/submit-admissionform', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Form submission successful
      form.reset();
      document.getElementById('errorMessages').innerHTML = '';
      document.getElementById('successMessage').textContent = 'Form submitted successfully!';
      document.getElementById('successMessage').style.display = 'block';

      // Redirect to home page after 4 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    } else {
      // Form submission failed, display error message
      const data = await response.json();
      const errorMessages = data.errors.map(error => error.msg).join('<br>');
      document.getElementById('errorMessages').innerHTML = errorMessages;
      document.getElementById('successMessage').style.display = 'none';
    }
  } catch (error) {
    // Error occurred during form submission
    console.error('An error occurred during form submission:', error);
    // Display error message or perform any necessary actions
  }
};
