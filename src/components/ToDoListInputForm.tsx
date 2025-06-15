import { Flex, Input, InputGroup, Group, Button } from "@chakra-ui/react"
import { GiCheckMark } from "react-icons/gi";

const ToDoListInputForm = () => {
    return (
        <Flex minH="100vh" align="center" justify="center" flexDir="column" >
            <Group w={{ base: "70%", md: "30%" }} attached maxW="sm">
                <InputGroup startElement={<GiCheckMark />}>
                    <Input
                        placeholder="やること"
                        size='lg'
                        variant='outline'
                        css={{ '--focus-color': 'white' }} />
                </InputGroup>
                <Button variant="outline" colorPalette='purple' size='lg' >
                    追加
                </Button>
            </Group>
        </Flex>
    );
};

export default ToDoListInputForm;
