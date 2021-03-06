// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();
  const CORS = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };
  const userId = event['queryStringParameters']['id']; 

  var getUser = {
    TableName: 'Users',
    Key: {
      "id": userId
    },
    ProjectionExpression: "inventory,macros,macroGoals"
  };

  var getUserData;
  try {
    getUserData = await documentClient.get(getUser).promise();
    if(!getUserData.hasOwnProperty(["Item"])){
      var macrosJSON = {
        "calories": 0,
        "protein": 0,
        "fat": 0,
        "carbs": 0,
        "date": new Date().toJSON()
      };
      var macroGoals = {
        "calories"  : 2000,
        "carbs" : 300,
        "protein" : 70,
        "fat" : 65 
      }
      var newUser = {
        id: event['queryStringParameters']['id'],
        recipes: [],
        cachedRecipes : [],
        savedRecipeIds : [],
        inventory: [],
        macros: macrosJSON,
        macroGoals : macroGoals,
        inventoryRecipes: {"recipeList" : [], lastUpdateTime : 0},
        inventoryLastUpdatedTime : 0,
      };
      const insertUserParams = {
        TableName: "Users",
        Item: newUser
      };
        const insertUserData = await documentClient.put(insertUserParams).promise();
        var response = {
          body: JSON.stringify({ "user": newUser, isNewUser : true }),
          statusCode: 200,
          headers : CORS
        };
        return response;
      }}
      catch(e){
        let response = {
          headers : CORS,
          statusCode: 500,
          body: "User not found and could not be created. Error: " + JSON.stringify(e)
        };
        return response;
    }
    try{
    var user = getUserData["Item"];
    var response = {
      headers : CORS,
      body: JSON.stringify({ "user": user, isNewUser : false }),
      statusCode: 200
    };
    return response; // Returning a 200 if the item has been inserted
   }
  catch (e) {
    let response = {
      headers : CORS,
      statusCode: 500,
      body: "User exists but could not be retrieved. Error: " + JSON.stringify(e)
    };
    return response;
  }
};


