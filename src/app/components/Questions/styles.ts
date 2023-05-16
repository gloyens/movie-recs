import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const QuestionsWrapper = styled("div", {
  css: css.QuestionsWrapper,
});

export const AnswersWrapper = styled("ul", {
  css: css.AnswersWrapper,
});

export const AnswerWrapper = styled("li", {
  css: css.AnswerWrapper,
});

export const Answer = styled("button", {
  css: css.Answer,
  variants: {
    disabled: {
      true: css.DisabledAnswer,
    },
  },
});
