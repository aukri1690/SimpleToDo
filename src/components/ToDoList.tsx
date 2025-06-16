'use client';

import { useState } from "react";
import { Flex, Input, InputGroup, Group, Button, CheckboxCard } from "@chakra-ui/react"
import { GiCheckMark } from "react-icons/gi";

type PostItem = {
    toDoListContents: string;
};

const ToDoList = () => {
    const [toDoListContents, setToDoListContents] = useState('')
    const [postContents, setPostContents] = useState<PostItem[]>([]);

    const handlePost = () => {
        if (!toDoListContents) return;
        setPostContents(prev => [{ toDoListContents }, ...prev]);
        setToDoListContents('');
    };

    return (
        <>
            <Flex align="center" justify="center" flexDir="column" gap={5}>
                <Group w={{ base: "70%", md: "30%" }} attached maxW="sm" mt={10}>
                    <InputGroup startElement={<GiCheckMark />}>
                        <Input
                            placeholder="やること"
                            size='xl'
                            variant='outline'
                            css={{ '--focus-color': 'white' }}
                            value={toDoListContents}
                            onChange={(e) => setToDoListContents(e.target.value)} />
                    </InputGroup>
                    <Button
                        variant="outline"
                        colorPalette='purple'
                        size='xl'
                        onClick={handlePost}>
                        追加
                    </Button>
                </Group>

                {postContents.map((item, idx) => (
                    <CheckboxCard.Root
                        key={idx}
                        w={{ base: "70%", md: "30%" }}
                        size='sm'
                        maxW="sm"
                        variant="outline">
                        <CheckboxCard.Control>
                            <Flex justify="space-between" align="center" w="100%">
                                <CheckboxCard.Label>
                                    {item.toDoListContents}
                                </CheckboxCard.Label>
                                <Button
                                    variant="outline"
                                    colorPalette='purple'>
                                    完了
                                </Button>
                            </Flex>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                ))}
            </Flex>
        </>
    )
};

export default ToDoList;