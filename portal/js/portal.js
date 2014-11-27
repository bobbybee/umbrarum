function ViewManager(defaultView, views) {
	this.defaultView = defaultView;
	this.views = views;
	this.currentView = this.defaultView;

	for(var i = 0; i < this.views.length; ++i) {
		if(this.views[i] != this.defaultView) {
			this.hideView(this.views[i]);
		}
	}
}

ViewManager.prototype.switchViews = function(newView) {
	this.hideView(this.currentView);
	this.currentView = newView;
	this.showView(this.currentView);
}

ViewManager.prototype.getViewDiv = function(view) {
	return document.getElementById('view '+view);
}

ViewManager.prototype.hideView = function(view) {
	this.getViewDiv(view).style.display = 'none';
}

ViewManager.prototype.showView = function(view) {
	this.getViewDiv(view).style.display = 'block';
}

window.onload = function() {
	globals.viewManager = new ViewManager(globals.defaultView, globals.views);
}