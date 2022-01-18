const S = require("fluent-json-schema");

exports.signUpSchema = S.object()
  .prop("email", S.string().maxLength(100).required())
  .prop("password", S.string().minLength(6).maxLength(100).required())
  .prop("name", S.string().maxLength(30).required())
  .valueOf();

exports.loginSchema = S.object().prop("email", S.string().maxLength(100).required()).prop("password", S.string().maxLength(100).required()).valueOf();

exports.postScore = S.object()
  .prop("game", S.string().maxLength(100).required())
  .prop("score", S.number().required())
  .prop("lvl", S.string().maxLength(10).required())
  .valueOf();
