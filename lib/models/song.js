'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var Song = new Schema({
	name: { type: String, require: true, lowercase: true },
	album: { type: String, lowercase: true },
	genres: { type: String },
	releasedOn: { type: Date },
	isExplicit: { type: Boolean, default: false},

	tags: [{ type: ObjectId, ref: 'Tag' }],
	artist: [{ type: ObjectId, ref: 'Artist' }]
})

module.exports = mongoose.model('Song', Song);