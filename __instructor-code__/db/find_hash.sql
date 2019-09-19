SELECT hash_value, email, c.cust_id FROM hash h
JOIN customer c ON c.cust_id = h.cust_id
WHERE email = $1;