import { DynamoDB } from 'aws-sdk'
import { config } from 'config'
import * as DB from 'value/db'

const {
  resources: { Resources }
} = require('base/serverless.yml')
const stage = process.env.STAGE
const doc = new DynamoDB.DocumentClient({ ...config.aws })

const getTableName = (key) =>
  Resources[key].Properties.TableName.replace('${self:provider.stage}', stage) // eslint-disable-line

const responseHandler = (resolve, reject) => (error, data) => {
  if (error) {
    reject(error)
  } else {
    resolve(data)
  }
}

export const dbGet = (table, Key) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbGet', TableName, Key)

    doc.get({
      Key,
      TableName
    }, responseHandler(resolve, reject))
  })

export const dbScan = (table, { FilterExpression, ExpressionAttributeValues }) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbScan', TableName, { FilterExpression, ExpressionAttributeValues })

    doc.scan({
      FilterExpression,
      ExpressionAttributeValues,
      TableName
    }, responseHandler(resolve, reject))
  })

export const dbDelete = (table, Key) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbDelete', TableName, Key)

    doc.delete({
      Key,
      TableName
    }, responseHandler(resolve, reject))
  })

export const dbQuery = (table, KeyConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues, Limit) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    doc.query({
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit,
      TableName
    }, responseHandler(resolve, reject))
  })

export const dbPut = (table, Item) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbPut', TableName, Item)

    doc.put({
      Item,
      TableName
    }, responseHandler(resolve, reject))
  })

export const dbUpdate = (table, Key, ExpressionAttributeNames, ExpressionAttributeValues, UpdateExpression) =>
  new Promise((resolve, reject) => {
    const TableName = getTableName(table)

    console.log('dbUpdate', TableName, Key)

    doc.update({
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      Key,
      TableName,
      UpdateExpression
    }, responseHandler(resolve, reject))
  })
