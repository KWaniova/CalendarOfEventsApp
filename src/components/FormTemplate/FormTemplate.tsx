// @ts-nocheck

import { ChangeEventHandler, useState } from "react";

// import Eye from 'assets/icons/Eye.svg';
// import EyeLine from 'assets/icons/EyeLine.svg';

import {
  SectionWrapper,
  FormInputWrapper,
  EyeWrapper,
} from "./FormTemplate.styles";
import { useTheme } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../Input/Input";
import { Text } from "../Typography/Typography";

export const InputErrorInfo = (props: { error?: string }) => {
  return (
    <AnimatePresence>
      {props.error && (
        <motion.div
          animate={{ opacity: 1 }}
          style={{ marginTop: 3, opacity: 0 }}
        >
          <Text color="danger">{props.error}</Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FormInput = ({
  label,
  onEnterKeyDown,
  ...props
}: {
  label: string;
  onEnterKeyDown?: () => void;
  error?: string;
  onChange: (e) => void;
  value: string;
  disabled?: boolean;
  type?: string;
  onBlur?: () => void;
  name?: string;
}) => {
  return (
    <SectionWrapper>
      {label && <Text color={"graySecondary"}>{label}</Text>}
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterKeyDown?.();
          }
        }}
        type={props.type ?? "none"}
        {...props}
      />
      <InputErrorInfo error={props.error} />
    </SectionWrapper>
  );
};

export const FormPasswordInput = ({ label, onEnterKeyDown, ...props }) => {
  const theme = useTheme();
  const [passVisible, setPassVisible] = useState(false);

  return (
    <SectionWrapper>
      {label && <Text color={"graySecondary"}>{label}</Text>}
      <FormInputWrapper>
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnterKeyDown?.();
            }
          }}
          type={passVisible ? "none" : "password"}
          {...props}
        />
        <EyeWrapper onClick={() => setPassVisible((state) => !state)}>
          {/* {!passVisible ? (
            <EyeLine height={22} fill={theme.colors.grayPrimary} />
          ) : (
            <Eye height={22} fill={theme.colors.grayPrimary} />
          )} */}
        </EyeWrapper>
      </FormInputWrapper>
      <InputErrorInfo error={props.error} />
    </SectionWrapper>
  );
};

type BaseInputProps = {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
};
export const BaseInput = ({ label, onChange, value }: BaseInputProps) => {
  return (
    <SectionWrapper>
      <Text color={"graySecondary"}>{label}</Text>
      <Input onChange={onChange} value={value} />
    </SectionWrapper>
  );
};
