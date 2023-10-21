/**
 * @fileoverview Make sure arrays start and end with an emoji"
 * @author Jude Agboola
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null,
    docs: {
      description: "Make sure arrays start and end with an emoji",
      recommended: false,
      url: null,
    },
    fixable: "code",
  },
  schema: [
    {
      type: "object",
      properties: {
        emoji: {
          type: "string",
        },
      },
    },
  ],
  create(context) {
    const [optionsObject] = context.options;

    const emoji = optionsObject.emoji || "🔥";
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function containsEmoji(value) {
      const emojiPattern = /[\p{Emoji}]/gu;

      return emojiPattern.test(value);
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ArrayExpression(node) {
        const startAndEndContainsEmoji =
          containsEmoji(node.elements[0].value) &&
          containsEmoji(node.elements[node.elements.length - 1].value);

        if (!startAndEndContainsEmoji) {
          context.report({
            node,
            message: "Array should start and end with an emoji",
            fix(fixer) {
              const firstElement = node.elements[0];
              const lastElement = node.elements[node.elements.length - 1];

              const fixes = [
                fixer.insertTextBefore(firstElement, `"${emoji}", `),
                fixer.insertTextAfter(lastElement, `, "${emoji}"`),
              ];

              return fixes;
            },
          });
        }
      },
    };
  },
};
