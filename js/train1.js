/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var div = document.getElementById('name');
//alert("Hello: " + div.innerHTML);

var info = {
    name: "",
    surname: "Sudkhot",
    nickname: "PON",
    old: 25,
    addr: null,
    education: false
};
//undefined
alert(empty(info.surname));

function empty(e) {
    switch (e) {
        case "":  
        case 0:    
        case "0":    
        case null:    
        case false:
        case typeof this == "undefined":
            return true;
        default :
            return false;
    }
}