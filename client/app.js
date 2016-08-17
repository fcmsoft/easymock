Projects = new Meteor.Collection('projects');
Pages = new Meteor.Collection('pages');
Nodes = new Meteor.Collection('nodes');

Meteor.subscribe('projects', function() {
	$('body').addClass('loaded');
	setTimeout(function(){
		$('#content').removeClass('hidden');
	}, 1000);
});

Meteor.subscribe('pages', function() {
	$('body').addClass('loaded');
	setTimeout(function(){
		$('#content').removeClass('hidden');
	}, 1000);
});

Meteor.subscribe('nodes', function() {
	$('body').addClass('loaded');
	setTimeout(function(){
		$('#content').removeClass('hidden');
	}, 1000);
});

showModal = function (template, domElement, data) {
	if (data) {
		var addModal = Blaze.renderWithData(template, data, domElement.get(0));
	}
	else {
		var addModal = Blaze.render(template, domElement.get(0));
	}
	domElement.on('hidden.bs.modal', {modal: addModal}, function (event) {
		Blaze.remove(event.data.modal);
	});
	domElement.find('.modal').modal('show');
};
