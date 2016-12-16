"use strict";

const rethinkdb = require('rethinkdb');
const winston = require('winston');
const {join} = require('path');

const users = require(join(__dirname, './users'))["users"];

let connection;

const DB = {
  DATABASE_NAME: process.env.DATABASE_NAME || 'ssowithoauth2andsaml',
  TABLE_NAME: process.env.TABLE_NAME || 'users',
  connection: null,
  port: process.env.DB_PORT || 28015,
  host: process.env.DB_HOST || 'localhost'
};

function connectToRethinkDBServer() {
    return rethinkdb
        .connect({
            host : DB.host,
            port : DB.port,
            db: DB.DATABASE_NAME
        })
        .then(connect => {
          process.env.connection = connect;
          return connect;
        })
        .catch((error) => {
            winston.log('error', 'Database Connection Error', {error});
            return error;
        });
}

function doesRethinkTableExist() {
  return rethinkdb
    .dbList()
    .contains(DB.DATABASE_NAME)
    .run(DB.connection)
    .then(exists => exists);
}

function createUsers(databaseExists) {
  if (!databaseExists) {
      return createDB()
        .then(value => value);
  }
}

function createDB() {
  try {
    return rethinkdb.dbCreate(DB.DATABASE_NAME).run(DB.connection);
  } catch(err) {
    winston.log('error', 'Database Creation Error', {err});
    return err;
  }
}

function createTable() {
  return rethinkdb
    .db(DB.DATABASE_NAME)
    .tableCreate(DB.TABLE_NAME)
    .run(DB.connection)
    .then(connection => connection);
}

function insertData() {
  return rethinkdb
    .table(DB.TABLE_NAME)
    .insert(users)
    .run(DB.connection)
    .then(results => results);
}

function checkIfTableExists() {
  return rethinkdb
    .table(DB.TABLE_NAME)
    .count()
    .run(DB.connection)
    .then((count) => {
      return count;
    });
}

function getUsers() {
  return rethinkdb
    .table(DB.TABLE_NAME)
    .run(DB.connection)
    .then(cursor => {
      return cursor
        .toArray()
        .then(values => {
          return values;
        })
    }); 
}

function dbActions() {
  return connectToRethinkDBServer()
    .then((connection) => {
      DB.connection = connection;
      return doesRethinkTableExist()
        .then(exists => exists);
    })
    .then((databaseExists) => {
      if (!databaseExists) {
        return createUsers(databaseExists)
          .then(() => createTable())
          .then(() => insertData());
      }
    })
    .then(() => {
      return checkIfTableExists()
        .then(value => {
          if (value > 0) {
            return getUsers()
              .then(values => values);
          } else {
            insertData()
              .then(() => {
                return getUsers()
                  .then(values => values);
              });
          }
        });
      });
}

exports.dbActions = dbActions;