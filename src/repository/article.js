const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ARTICLES_TABLE = "articles";

const create = async (article) => {
  const articleId = uuidv4();

  const newArticle = {
    articleId,
    ...article,
  };

  const params = {
    TableName: ARTICLES_TABLE,
    Item: newArticle,
  };

  await dynamoDB.put(params).promise();

  return newArticle;
};

const get = async (articleId) => {
  const params = {
    TableName: ARTICLES_TABLE,
    Item: articleId,
  };

  const response = await dynamoDB.get(params).promise();

  return response.Item;
};

module.exports = { create, get };
