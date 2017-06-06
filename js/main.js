(function() {
	var selected = Array.prototype.slice.call(document.querySelectorAll('aside ul a'));
	console.log(selected);
	selected.forEach(function(el) {
		el.addEventListener('click', function makeActive() {
			selected.forEach(function(sel) { sel.classList.remove('active'); });
			this.classList.add('active');
		}.bind(el), true);
	});

	// TODO fix it so that #home is the default
	if (window.location.hash === '') {
		window.location.hash = "home";
	}

	// TODO: this, but not until much later
	// var TemplateObject = function(options) {
	// 	this.options = options;
	// };

	// TemplateObject.prototype.render = this.options.render;
})();