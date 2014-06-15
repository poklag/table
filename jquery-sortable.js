(function($) {
    $().ready(function() {
        
        function generateUUID(){
            var format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            var uuid  = format.replace(/[xy]/g, 
            function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            return uuid;
        }
        
        function load(){
            var json = localStorage.getItem('my-todos');
            
            if(!!json){
                var todoItem = JSON.parse(json);
                for (var i = 0; i < todoItem.length; i++){
                    var item = todoItem[i];
                    var id = item['id'];
                    var text = item['text'];
                    var checked = item['done']? 'checked="checked"':'';

                    var newItem = $(
                        '<li class="todos-item" data-id="'+id+'">'
                        + '<input name="done" type="checkbox" '+checked+' value="true"/>'
                        + '<input name="text" type="text" value="'+text+'" />'
                        + '<button name="delete" class="btn btn-danger" type="button" ><i class="icon-trash icon-white"></i></button>'
                        + '</li>'
                    );
                    newItem.appendTo('.sortable.todos');
                }
            }
        }
        
        // load todo
        load();
        
        $('.sortable.todos').sortable();
        
        // Add new todo
        $('#add-new-todo').click(function() {
            var id = generateUUID();
            var newItem = $(
                '<li class="todos-item" data-id="'+id+'">'
                + '<input name="done" type="checkbox" value="true"/>'
                + '<input name="text" type="text" placeholder="New todo" />'
                + '<button name="delete" class="btn btn-danger" type="button" ><i class="icon-trash icon-white"></i></button>'
                + '</li>'
            );
            
            newItem.appendTo('.sortable.todos');
                    
            newItem.find('button[name=delete]').click(del);
        
        });
        
        // Delete todo
        $('button[name=delete]').click(del);
        
        // Save
        $('#todos').submit(function(e){
            var data = [];
            
            $(this).find('li').each(function(){
                var id = $(this).attr('data-id');
                var text = $(this).find('input[name=text]').val();
                var isDone = $(this).find('input[name=done]:checked').val() == 'true';
                
                data.push({
                    id:id,
                    text:text,
                    isDone:isDone
                });
            });
            
            var json = JSON.stringify(data);
            
            localStorage.setItem('my-todos', json);
            
            e.preventDefault();
        });
        /* display todos */
        
        function del(){
            $(this).parent().remove();
        }
    });
})(jQuery);



















