function randomRGBAColor(alpha){

	alpha = alpha || 1;
	return 'rgba(' 
		+ (Math.random() * 1000 % 255).toFixed(0) + ','
		+ (Math.random() * 1000 % 255).toFixed(0) + ','
		+ (Math.random() * 1000 % 255).toFixed(0) + ', '+ alpha +')';
}

jQuery(document).ready(function(){

	// mark column index
	$('.inner-table tr').each(function(){
		var col = 0;
		$(this).find('td').each(function(){
			$(this).attr('data-parent-column', col++);
			$(this).text( (Math.random() * 100).toFixed(3) );
		});
	});

	// 
	//$('.swapable.row').addClass('rotate');

	// calculate width
	function adjustInnerTableWidth(){
		var tds = $('.inner-table tr:first-child td');
		var innerTableWidth = $('.inner-table-wrapper').outerWidth();

		tds.each(function(){
			$(this).css('width', innerTableWidth / tds.length);
		});
	};

	function updateRowHeader(parentRowNumber){
		var height = $('.inner-table tr[data-parent-row='+parentRowNumber+']').length * 37;
		$('.outer-table th[data-row='+(parentRowNumber)+']').css('height', height);
	};

	function updateColumnWidth(){
		adjustInnerTableWidth();

		var ths = $('.outer-table tr[data-row-filter-level=2] th');
		var columnWidth = $('.inner-table-wrapper').outerWidth() / $('.inner-table tr:first-child td').length;
		ths.each(function(){
			var column = $(this).attr('data-column');
			$(this).css('width', columnWidth * $('.inner-table tr:first-child td[data-parent-column='+column+']').length);
		});
	};

	updateColumnWidth();

	function doSwapText(event, ui, droppable){
		var text = $(droppable).html();
		$(droppable).html(ui.draggable.html());
		ui.draggable.html(text);
	};

	function insertRow(position, rowIndex){
		var table = $('.inner-table');

		var tr = table.find("tr:nth-child("+(rowIndex + 1)+")");
		var trCloned = tr.clone().width(0);

		trCloned.find('td').html( (Math.random() * 100).toFixed(3) );

		if(position == 'before'){
			trCloned.insertBefore(tr);
		}else{
			trCloned.insertAfter(tr);
		}

		updateRowHeader(tr.attr('data-parent-row'));
	};

	function deleteRow(rowIndex){

		var row = $('.inner-table tr:nth-child('+ (rowIndex+1) +')');

		if($('.inner-table tr[data-parent-row='+row.attr('data-parent-row')+']').length > 1){
			row.remove();
			updateRowHeader(row.attr('data-parent-row'));
		}
	};

	function deleteColumn(columnIndex){
		var td = $('.inner-table tr:first-child td:nth-child('+(columnIndex+1)+')');

		if($('.inner-table tr:first-child td[data-parent-column='+td.attr('data-parent-column')+']').length > 1){
			$('.inner-table tr td:nth-child('+ (columnIndex+1) +')').remove();
			updateColumnWidth();
		}
	}

	function insertColumn(position, columnIndex){

		var table = $('.inner-table');

		if(position == 'before'){
			table.find('tr').each(function(){
				var td = $(this).find("td:nth-child("+(columnIndex + 1)+")");
				td.before(td.clone().width(0));
			});
		}else{
			table.find('tr').each(function(){
				var td = $(this).find("td:nth-child("+(columnIndex + 1)+")");
				td.after(td.clone().width(0));
			});
		}

		updateColumnWidth();
	};

	var _contextMenuVisibled = false;
	var _selectedElement = null;

	$('.swapable').draggable({
		cursorAt: { top: 5, left: 5 },
		revert: 'invalid',
		distance: 20,
		//snap: '.swapable',
		helper: "clone",
		containment: ".outer-table"
	});

	if('ontouchstart' in window // works on most browsers 
      || window.navigator.msMaxTouchPoints // works on ie10
      ){
		$('.inner-table').on('click', function(e){
			if(e.target.tagName.toLowerCase() == 'td'){

				e.stopPropagation();
				e.preventDefault();

				_selectedElement = e.target;
				_selectedCell = { column: _selectedElement.cellIndex, row: _selectedElement.parentElement.rowIndex };
				
				$('.contextmenu').css({
					position: 'absolute',
					top: e.pageY+5,
					left: e.pageX+5
				}).fadeIn(200);

				_contextMenuVisibled = true;
			}
		});

	}else{

		$('.inner-table').bind('contextmenu', function(e){

			e.stopPropagation();
			e.preventDefault();

			if(e.target.tagName.toLowerCase() == 'td'){
				_selectedElement = e.target;
				_selectedCell = { column: _selectedElement.cellIndex, row: _selectedElement.parentElement.rowIndex };

				$('.contextmenu').css({
					position: 'absolute',
					top: e.pageY+5,
					left: e.pageX+5
				}).fadeIn(200);

				_contextMenuVisibled = true;
			}
		});
	}

	$('body').bind('click', function(e){
		if(_contextMenuVisibled){
			_contextMenuVisibled = false;

			$('.contextmenu').fadeOut(200);
		}
	});

	$('.swapable.row').droppable({
		accept: '.row',
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		drop: function(event, ui) {
			var drop = $(this);

			drop.animate({
				'background-color': '#FE642E'
			}, 200, 'linear', function(){
				drop.animate({
					'background-color': ''
				}, 200, 'linear', function(){
					drop.css('background-color', '');
				});
			} );

			doSwapText(event, ui, this);
		}
	});

	$('.swapable.column').droppable({
		accept: '.column',
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		drop: function(event, ui) {

			var drop = $(this);

			drop.animate({
				'background-color': '#FE642E'
			}, 200, 'linear', function(){
				drop.animate({
					'background-color': ''
				}, 200, 'linear', function(){
					drop.css('background-color', '');
				});
			} );

			doSwapText(event, ui, this);
		}
	});

	$('.expansion button.close').click(function(){
		$('.expansion').fadeOut(200);
	});

	var datasets = [];
	$('#showChart').click(function(){

		var labels = [];

		var rowTHs = $('.outer-table tr th[data-row]');
		rowTHs.each(function(){
			labels.push($(this).text());
		});

		//var colTHs = $('.outer-table tr[data-row-filter-level=2] th[data-column]');
		rowTHs.each(function(){

			var i = 0;
			var tr = $('.inner-table tr[data-parent-row='+$(this).attr('data-row')+']');
			tr.find('td').each(function(){

				if(i == 6){
					return false;
				};

				if(datasets[i] === undefined){
					datasets[i] = {
						data: [],
						fillColor : randomRGBAColor(0.4),
						strokeColor : 'transparent',
						pointColor : randomRGBAColor(1),
						pointStrokeColor : randomRGBAColor(1),
					};
				}
				datasets[i].data.push(parseFloat($(this).text()));
				i++;
			});
		});

		var data = {
			labels : labels,
			datasets : datasets
		};

		var ctx = document.getElementById("chart").getContext("2d");
		var myNewChart = new Chart(ctx).Bar(data);

		$('.chart-popup').modal({
			width: 900,
			height: 480
		});
	});

	// $('.inner-table').on({'touchstart': function(){

	// }})

	$('.contextmenu li').click(function(e){
		var action = $(e.target).attr('data-action');

		switch(action){
			case 'expand-row': {
				insertRow('after', _selectedCell.row);
			}; break;

			case 'expand-column': {
				insertColumn('after', _selectedCell.column);
			}; break;

			case 'delete-column':{
				deleteColumn(_selectedCell.column)
			}; break;

			case 'delete-row':{
				deleteRow(_selectedCell.row);
			}; break;

			case 'delete-both': {
				
				deleteRow(_selectedCell.row);
				deleteColumn(_selectedCell.column)

			}; break;

			case 'expand-diagonally':{
				var elm = $(_selectedElement);
				var table = $('.inner-table');


				$('.expansion').css({
					top: elm.position().top + 1,
					left: elm.position().left + 1,
					right: 0,
					bottom: 0
				}).fadeIn(200, 'linear');

				var container = $('.expansion');
				var table = $('#expansion-table>tbody').empty();
				var td = $('.inner-table tr>td:first-child');

				var nCol = parseInt((container.outerWidth() / td.outerWidth()).toFixed(0));
				var nRow = parseInt((container.outerHeight() / td.outerHeight()).toFixed(0));

				for (var i = 0; i < nRow; i++) {
					var tr = $('<tr></tr>');
					for (var j = 0; j < nCol; j++) {
						tr.append('<td>'+(Math.random()*100).toFixed(3)+'</td>');
					};

					table.append(tr);
				};
			}
		}

	});
});