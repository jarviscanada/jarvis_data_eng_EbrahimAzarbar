-- Show table schema 
\d+ retail;

-- Show first 10 rows
SELECT * FROM retail limit 10;

-- Check # of records
SELECT COUNT(*) AS count FROM retail;

-- number of clients (e.g. unique client ID)
SELECT COUNT(DISTINCT customer_id) AS count FROM retail WHERE customer_id IS NOT NULL;

-- invoice date range (e.g. max/min dates)
SELECT MAX(invoice_date) AS max, MIN(invoice_date) AS min FROM retail;

-- number of SKU/merchants (e.g. unique stock code)
SELECT COUNT(DISTINCT stock_code) AS count FROM retail;

-- Calculate average invoice amount excluding invoices with a negative amount (e.g. canceled orders have negative amount)
SELECT AVG(invoice_sum) AS avg
FROM (
    SELECT invoice_no, SUM(quantity * unit_price) AS invoice_sum
    FROM retail
    GROUP BY invoice_no
    HAVING SUM(quantity * unit_price) > 0
) AS invoices;

-- Calculate total revenue (e.g. sum of unit_price * quantity)
SELECT SUM(quantity * unit_price) AS sum FROM retail;

-- Calculate total revenue by YYYYMM
SELECT
    EXTRACT(YEAR FROM invoice_date) * 100 + EXTRACT(MONTH FROM invoice_date) AS yyyymm,
    SUM(quantity * unit_price) AS sum
FROM retail
GROUP BY
    EXTRACT(YEAR FROM invoice_date) * 100 + EXTRACT(MONTH FROM invoice_date)
ORDER BY yyyymm;