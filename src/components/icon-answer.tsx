import { Icon } from "@chakra-ui/react";
import { RiCheckboxCircleLine, RiCloseCircleLine, RiSpeedLine } from "react-icons/ri";
import { AnswerType } from "../enums/answer-type";

const IconAnswer = (props: { input?: number }) => {
  switch (props.input) {
    case AnswerType.Skipped:
      return (
        <Icon
          style={{
            color: "gray",
            fontSize: "18pt",
          }}
          as={RiSpeedLine}
        />
      );
    case AnswerType.Correct:
      return (
        <Icon
          style={{
            color: "green",
            fontSize: "18pt",
          }}
          as={RiCheckboxCircleLine}
        />
      );
    case AnswerType.Incorrect:
      return (
        <Icon
          style={{
            color: "red",
            fontSize: "18pt",
          }}
          as={RiCloseCircleLine}
        />
      );
    default:
      return <div></div>;
  }
};

export default IconAnswer;