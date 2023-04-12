import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { RiShareLine, RiTwitterLine } from "react-icons/ri";

const ButtonSharer = (props: {copyToText: any, shareToTwitter: any}) => (
  <Box display="flex" flexDirection="column">
    <Button onClick={() => props.copyToText(false)} size="sm" mt={4} colorScheme="blue">
      <Icon as={RiShareLine} />
      <Text pl={2}>Share result!</Text>
    </Button>
    <Button onClick={props.shareToTwitter} size="sm" mt={4} colorScheme="twitter">
      <Icon as={RiTwitterLine} />
      <Text pl={2}>Share to Twitter!</Text>
    </Button>
  </Box>
);

export default ButtonSharer;
