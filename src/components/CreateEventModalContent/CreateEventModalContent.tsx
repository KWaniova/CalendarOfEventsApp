// @ts-nocheck

import { useFormik } from "formik";
import { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import { useModalContext } from "src/context/ModalContext/Modal";
import { theme } from "src/styles/theme";
import Button from "../Button/Button";
import { FlexWrapper } from "../FlexWrapper/FlexWrapper";
import { FormInput } from "../FormTemplate/FormTemplate";
import { PanelBody } from "../Panel/Panel";
import { Heading } from "../Typography/Typography";
import styled from "styled-components";

import * as yup from "yup";
import Icon, { ICON_TYPE } from "../icon/icon";

export type EventType = {
  title: string;
  desription: string;
  from: string;
  to: string;
  type: "private" | "public";
};

const SelectStyle = styled.select`
padding: 6px;
border: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
border-radius: 5px;
margin-bottom: 16px;,
`;

export const CreateEventSchema = yup.object().shape({
  title: yup.string().required("Title required"),
  desription: yup.string().required("decription required"),
  from: yup.string().required("From date required"),
  to: yup.string().required("To date required"),
});

export default function CreateEventModal({}) {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    auth,
  } = useContext(GlobalContext);

  const { hide } = useModalContext();

  // const onSubmit = () => {
  //   const { title, description, from, to } = eventData;
  //   debugger;
  //   client
  //     .mutate({
  //       mutation: CREATE_EVENT_MUTATION,
  //       variables: {
  //         auth: auth.token,
  //         event: {
  //           title,
  //           description,
  //           startDate: `${from}T00:00:00`,
  //           endDate: `${to}T00:00:00`,
  //         },
  //       },
  //     })
  //     .then((result) => hide())
  //     .catch((err) => console.log(err));
  // };

  function onSubmit() {
    // setErrors([]);
    const calendarEvent = {
      title: eventData.title,
      description: eventData.description,
      //   label: selectedLabel,
      day: eventData.from,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
    hide();
  }

  const {
    values: eventData,
    setFieldValue,
    errors,
    setErrors,
    validateField,
  } = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      title: selectedEvent ? selectedEvent.title : "",
      description: selectedEvent ? selectedEvent.description : "",
      from: daySelected?.format("YYYY-MM-DD"),
      to: daySelected?.format("YYYY-MM-DD"),
      type: "private",
    },
    onSubmit,
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
        Add event
        <Icon
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatchCalEvent({
              type: "delete",
              payload: selectedEvent,
            });
            setShowEventModal(false);
            hide();
          }}
          type={ICON_TYPE.DELETE}
        />
      </Heading>

      <FormInput
        label={"Title"}
        onBlur={() => validateField("title")}
        onChange={(e) => setFieldValue("title", e.target.value)}
        value={eventData.title}
        error={errors.title}
        key={"title"}
        name="title"
      />
      <FormInput
        label={"Description"}
        onChange={(e) => setFieldValue("description", e.target.value)}
        value={eventData.description}
        error={errors.description}
      />
      <FormInput
        type="date"
        label={"From date"}
        onChange={(e) => {
          setFieldValue("from", e.target.value);
        }}
        value={eventData.from}
        error={errors.from}
      />
      <FormInput
        type="date"
        label={"To date"}
        // mb="normal"
        onChange={(e) => setFieldValue("to", e.target.value)}
        value={eventData.to}
        error={errors.to}
      />
      <SelectStyle
        id="event_select"
        onChange={(e) => {
          setFieldValue("type", e.target.value);
        }}
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </SelectStyle>
      <FlexWrapper flexDirection={"row"}>
        <Button
          style={{ flex: 1 }}
          onClick={() => {
            setShowEventModal(false);
            hide();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          ml="normal"
          style={{ flex: 1 }}
          variant="primary"
          type="submit"
          disabled={!isValid()}
        >
          Save
        </Button>
      </FlexWrapper>
    </PanelBody>
  );
}
