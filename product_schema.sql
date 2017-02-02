CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
item_id INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
produce_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price_to_customer DECIMAL(10,4) NULL,
stock_quantity INTEGER(11) NULL
);

SELECT * FROM Bamazon.products;

/*Ah, got a typo produce_name instead of product_name
do this: 
ALTER TABLE products CHANGE produce_name product_name VARCHAR(100) NULL;
*/

/* Another typo, Dark Chocolate was spelled as Drar Chocolate :(
UPDATE products
SET product_name = "Dark Chocolate"
WHERE item_id = 4;*/