var iKol;																			
var goods = new Array;
var newLength = new Array;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {    
        var myArr = JSON.parse(this.responseText);
        var iKol = myArr["expressions"].length;
        arrExp(myArr, iKol);
        document.getElementById("exBlock").innerHTML = this.responseText;

    }
 };
xmlhttp.open("GET", "https://www.eliftech.com/school-task", true);
xmlhttp.send();																
function arrExp(myArr, iKol) {
		for (var i = 0; i < myArr["expressions"].length; i++) {
  		var oneExp = myArr["expressions"][i];
  		var idExp = myArr["id"];
		evaluate(oneExp, idExp, iKol);
		//console.log(oneExp);

}
};
function evaluate(oneExp, idExp, iKol) {
		var input = oneExp;
		var values = input.split(" ");
		var array = new Array();
		for (i in values) {
			if (values[i] != "+" && values[i] != "*" && values[i] != "-" && values[i] != "/") {
				array.push(parseInt(values[i]));
			} else {
				var operator = values[i];
				var val2 = array.pop();
				var val1 = array.pop();
				switch (operator) {
					case "+":
						array.push(eval("val1 - val2"));
						break;
					case "*": if (val2 == 0) {
						array.push(eval(42))
						break;
					} else {
						array.push(eval("val1 % val2"));
						break;
					};
					case "-":
						array.push(eval("val1 + val2 + 8"));
						break;
					case "/": if (val2 == 0) {
						array.push(eval(42));
						break;
					} else {
						var intee = Math.floor(val1 / val2);
						array.push(eval("intee"));
						break;
					};
				}
			}
		}
		if (input == "" || input == null) {
			document.writeln("Oshibka voda");
		} else {
			newLength = goods.push(array[0]);
			//console.log(i);	
			if (goods.length === iKol)	{
			//console.log(goods);	
			loadJsoo(goods, idExp);		

		}
		}
	};
function loadJsoo (goods, idExp) {
var myJsoo = {
  id: idExp,
  results: goods
}; 
console.log(myJsoo);
var http = new XMLHttpRequest();
var url = "https://www.eliftech.com/school-task";
http.open("POST", url, true);
http.setRequestHeader('Content-type', 'application/json');
http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
        var myRespond = JSON.parse(http.responseText);
        var anPased = myRespond["passed"];
        document.getElementById("maBlock").innerHTML = ['am I passed this challenge? So it*s  ' + anPased + ' ' + goods];
        if (anPased == false) {
        	location.reload();
        }

    }
}
http.send(JSON.stringify(myJsoo));
}