var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");
console.log("npm mysql is connected");

//setting up my connection to the local host
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"
});

//testing connection, if good, start the app
connection.connect(function(error) {
    if (error) throw error;
});

var runBamazon = function() {
    connection.query("SELECT * from products", function(error, result) {
        if (error) throw error;
        var productTable = new table({
        	head: ["Item ID", "Product Name", "Price"]
        });
        var len = result.length;
        for(var i = 0; i < len; i++){
        	productTable.push([(JSON.parse(JSON.stringify(result))[i]["item_id"]), (JSON.parse(JSON.stringify(result))[i]["product_name"]), (JSON.parse(JSON.stringify(result))[i]["price_to_customer"])]);
        }
            console.log("\n" + productTable.toString());
            start();
        });
    };

var start = function() {

    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Enter the ID of the item you would like to buy."

    }, {
        name: "quantity",
        message: "Great!, how many you want to buy?"
    }]).then(function(answer) {
        var id = answer.id;
        var quantity = answer.quantity
        //console.log(quantity);
        var query = "SELECT stock_quantity FROM products WHERE?"
        connection.query(query, { item_id: id }, function(error, result) {
            if (error) throw error;
            //console.log(result[0].stock_quantity);
            var quantityNum = parseInt(result[0].stock_quantity);
            //console.log("quantityNum = " + quantityNum);
            if (quantity <= quantityNum) {
                buy(id, quantityNum, quantity);
                runBamazon();
            } else {
                console.log("\n* * * * * * * * * * OH NO!!! * * * * * * * * * *\n * * * So SORRY, we don't seem to have enough inventory at this time. * * *\n* * * Please try to order less amount or simiular items! * * *\n");
            };
        });
    });
};
runBamazon();

var buy = function(id, quantityNum, quantity){
	quantityNum -= quantity;
	var query = "UPDATE products SET ? WHERE ?"
	connection.query(query, [{stock_quantity: quantityNum}, {item_id : id}], function(error, result){
		if(error) throw error;
		console.log("* * * * * * * * * * ORDER PLACED!!! * * * * * * * * * * \n");
	});

	var choose = "SELECT price_to_customer FROM products WHERE ?"
	connection.query(choose, {item_id: id}, function(error, result){
		if(error) throw error;
		var priceOfEach = result[0].price_to_customer;
		var totalPrice = priceOfEach * quantity;
		console.log("The total amount of this order is: " + totalPrice);
		return;
	});
};

