const mongoose = require('mongoose');

const admissionFormSchema = new mongoose.Schema({
  studentName: {
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
  lastSchool: {
    type: String,
    required: false
  },
  parentDetails: {
    father: {
      fatherName: {
        type: String,
        required: true
      },
      fatherEducation: {
        type: String,
        required: false
      },
      fatherEmail: {
        type: String,
        required: true
      },
      fatherOccupation: {
        type: String,
        required: true
      },
      fatherAddress: {
        type: String,
        required: true
      },
      fatherIncome: {
        type: Number,
        required: false
      },
      fatherAdharNo: {
        type: String,
        required: true
      },
      fatherJanAadharNo: {
        type: String,
        required: false
      },
      fatherMobileNo: {
        type: String,
        required: true
      }
    },
    mother: {
      motherName: {
        type: String,
        required: true
      },
      motherEducation: {
        type: String,
        required: false
      },
      motherEmail: {
        type: String,
        required: true
      },
      motherOccupation: {
        type: String,
        required: true
      },
      motherAddress: {
        type: String,
        required: true
      },
      motherIncome: {
        type: Number,
        required: false
      },
      motherAdharNo: {
        type: String,
        required: true
      },
      motherJanAadharNo: {
        type: String,
        required: false
      },
      motherMobileNo: {
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
    type: String,
    required: false
  },
  originalCertificates: {
    birthCertificateFile: {
      type: String,
      required: true
    },
    adharCardFile: {
      type: String,
      required: true
    },
    casteCertificateFile: {
      type: String,
      required: false
    },
    incomeCertificateFile: {
      type: String,
      required: false
    },
    transferCertificateFile: {
      type: String,
      required: false
    },
    otherCertificateFile: {
      type: String,
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
