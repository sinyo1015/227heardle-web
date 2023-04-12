import { Box, Center, Text } from "@chakra-ui/react";
import IconAnswer from "./icon-answer";

const AnswerPlaceholders = (props: {answers: Answer[]}) => (
    <Box
    h={{
      base: "40vh",
      md: "45vh",
    }}
  >
    {Array.from(Array(6).keys()).map((e, i) => (
      <Center key={i}>
        <Box
          w={{
            base: "95%",
            md: "40%",
          }}
          mt={2}
          borderStyle="solid"
          borderWidth={2}
          p={2}
        >
          <div
            style={{
              display: "flex",
              verticalAlign: "middle",
              alignItems: "center",
              flex: 1,
              minHeight: 18,
            }}
          >
            <Text width="95%">{props.answers?.[i]?.label}</Text>
            <IconAnswer input={props.answers?.[i]?.answerType} />
          </div>
        </Box>
      </Center>
    ))}
  </Box>
);


export default AnswerPlaceholders;