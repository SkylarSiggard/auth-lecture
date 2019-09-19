INSERT INTO customer (email)
VALUES (${email})
RETURNING cust_id;