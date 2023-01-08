//@ts-nocheck

import { FC, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import styled from "styled-components";

import { useFormik } from "formik";

import { AnimatePresence, motion } from "framer-motion";
import { PanelBody, PanelWrapper } from "../../components/Panel/Panel";
import { Heading, Text } from "../../components/Typography/Typography";
import {
  FormInput,
  FormPasswordInput,
} from "../../components/FormTemplate/FormTemplate";
import Button from "../../components/Button/Button";
import { client } from "src";
import TextAnimationWrapper from "src/components/TextAnimationWrapper/TextAnimationWrapper";
import Icon, { ICON_TYPE } from "src/components/icon/icon";
import { ROUTE_NAMES } from "src/App";
import { CREATE_NEW_USER_MUTATION } from "src/api/mutations";

const CreateUserSchema = yup.object().shape({
  email: yup.string().required("Email required"),
  first_name: yup.string().required("Name required"),
  last_name: yup.string().required("Last name required"),
  pass: yup.string().required("Password required"),
});

//TODO: refactor
interface IProps {}

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  pass: string;
}

const BackWrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  // align-items: center;
  color: ${({ theme }) => theme.colors.brandSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.brandPrimary};
  }
`;

const CreateNewUserTemplate: FC<IProps> = ({}) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {};

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { values, setFieldValue, validateField, errors } =
    useFormik<FormValues>({
      validateOnChange: false,
      initialValues: { first_name: "", last_name: "", pass: "", email: "" },
      onSubmit,
      validationSchema: CreateUserSchema,
    });

  const createNewUser = (values: FormValues) => {
    setIsLoading(true);

    client
      .mutate({
        mutation: CREATE_NEW_USER_MUTATION,
        variables: {
          email: values.email,
          firstName: values.first_name,
          lastName: values.last_name,
          password: values.pass,
        },
      })
      .then((result) => {
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsError(true);
        console.log("Error");
      });
  };

  const handleSubmit = () => {
    setIsError(false);
    createNewUser(values);
  };

  const duration = 1;

  const handleSubmitForm = () => {
    Object.keys(errors).length === 0 && handleSubmit();
  };

  const back = (
    <BackWrapper onClick={() => navigate(ROUTE_NAMES.login)}>
      <Icon mb={20} type={ICON_TYPE.ARROW_LEFT} />
      <Text>Back to login</Text>
    </BackWrapper>
  );

  if (isSuccess) {
    return (
      <AnimatePresence>
        <PanelWrapper>
          <PanelBody
            noRadius
            width={350}
            pt={30}
            pr={50}
            pl={50}
            bg="white"
            style={{
              minHeight: 450,
              borderRadius: 10,
              boxShadow: `1px 2px 2px 2px ${theme.colors.grayQuaternary} `,
            }}
          >
            {back}
            <Heading fontSize={20}>Account successfully created</Heading>
          </PanelBody>
        </PanelWrapper>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <PanelWrapper>
        <PanelBody
          noRadius
          width={350}
          pt={30}
          pr={50}
          pl={50}
          bg="white"
          style={{
            minHeight: 450,
            borderRadius: 10,
            boxShadow: `1px 2px 2px 2px ${theme.colors.grayQuaternary} `,
          }}
        >
          {back}

          <TextAnimationWrapper
            duration={duration}
            style={{ marginBottom: -30 }}
          ></TextAnimationWrapper>
          <motion.div
            transition={{ type: "spring", duration: duration, delay: 0.1 }}
            style={{
              width: 0,
            }}
            animate={{
              width: "100%",
            }}
          ></motion.div>
          <TextAnimationWrapper duration={duration} delay={0.3}>
            <Heading mt="large" mb={5} fontSize={20}>
              Create account
            </Heading>
          </TextAnimationWrapper>

          {isError && (
            <TextAnimationWrapper
              duration={duration}
              delay={0.4}
              style={{ marginBottom: -29 }}
            >
              <Text color={"danger"} mt={40}>
                Create account error.
              </Text>
            </TextAnimationWrapper>
          )}
          <motion.div
            transition={{ type: "spring", duration: duration, delay: 0.5 }}
            style={{
              opacity: 0,
              marginTop: 40,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <FormInput
              value={values.first_name}
              onBlur={() => validateField("first_name")}
              onChange={(e) => setFieldValue("first_name", e.target.value)}
              error={errors["first_name"]}
              key={"first_name"}
              name={"first_name"}
              label={"First name"}
              onEnterKeyDown={handleSubmitForm}
            />
            <FormInput
              value={values.last_name}
              onBlur={() => validateField("last_name")}
              onChange={(e) => setFieldValue("last_name", e.target.value)}
              error={errors["last_name"]}
              key={"last_name"}
              name={"last_name"}
              label={"Last name"}
              onEnterKeyDown={handleSubmitForm}
            />
            <FormInput
              value={values.email}
              onBlur={() => validateField("email")}
              onChange={(e) => setFieldValue("email", e.target.value)}
              error={errors.email}
              key={"email"}
              name={"email"}
              label={"E-mail"}
              onEnterKeyDown={handleSubmitForm}
            />
            <FormPasswordInput
              value={values.pass}
              onBlur={() => validateField("pass")}
              onChange={(e) => setFieldValue("pass", e.target.value)}
              error={errors.pass}
              key={"password"}
              name={"password"}
              label={"Password"}
              onEnterKeyDown={handleSubmitForm}
            />

            <Button
              variant="primary"
              width="100%"
              mt={30}
              mb={20}
              type="submit"
              isLoading={isLoading}
              onClick={handleSubmitForm}
            >
              <Text>Register</Text>
            </Button>
          </motion.div>
        </PanelBody>
      </PanelWrapper>
    </AnimatePresence>
  );
};

export default CreateNewUserTemplate;
