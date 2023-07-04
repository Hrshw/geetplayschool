// Define the Vlog Content schema
const mongoose = require('mongoose');

const vlogContentSchema = new mongoose.Schema({
    title: String,
    description: String,
    media: String, // File path or URL of the uploaded media file
    submittedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const VlogContent = mongoose.model('VlogContent', vlogContentSchema);
  module.exports = VlogContent;