App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'stories'
});

App.Story = DS.Model.extend({
	url : DS.attr('string'),
	tags : DS.attr('string'),
	fullname : DS.attr('string'),
	title : DS.attr('string'),
	excerpt : DS.attr('string'),
	submittedOn : DS.attr('date'),

	tagnames : function(){
		var tags = this.get('tags').split(',');
		var tagArray = new Array();
		for(var i = 0;i<tags.length;i++ ){
			tagArray.push(tags[i].trim())
		}
		console.log(tagArray);
		return tagArray;
	}.property('tags')

});

App.Router.map(function() {
	this.resource('index',{path : '/'},function(){
		this.resource('story', { path:'/stories/:story_id' });
	});

	this.resource('newstory' , {path : 'story/new'});

});



App.IndexController = Ember.ArrayController.extend({
	sortProperties : ['submittedOn'],
	sortAscending : false
});

App.IndexRoute = Ember.Route.extend({
	model : function(){
		var stories = this.get('store').findAll('story');
		return stories;
	}
});


App.StoryRoute = Ember.Route.extend({
	model : function(params){
		var store = this.get('store');
		console.log('in StoryRoute()....');
		return store.find('story',params.story_id);
	}
});

App.NewstoryController = Ember.ObjectController.extend({
	
 actions :{
 	save : function(){
 		var url = $('#url').val();
 		var tags = $('#tags').val();
 		var fullname = $('#fullname').val();
 		var title = $('#title').val();
 		var excerpt = $('#excerpt').val();
 		var submittedOn = new Date();
		var store = this.get('store');
		var story = store.createRecord('story',{
 			url : url,
 			tags : tags,
 			fullname : fullname,
 			title : title,
 			excerpt : excerpt,
 			submittedOn : submittedOn
		});
 		story.save();
 		this.transitionToRoute('index');
 	}
 }
});

Ember.Handlebars.helper('format-date', function(date){
	return moment(date).fromNow();
});