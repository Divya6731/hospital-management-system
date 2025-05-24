const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  phone: String,
  experience: Number,
});

module.exports = mongoose.model('Doctor', doctorSchema);
