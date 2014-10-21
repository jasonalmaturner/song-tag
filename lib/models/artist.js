var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var Artist = new Schema({
	name: { type: String, require: true },
	bio: { type: String },
	genres: [{ type: String }],

	songs: [{ type: ObjectId, ref: 'Song' }]
})

module.exports = mongoose.model('Artist', Artist);

// genres: { type: String, enum: ['bluegrass', 'pop', 'jazz', 'rock', 'country', 'alternative', 'indie', 'classical', 'rap', 'hip hop', 'r & b']}
