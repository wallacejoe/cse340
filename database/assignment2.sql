-- Add "Tony Stark" to the database
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Set the account type as "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;
-- Remove "Tony Stark" from the database
DELETE FROM account
WHERE account_id = 1;
-- Update "GM Hummer" description
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- "Joins" the inventory and classification tables,
-- selecting only vehicles with the "Sport" classification
SELECT inv_make,
    inv_model,
    classification_name
FROM inventory
    INNER JOIN classification ON classification.classification_id = inventory.classification_id
WHERE inventory.classification_id = 2;

-- Update all inventory records to add "/vehicles" to
-- the middle of each file path
UPDATE inventory
SET inv_image = REPLACE(
        inv_image,
        '/images',
        '/images/vehicle'
    ),
	inv_thumbnail = REPLACE(
		inv_thumbnail,
		'/images',
        '/images/vehicle'
	);
