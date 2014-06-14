jQuery(document).ready(function(){
	_.templateSettings = {
		// @variable => print with escape
	  escape      : /@((?:[a-z][a-z0-9_]*\.*[a-z][a-z0-9_]*))/g,
	  // @#variable => print without escape
	  interpolate : /@#((?:[a-z][a-z0-9_]*\.*[a-z][a-z0-9_]*))/g,
	  // @ statement (starts with whitespace and always single line) => evaluate statement
	  evaluate    : /@[\s]+([\s\S]+?)\n/g
	};

	var template = _.template($('#filter-template').html());
	var rowFiltersDOM = $('#row-filters');

	_.each(filters.row, function(){
		rowFiltersDOM.append(template(this));
	});
});