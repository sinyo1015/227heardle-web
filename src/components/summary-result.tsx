import { Box, Heading } from "@chakra-ui/react";
import { AnswerType } from "../enums/answer-type";

const SummaryResult = (props: {answers: Answer[], isPlayerWon: boolean}) => (
  <>
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      fontSize={{
        base: 14,
        md: 18,
      }}
      justifyContent="center"
    >
      {props.answers.map((e, i) => {
        switch (e.answerType) {
          case AnswerType.Skipped:
            return (
              <span
                role="img"
                aria-label="Black medium square"
                className="react-emojis"
                style={{ lineHeight: 1 }}
                key={i}
              >
                ⬛
              </span>
            );
          case AnswerType.Incorrect:
            return (
              <span
                role="img"
                aria-label="Black medium square"
                className="react-emojis"
                style={{ lineHeight: 1 }}
                key={i}
              >
                🟥
              </span>
            );
          case AnswerType.Correct:
            return (
              <span
                role="img"
                aria-label="Black medium square"
                className="react-emojis"
                style={{ lineHeight: 1 }}
                key={i}
              >
                🟩
              </span>
            );
        }
      })}
    </Box>
    <Box>
      <Heading size="md">
        {props.isPlayerWon ? "Not Bad..." : "Better luck next time!"}
      </Heading>
    </Box>
    <Box
      fontSize={{
        base: 60,
        md: 80,
      }}
      ml="-53px"
      id={props.isPlayerWon ? "successWin" : "failToAnswer"}
    >
      <span
        role="img"
        aria-label="Result stat"
        className="react-emojis"
        style={{ lineHeight: 1 }}
      >
        {props.isPlayerWon ? "🎉" : "❌"}
      </span>
    </Box>
  </>
);

export default SummaryResult;
