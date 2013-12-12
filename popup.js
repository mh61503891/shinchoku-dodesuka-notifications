$(function() {
	$.getJSON('https://api.tumblr.com/v2/blog/shinchokudodesuka.tumblr.com/posts/photo?&api_key=yXqOQhCKxF07LqypaKNVvxPezoAQOMTJ0Mk451Mpu8SX1CD5a3&jsonp=?', function(data, status) {
		chrome.browserAction.setIcon({
			path: $(data.response.posts[0].photos[0].alt_sizes).last()[0].url
		})
		$.each(data.response.posts, function(index, post) {
			$.each(post.photos, function(index, photo) {
				var img = $('<img>', {
					src: photo.alt_sizes[photo.alt_sizes.length - 3].url
				})
				img.css({
					'border-width': '2px',
					'border-style': 'solid',
					'border-color': '#333333'
				})
				$(document.body).append(img)
				$(document.body).append($('<br>'))
			})
		})
	})
})