'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var Tag = new Schema({
	name: { type: String, uniqueness: true, require: true },

	songs: [{ type: ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Tag', Tag);