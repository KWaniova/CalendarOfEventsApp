import { FC, useContext } from "react";

import * as yup from "yup";

import { PanelBody, PanelWrapper } from "../../components/Panel/Panel";
import GlobalContext from "src/context/GlobalContext";
import { useModalContext } from "src/context/ModalContext/Modal";
import { useFormik } from "formik";
import { Heading } from "src/components/Typography/Typography";
import { theme } from "src/styles/theme";
import { client } from "src";
import { FormInput } from "src/components/FormTemplate/FormTemplate";
import Button from "src/components/Button/Button";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import { EDIT_PROFILE_MUTATION } from "src/api/mutations";

//TODO: refactor
interface IProps {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
}

const EditUserSchema = yup.object().shape({
  email: yup.string().required("Email required"),
  first_name: yup.string().required("Name required"),
  last_name: yup.string().required("Last name required"),
});

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
}

const EditUserProfile: FC<IProps> = ({
  userID,
  first_name,
  last_name,
  email,
}) => {
  const { auth } = useContext(GlobalContext);

  const { hide } = useModalContext();

  const { values, setFieldValue, validateField, errors } =
    useFormik<FormValues>({
      validateOnChange: false,
      initialValues: { first_name, last_name, email },
      onSubmit: () => {},
      validationSchema: EditUserSchema,
    });

  const updateProfile = (values: FormValues) => {
    client
      .mutate({
        mutation: EDIT_PROFILE_MUTATION,
        variables: {
          auth: auth.token,
          email: values.email,
          firstName: values.first_name,
          lastName: values.last_name,
        },
      })
      .then((result) => {
        client.resetStore();
        hide();
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const handleSubmit = () => {
    updateProfile(values);
  };

  const handleSubmitForm = () => {
    Object.keys(errors).length === 0 && handleSubmit();
  };

  return (
    <PanelWrapper>
      <PanelBody
        flexDirection={"column"}
        noRadius
        width={350}
        pt={20}
        pr={20}
        pl={20}
        style={{
          display: "flex",
          minHeight: 450,
          borderRadius: 10,
          boxShadow: `1px 1px 1px 1px ${theme.colors.grayQuaternary} `,
        }}
      >
        <FlexWrapper
          style={{
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <FlexWrapper>
            <Heading
              style={{
                borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              fontSize={20}
              mb="normal"
              pb="small"
            >
              Connection detail
            </Heading>
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
            {/* <ProfileTemplate close={hide} data={data.user}> */}
          </FlexWrapper>
          <FlexWrapper flexDirection={"row"}>
            <Button
              style={{ flex: 1 }}
              onClick={hide}
              variant="secondary"
              mr="small"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              style={{ flex: 1 }}
              onClick={handleSubmitForm}
              variant="primary"
              type="submit"
              ml="small"
            >
              Save
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </PanelBody>

      {/* </ProfileTemplate> */}
    </PanelWrapper>
  );
};

export default EditUserProfile;
