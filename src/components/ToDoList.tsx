'use client';

import { useState, useEffect } from "react";
import { Flex, Input, InputGroup, Group, Button, CheckboxCard } from "@chakra-ui/react"
import { FaRegCircleCheck } from "react-icons/fa6";
import { supabase } from '@/lib/supabaseClient';

type PostItem = {
    id: string;
    toDoListContents: string;
};

const ToDoList = () => {
    const [toDoListContents, setToDoListContents] = useState('')
    const [postContents, setPostContents] = useState<PostItem[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });

            if (error) {
                console.error('Fetch error:', error.message);
                return;
            }

            if (data) {
                setPostContents(
                    data.map((item) => ({
                        id: item.id,
                        toDoListContents: item.content,
                    }))
                );
            }
        };

        fetchTodos();
    }, []);

    const handlePost = async () => {
        if (!toDoListContents) return;

        const { data, error } = await supabase
            .from('todos')
            .insert([{ content: toDoListContents }])
            .select();

        if (error) {
            console.error('Insert error:', error.message);
            return;
        }

        if (data && data[0]) {
            setPostContents((prev) => [
                {
                    id: data[0].id,
                    toDoListContents: data[0].content,
                },
                ...prev,
            ]);
        }

        setToDoListContents('');
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('todos').delete().eq('id', id);

        if (error) {
            console.error('Delete error:', error.message);
            return;
        }

        setPostContents((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <>
            <Flex align="center" justify="center" flexDir="column" gap={5}>
                <Group w={{ base: "70%", md: "30%" }} attached maxW="sm" mt={10}>
                    <InputGroup startElement={<FaRegCircleCheck color='green' />}>
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

                {postContents.map((item) => (
                    <CheckboxCard.Root
                        key={item.id}
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
                                    onClick={() => handleDelete(item.id)}
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