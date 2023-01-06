//@ts-nocheck

import { FC, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// import { PanelBody } from 'components/atoms/Panel/Panel';

import { useFormik } from "formik";
import { gql } from "@apollo/client";

import { AnimatePresence, motion } from "framer-motion";
import { PanelBody, PanelWrapper } from "../../components/Panel/Panel";
import { Heading, Text } from "../../components/Typography/Typography";
import {
  FormInput,
  FormPasswordInput,
} from "../../components/FormTemplate/FormTemplate";
import Button from "../../components/Button/Button";
import { client } from "src";
import { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import TextAnimationWrapper from "src/components/TextAnimationWrapper/TextAnimationWrapper";
import { ROUTE_NAMES } from "src/App";

export const LoginPageSchema = yup.object().shape({
  user_name: yup.string().required("Username required"),
  pass: yup.string().required("Password required"),
});

//TODO: refactor
interface IProps {}

interface FormValues {
  user_name: string;
  pass: string;
}

const formInputNames = {
  userName: "user_name",
  password: "pass",
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      data {
        token
        id
      }
      status
    }
  }
`;

const LoginPageTemplate: FC<IProps> = ({}) => {
  const theme = useTheme();

  const { setToken } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {};

  const [isError, setIsError] = useState(false);
  const { values, setFieldValue, validateField, errors } =
    useFormik<FormValues>({
      validateOnChange: false,
      initialValues: { user_name: "", pass: "" },
      onSubmit,
      validationSchema: LoginPageSchema,
    });

  const logIn = (values: FormValues) => {
    setIsLoading(true);
    client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: values.user_name,
          password: values.pass,
        },
      })
      .then((result) => {
        setToken(result.data.login.data.token, result.data.login.data.id);
        // console.log(result.data.login.data.token);
        navigate(ROUTE_NAMES.calendar);
      })
      .catch((err) => {
        setIsError(true);
        console.log("Error");
      });
  };

  const handleSubmit = () => {
    setIsError(false);
    logIn(values);
  };

  const duration = 1;

  const handleSubmitForm = () => {
    Object.keys(errors).length === 0 && handleSubmit();
  };

  return (
    <AnimatePresence>
      <PanelWrapper>
        <PanelBody
          noRadius
          width={350}
          pt={50}
          pr={50}
          pl={50}
          bg="white"
          style={{
            minHeight: 450,
            borderRadius: 10,
            boxShadow: `1px 2px 2px 2px ${theme.colors.grayQuaternary} `,
          }}
        >
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
              Login
            </Heading>
          </TextAnimationWrapper>

          <TextAnimationWrapper
            style={{ marginBottom: theme.space.small }}
            duration={duration}
            delay={0.4}
          >
            <Text>User name and password</Text>
          </TextAnimationWrapper>

          {isError && (
            <TextAnimationWrapper
              duration={duration}
              delay={0.4}
              style={{ marginBottom: -29 }}
            >
              <Text color={"danger"} mt={40}>
                Login error.
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
              value={values[formInputNames.userName]}
              onBlur={() => validateField(formInputNames.userName)}
              onChange={(e) =>
                setFieldValue(formInputNames.userName, e.target.value)
              }
              error={errors[formInputNames.userName]}
              key={formInputNames.userName}
              name={formInputNames.userName}
              label={"Username"}
              onEnterKeyDown={handleSubmitForm}
            />

            <FormPasswordInput
              value={values[formInputNames.password]}
              onBlur={() => validateField(formInputNames.password)}
              onChange={(e) =>
                setFieldValue(formInputNames.password, e.target.value)
              }
              error={errors[formInputNames.password]}
              key={formInputNames.password}
              name={formInputNames.password}
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
              <Text>Sign up</Text>
            </Button>
            <Button
              variant="primary"
              width="100%"
              mt={30}
              mb={20}
              type="submit"
              isLoading={isLoading}
              onClick={() => navigate(ROUTE_NAMES.create_new_user)}
            >
              <Text>Sign in</Text>
            </Button>
          </motion.div>
        </PanelBody>
      </PanelWrapper>
    </AnimatePresence>
  );
};

export default LoginPageTemplate;
