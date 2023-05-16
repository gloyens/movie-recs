import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const FormWrapper = styled("div", {
  css: css.FormWrapper,
  variants: {
    visible: {
      false: css.HideForm,
    },
  },
});

export const FormContent = styled("form", {
  css: css.FormContent,
});

export const Input = styled("input", {
  css: css.Input,
});

export const Submit = styled("button", {
  css: css.Submit,
});
