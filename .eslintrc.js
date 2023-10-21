"use strict";

module.exports = {
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["emojify-array"],
  rules: {
    "emojify-array/padded-emoji-array": [
      "error",
      {
        emoji: "🔥🔥",
      },
    ],
  },
};
