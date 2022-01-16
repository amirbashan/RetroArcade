const S = require("fluent-json-schema");

exports.signUpSchema = S.object()
  .prop("email", S.string().maxLength(100).required())
  .prop("password", S.string().minLength(6).maxLength(100).required())
  .prop("name", S.string().maxLength(30).required())
  .valueOf();

exports.loginSchema = S.object()
.prop("email", S.string().maxLength(100).required())
.prop("password", S.string().maxLength(100).required())
.valueOf();
