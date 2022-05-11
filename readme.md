# Request

---

## Articles

### Create one

POST /article

### Get pagination

POST /article/list

### Get one

GET /article/$id

### Update one

PUT /article/$id

### Delete one

DELETE /article/$id

### Delete permanent one

DELETE /article/permanent/$id

---

## Comments

### Create one

POST /comment

### Get pagination

POST /comment/list

### Get by article id

POST /comment/article/list

### Get one

GET /comment/$id

### Update one

PUT /comment/$id

### Delete one

DELETE /comment/$id

### Delete permanent one

DELETE /comment/permanent/$id

# Database

---

Config .env :
DATABASE_USER="bwa-salma"
DATABASE_SECRET="bwa-salma"
DATABASE_CLUSTER="cluster0.z1mwi.mongodb.net"
DATABASE_NAME="db_articles"

# Postman Collection

postman_collections/ZettaByte.postman_collection.json
