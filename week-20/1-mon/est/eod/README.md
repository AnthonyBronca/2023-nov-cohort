# EOD

SQL practice!!

We are building a product for a restaurant. We will be working on this end of day throughout the week
in order to add more and more to this project.

The restaurant has a couple of things:

1. It can serve whatever food we want
2. It eventually wants to allow users to make an account for a rewards program and fast order


Today we will just be working on creating the menu

Use SQL to make a table for Menu Items

A menu item has the following constraints:

- a name (required) that is no more than 30 characters long
- a price (decimal, required) that is no more than $999.00 dollars
- amount sold (number, required, default to 0)

Add 10 menu items to it

Then perform the following tasks:



```sql

-- GET ALL THE ITEM names and their prices WHERE PRICE IS GREATER THAN 5 --
-- UPDATE ITEM 7 TO HAVE BEEN SOLD 10 TIMES --
-- DELETE ITEM 10 --
-- DELETE ALL ITEMS WHERE amount_sold IS 20 OR LESS. Consider using a transaction! --
```
