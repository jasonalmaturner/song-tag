var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	request = require('request'),
	Artist = require('./lib/models/artist'),
	Song = require('./lib/models/song'),
	Tag = require('./lib/models/tag');

mongoose.connect('mongodb://localhost/song-tag');
app.use(bodyParser.json());

var mongoUrl = 'mongodb://localhost/song-tag';
var connection = mongoose.connection;
connection.once('open', function (){
	console.log('Successfully connected to ' + mongoUrl)
})
global.mongooseConnection = connection;

app.get('/artists', function (req, res){
	Artist.find().exec(function(err, artists){
		if(err){
			res.send(err);
		} else {
			res.send(artists);
		}
	});
});

app.post('/artists', function (req, res){
	var newArtist = new Artist(req.body);
	newArtist.save(function(err){
		if(err){
			res.send(err);
		} else {
			res.status(200).send('artist was successfully added');
		}
	});
})

app.get('/artists/:name', function (req, res){
	Artist.findOne({name: req.params.name}).populate('songs').exec(function(err, artist){
		if(err){
			res.send(err);
		} else {
			res.send(artist);
		}
	});
});

app.get('/artists/:name/songs', function(req, res){
	Artist.findOne({name: req.params.name}).populate('songs').exec(function(err, artist){
		res.status(200).send(artist)
	});		
});

app.post('/artists/:name/songs', function (req, res){
	Artist.findOne({name: req.params.name}).populate('songs').exec(function(err, artist){
		if(err){
			res.send(err);
		} else {
			var newSong = new Song(req.body.song);
			newSong.save(function(err, song){
				if(err){
					return res.send(err);
				} else {
					artist.songs.addToSet(song);
					artist.save(function(err, artist){
						if(err){
							res.send(err);
						} else {
							res.status(200).send("song was added");
						}
					});					
				}
			});
		}
	})
})

app.get('/song/:id', function (req, res){
	Song.findOne({name: req.params._id}).exec(function(err, song){
		if(err){
			res.send(err)
		} else {
			res.send(song);
		}
	})
})

app.post('/song/:songId/tags', function(req, res){
	Tag.findOneAndUpdate({name: req.body.name }, req.body, {upsert: true}).exec(function(err, tag){
		if(err){
			res.send(err);
		} else {
			Song.findOne({_id: req.params.songId}).populate('tags').exec(function(err, song){
				if(err){
					res.send(err);
				} else {
					song.tags.addToSet(tag);
					res.send(song.tags);
				}
			})
		}
	});
})


// app.post('artists')

app.listen(9009);