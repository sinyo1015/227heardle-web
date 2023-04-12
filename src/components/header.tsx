import { Box, Center, Icon, Image } from "@chakra-ui/react";
import { RiBarChartBoxLine, RiInformationLine, RiNotification4Line, RiQuestionLine } from "react-icons/ri";
import nanabunLogo from "../assets/logo227.png";

const Header = (props: {showModalAboutTrigger: any, showModalAnnoucementTrigger: any, showModalHowToPlayTrigger: any, showModalStats: any}) => (
    <div className="header">
    <Center>
      <Box w="100%" borderStyle="solid" borderBottom="1px">
        <Center>
          <Box
            w={{
              base: "100%",
              md: "50%",
            }}
            display="flex"
            fontSize="18pt"
            p={1}
            gap={15}
          >
            <Box>
              <Icon
                onClick={() => props.showModalAboutTrigger(true)}
                as={RiInformationLine}
              />
            </Box>
            <Box>
              <Icon 
              onClick={() => props.showModalAnnoucementTrigger(true)}
              as={RiNotification4Line} 
              />
            </Box>
            <Box flexBasis="80%">
              <Center>
                <Image src={nanabunLogo} h={7} mt={1} />
              </Center>
            </Box>
            <Box>
              <Icon onClick={props.showModalStats} as={RiBarChartBoxLine} />
            </Box>
            <Box>
              <Icon
                onClick={() => props.showModalHowToPlayTrigger(true)}
                as={RiQuestionLine}
              />
            </Box>
          </Box>
        </Center>
      </Box>
    </Center>
  </div>
);

export default Header;