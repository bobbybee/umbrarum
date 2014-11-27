function ViewManager(defaultView, views) {
	this.defaultView = defaultView;
	this.views = views;
	this.currentView = this.defaultView;
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
	var viewManager = new ViewManager(globals.defaultView, globals.views);
}