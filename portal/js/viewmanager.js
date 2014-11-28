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

	if(globals.logger) {
		globals.logger.log({
			event: "switchViews",
			newView: newView
		});
	}
}

ViewManager.prototype.getViewDiv = function(id) {
	return document.getElementById(id);
}

ViewManager.prototype.hideView = function(view) {
	var div = this.getViewDiv(view);
    div.style.display = 'none';
}

ViewManager.prototype.showView = function(view) {
	var div = this.getViewDiv(view);
    div.style.display = 'block';
}