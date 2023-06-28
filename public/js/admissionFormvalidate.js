// Get the form element
    const form = document.getElementById('admissionForm');

  // Attach event listener to form submission
  form.addEventListener('submit', function(event) {
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
    const fatherName = document.getElementById('fatherName').value;
    const fatherEmail = document.getElementById('fatherEmail').value;
    const fatherOccupation = document.getElementById('fatherOccupation').value;
    const fatherAddress = document.getElementById('fatherAddress').value;
    const fatherAdharNo = document.getElementById('fatherAdharNo').value;
    const fatherMobileNo = document.getElementById('fatherMobileNo').value;
    const motherName = document.getElementById('motherName').value;
    const motherMobileNo = document.getElementById('motherMobileNo').value;
    const agree = document.getElementById('agree').checked;

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

      if (fatherName === '') {
        displayError('fatherName', "Please enter the Father's Name.");
        return;
      }
      if (fatherAddress === '') {
        displayError('fatherAddress', 'Please enter the Address.');
        return;
      }
      if (fatherAdharNo === '') {
        displayError('fatherAdharNo', 'Please enter the Adhar Number.');
        return;
      } else if (!/^\d{12}$/.test(adharNumber)) {
        displayError('fatherAdharNo', 'Adhar Number should contain 12 digits.');
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
      if (fatherMobileNo === '') {
        displayError('fatherMobileNo', 'Please enter the MobileNo.');
        return;
      }else if (!/^\d{10}$/.test(mobileNumber)) {
        displayError('fatherMobileNo', 'Mobile Number should contain 10 digits.');
        return;
      }
      if (motherName === '') {
        displayError('motherName', "Please enter the Mother's Names.");
        return;
      }
      if (motherMobileNo === '') {
        displayError('motherMobileNo', "Please enter the MobileNo.");
        return;
      }else if (!/^\d{10}$/.test(mobileNumber)) {
        displayError('motherMobileNo', 'Mobile Number should contain 10 digits.');
        return;
      }

    // If all validation passes, allow form submission
    form.submit();
  });

  // Function to display error messages
  function displayError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
