/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var data = {};

(function($, con){
    var arr = ['A', 'B', 'C', 'D', 'E'];
    console.log("arr[0] => " + arr[0]);
    console.log("arr.length => " + arr.length);
    
    con.arr = arr;
    
    window._arr = arr;
    
    var objArr = [
        {id: 0, name: "name1"},
        {id: 2, name: "name2"}
    ];
    
    for(var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    
    arr = arr.map(function (item){
        return {val: item, name: "" + item}
    });
    
    
    for(var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
})(window, data);