var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var PhResSchema = new Schema({
  link_url: { type: String },
  image_url: { type: String},
  video_duration: { type: String },
  video_title: { type: String },
  quality_480p: { type: String },
  create_at: { type: Date, default: Date.now }
});

PhResSchema.plugin(BaseModel);
//PhResSchema.index({topic_id: 1});
PhResSchema.index({create_at: -1});

mongoose.model('PhRes', PhResSchema, 'PhRes');
