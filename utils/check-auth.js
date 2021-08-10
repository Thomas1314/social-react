const { AuthenticationError } = require("apollo-server");
const jsw = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  // context = { ...headers }
  const authHeader = context.require.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    // Bearer ....
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be \"Beareer [token]");
  }
  throw new Error("Authentication token must be provided");
};
