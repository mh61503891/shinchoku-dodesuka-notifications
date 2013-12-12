var Sounds = function() {
	var sounds = [new Audio('sound-1.mp3'), new Audio('sound-2.mp3')]
	$.each(sounds, function(index, sound) {
		sound.volume = 0.5
	})
	return {
		random: function() {
			return sounds[Math.floor(Math.random() * (2))]
		}
	}
}();

var URLs = function() {
	return {
		random: function() {
			var urls = []
			for (var key in localStorage) {
				if (key.match(/http/)) {
					urls.push(key)
				}
			}
			return urls[Math.floor(Math.random() * (urls.length))]
		}
	}
}();

function update() {
	$.getJSON('http://api.tumblr.com/v2/blog/shinchokudodesuka.tumblr.com/posts/photo?', {
		'api_key': 'yXqOQhCKxF07LqypaKNVvxPezoAQOMTJ0Mk451Mpu8SX1CD5a3'
	}, function(data, status) {
		$.each(data.response.posts, function(index, post) {
			$.each(post.photos, function(index, photo) {
				$.each(photo.alt_sizes.reverse(), function(index, alt_size) {
					if (alt_size.width >= 300) {
						localStorage.setItem(alt_size.url, true)
						return false
					}
				})
			})
		})
	})
	$.getJSON('http://api.tumblr.com/v2/tagged?', {
		'api_key': 'yXqOQhCKxF07LqypaKNVvxPezoAQOMTJ0Mk451Mpu8SX1CD5a3',
		'tag': '進捗どうですか'
	}, function(data, status) {
		$.each(data.response, function(index, blog) {
			$.each(blog.photos, function(index, photo) {
				$.each(photo.alt_sizes.reverse(), function(index, alt_size) {
					if (alt_size.width >= 300) {
						localStorage.setItem(alt_size.url, true)
						return false
					}
				})
			})
		})
	})
}

function notify() {
	var options = {
		type: 'image',
		title: '進捗どうですか',
		message: '進捗どうですか',
		iconUrl: 'icon-128.png',
		imageUrl: URLs.random()
	}
	Sounds.random().play()
	chrome.notifications.create("notification-" + Math.random(), options, function(e) {})
}

if (localStorage.length == 0) {
	update()
}

chrome.alarms.create('update', {
	when: Date.now() + 2000,
	periodInMinutes: 60 * 3
})
chrome.alarms.create('notify', {
	when: Date.now() + 2000,
	periodInMinutes: 30
})


chrome.alarms.onAlarm.addListener(function(alarm) {
	switch (alarm.name) {
		case 'update':
			update();
			break;
		case 'notify':
			notify();
			break;
	}
})