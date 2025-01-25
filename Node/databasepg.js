const {Client} = require('pg');
const client = new Client({
user: "postgres",
host: "junction.proxy.rlwy.net",
port: 27239,
database: "railway",
password: "SNlZFOrgvqzTuDNVCiounQbNQAzQVLSu"
})

client.connect();

module.exports = client