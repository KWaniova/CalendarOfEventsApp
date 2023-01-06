//@ts-nocheck
import { useFormik } from "formik";
import { theme } from "src/styles/theme";
import Button from "../Button/Button";
import { FlexWrapper } from "../FlexWrapper/FlexWrapper";
import { FormInput } from "../FormTemplate/FormTemplate";
import { PanelBody } from "../Panel/Panel";
import { Heading, Text } from "../Typography/Typography";
import styled from "styled-components";

import * as yup from "yup";
import Icon, { ICON_TYPE } from "../icon/icon";
import { client } from "src";
import { EventType } from "src/types/Event";

const SelectStyle = styled.select`
padding: 6px;
border: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
border-radius: 5px;
margin-bottom: 16px;,
`;

export type EventFormData = {
  title: string;
  description: string;
  from: string;
  to: string;
  type: "PUBLIC" | "PRIVATE";
};

type Props = {
  initialValues: EventFormData;
  onSubmit: (values: EventType) => void;
  title: string;
  createdBy?: string;
  onDelete?: () => void;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  isMyEvent?: boolean;
  hide: () => void;
};

export const CreateEventSchema = yup.object().shape({
  title: yup.string().required("Title required"),
  desription: yup.string().required("decription required"),
  from: yup.string().required("From date required"),
  to: yup.string().required("To date required"),
});

export default function EventFormTemplate({
  isMyEvent,
  initialValues,
  setShowEventModal,
  onSubmit,
  title,
  createdBy,
  onDelete,
  hide,
}: Props) {
  const onSubmitData = () => {
    onSubmit(eventData);
  };
  const {
    values: eventData,
    setFieldValue,
    errors,
    validateField,
  } = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: initialValues,
    onSubmit: onSubmitData,
    validationSchema: CreateEventSchema,
  });

  const isValid = () => {
    return (
      eventData.title !== "" &&
      eventData.from &&
      eventData.to &&
      eventData.description !== ""
    );
  };

  return (
    <PanelBody
      flexDirection={"column"}
      noRadius
      width={"50%"}
      ml="normal"
      mr="normal"
      pt={20}
      pr={50}
      pl={50}
      style={{
        display: "flex",
        borderRadius: 10,
        border: `1px solid ${theme.colors.grayQuaternary}`,
      }}
    >
      <Heading
        style={{
          borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
          display: "flex",
          justifyContent: "space-between",
        }}
        fontSize={20}
        mb="normal"
        pb="small"
      >
        {title}
        {onDelete && (
          <Icon
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await client.resetStore();
              onDelete();
            }}
            type={ICON_TYPE.DELETE}
          />
        )}
      </Heading>

      {createdBy && (
        <Text mt="small" mb="small">
          Created by: {createdBy}
        </Text>
      )}

      <FormInput
        disabled={!isMyEvent}
        label={"Title"}
        onBlur={() => validateField("title")}
        onChange={(e) => setFieldValue("title", e.target.value)}
        value={eventData.title}
        error={errors.title}
        key={"title"}
        name="title"
      />
      <FormInput
        disabled={!isMyEvent}
        label={"Description"}
        onChange={(e) => setFieldValue("description", e.target.value)}
        value={eventData.description}
        error={errors.description}
      />
      <FormInput
        disabled={!isMyEvent}
        type="datetime-local"
        label={"From date"}
        onChange={(e) => {
          setFieldValue("from", e.target.value);
        }}
        value={eventData.from ?? ""}
        error={errors.from}
      />
      <FormInput
        disabled={!isMyEvent}
        type="datetime-local"
        label={"To date"}
        // mb="normal"
        onChange={(e) => setFieldValue("to", e.target.value)}
        value={eventData.to ?? ""}
        error={errors.to}
      />
      <SelectStyle
        disabled={!isMyEvent}
        id="event_select"
        onChange={(e) => {
          setFieldValue("type", e.target.value);
        }}
        value={eventData.type}
      >
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </SelectStyle>
      <FlexWrapper flexDirection={"row"}>
        <Button
          style={{ flex: 1 }}
          variant="secondary"
          onClick={() => {
            setShowEventModal(false);
            hide();
          }}
        >
          Close
        </Button>
        {isMyEvent && (
          <Button
            onClick={onSubmitData}
            ml="normal"
            style={{ flex: 1 }}
            variant="primary"
            type="submit"
            disabled={!isValid()}
          >
            Save
          </Button>
        )}
      </FlexWrapper>
    </PanelBody>
  );
}
