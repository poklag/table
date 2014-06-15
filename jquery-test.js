(function($) {
    $(document).ready(function() {
        $('.draggable').draggable({
            containment: '',
            helper: 'clone',
            revert: 'invalid',
            snap: '.droppable-container',
            snapMode:'inner',
            snapTorance:50,
            create: function (){
                console.log('create');
            },
            drag: function (){
                console.log('drag');
            },
            start: function (){
                console.log('start');
            },
            stop: function (event, ui){
                console.log('stop', event, this, ui);
            }
        });

        $('.droppable-container').droppable({
            hoverClass: 'hovering',
            activeClass: 'active',
            accept: ':not(.gay)',
            drop: function(event, ui) {
                ui.draggable.detach();
                ui.draggable.appendTo(this);
                ui.draggable.css({
                    left:'',
                    top:''
                });
                
               var name = ui.draggable.attr('data-name');
               //alert('name = '+name);
            }
        });

    });

})(jQuery);