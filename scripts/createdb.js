use sandbox;

db.createCollection("users");

db.createUser({
    user: "sandbox",
    pwd: "12345678",
    roles: [
        {role: "readWrite", db: "sandbox"},
        {role: "dbOwner", db: "sandbox"}
    ]
});
