DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS hash;

CREATE TABLE customer (
 cust_id SERIAL PRIMARY KEY,
 email VARCHAR(180)
);
CREATE TABLE hash (
 hash_id SERIAL PRIMARY KEY,
 hash_value TEXT,
 cust_id INT REFERENCES customer(cust_id)
);
INSERT INTO customer (email)
VALUES ('jon@than.com');

INSERT INTO hash (hash_value, cust_id)
VALUES ('password', 1);

SELECT * FROM customer;
SELECT * FROM hash;