### Node.js Dynamic REST-api for SQLite
Automatically creates a REST-api from any SQLite-database. 
Also provides a web server serving files/static content.

Put your SQLite database file in in the **database** folder and all your frontend code (html, css, js, imagws etc) in the **frontend** folder.

**Note:** All tables are expected to have a column named **id**.

### Settings
You can change the settings - in settings.json: 
```js
{
  // which server port to start the web server on
  "port": 3000,
  // the name of the database file
  "dbName": "petowners-and-pets.sqlite3", 
  // if post request with where clauses should be allowed
  "allowWherePosts": true 
}
```

### CRUD - Read/search

#### GET /api/db-info
Returns a list of all tables and views in the database in JSON format.

##### Example result: 
```json
{
"tablesInDb": [
"petOwners",
"pets"
],
"viewsInDb": [
"petOwnersAndPets"
]
}
```

#### GET /api/:tableName
Returns all data from a table as a JSON array of objects.

#### GET /api/:tableName/:id
Returns one post from a table as a JSON object.

#### POST /api/:tableName

##### Request body example
Your own where clause logic:
```json
{
  "where": "species = 'dog'"
}
```
Returns posts matching the where clause.
(Only works if **settings.allowWherePosts** is set to **true**.)

#### Extra parameters
You can use the extra parameters *order, limit* and *offset*.

##### Examples
*GET /api/:tableName/?order=name,-age*
translates to the SQL: **ORDER BY name, age DESC**

*GET /api/:tableName?limit=5*
Shows the first 5 matching posts.

*GET /api/:tableName?limit=5&offset=10*
Shows post 11 to 15.

You can combine all three parameters:
*GET /api/:tableName/order=name,-age&limit=5&offset=10*
translates to the SQL:  **ORDER BY name, age DESC LIMIT 5 OFFSET 10**.

You can also use the same parameters together with the POST request and a where clause!

### CRUD - Create a post

#### POST /api/:tableName

##### Request body example
```json
{
  "name": "Cecilia",
  "age": 25
}
```
**Note:** Do *not* include an **id**, instead let the database set the id automatically.

### CRUD - Update a post

#### PATCH /api/:tableName/:id

##### Request body example
```json
{
  "age": 26
}
```
**Note:** Include an existing **id** in the url and the fields you want to update in the request body.

#### PUT /api/:tableName/:id
Works exactly the same way as **PATCH /api/:tableName/:id**.

### CRUD - Delete a post

#### DELETE /api/:tableName/:id
Deletes a post with the specified id.