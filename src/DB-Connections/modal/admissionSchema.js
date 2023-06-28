const mongoose = require('mongoose');

const admissionFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  adharNumber: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  religion: {
    type: String,
    required: true
  },
  castCategory: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  bonafideState: {
    type: String,
    required: false
  },
  janAadharNo: {
    type: String,
    required: false
  },
  classAdmissionSought: {
    type: String,
    required: true
  },
  lastAttendedSchool: {
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    }
  },
  parentDetails: {
    father: {
      name: {
        type: String,
        required: true
      },
      educationQualification: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true
      },
      occupation: {
        type: String,
        required: true
      },
      officialAddress: {
        type: String,
        required: true
      },
      annualIncome: {
        type: Number,
        required: false
      },
      aadharNo: {
        type: String,
        required: true
      },
      janAadharNo: {
        type: String,
        required: false
      },
      mobileNo: {
        type: String,
        required: true
      }
    },
    mother: {
      name: {
        type: String,
        required: true
      },
      educationQualification: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true
      },
      occupation: {
        type: String,
        required: true
      },
      officialAddress: {
        type: String,
        required: true
      },
      annualIncome: {
        type: Number,
        required: false
      },
      aadharNo: {
        type: String,
        required: true
      },
      janAadharNo: {
        type: String,
        required: false
      },
      mobileNo: {
        type: String,
        required: true
      }
    }
  },
  classLastAttended: {
    type: String,
    required: false
  },
  passingYearLastClass: {
    type: String,
    required: false
  },
  lastSchoolAffiliated: {
    type: String,
    required: false
  },
  otherAffiliation: {
    type: String,
    required: false
  },
  lastClassMarks: {
    maximumMarks: {
      type: Number,
      required: false
    },
    marksObtained: {
      type: Number,
      required: false
    },
    grade: {
      type: String,
      required: false
    }
  },
  originalCertificates: {
    birthCertificate: {
      type: Boolean,
      required: false
    },
    casteCertificate: {
      type: Boolean,
      required: false
    },
    adharCard: {
      type: Boolean,
      required: true
    },
    incomeCertificate: {
      type: Boolean,
      required: false
    },
    transferCertificate: {
      type: Boolean,
      required: false
    },
    otherCertificate: {
      type: Boolean,
      required: false
    }
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const AdmissionForm = mongoose.model('AdmissionForm', admissionFormSchema);

module.exports = AdmissionForm;