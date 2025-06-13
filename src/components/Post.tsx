'use client';

import { useState } from "react";
import { Flex, Button, Card, Field, Input, Textarea, Stack, IconButton } from "@chakra-ui/react"
import { HiPlus, HiMinus } from "react-icons/hi";

type PostItem = {
    title: string;
    contents: string;
};

const Post = () => {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [showForm, setShowForm] = useState(false);

    const handlePost = () => {
        if (!title && !contents) return;
        setPosts(prev => [{ title, contents }, ...prev]);
        setTitle('');
        setContents('');
    };

    const handleDelete = (index: number) => {
        setPosts((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <IconButton
                aria-label="Search database"
                variant='surface'
                colorPalette='cyan'
                rounded='full'
                size='2xl'
                position="fixed"
                bottom="6"
                right="6"
                zIndex="1000"
                onClick={() => setShowForm(prev => !prev)}>
                {showForm ? <HiMinus /> : <HiPlus />}
            </IconButton>

            <Flex minH="100vh" align="center" justify="center" flexDir="column" gap={6}>
                {showForm && (
                    <Card.Root w={{ base: "70%", md: "30%" }} mx="auto">
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field.Root required>
                                    <Input
                                        placeholder="タイトル"
                                        variant="subtle"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Textarea
                                        autoresize
                                        placeholder="内容を入力"
                                        variant="subtle"
                                        value={contents}
                                        onChange={(e) => setContents(e.target.value)}
                                    />
                                </Field.Root>
                            </Stack>
                        </Card.Body>
                        <Card.Footer justifyContent="center">
                            <Button
                                onClick={handlePost}
                                colorPalette="cyan"
                                variant="surface">
                                投稿する
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                )}

                {posts.map((item, idx) => (
                    <Card.Root w={{ base: "70%", md: "30%" }} mx="auto">
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field.Root>
                                    <Field.Label>{item.title}</Field.Label>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>{item.contents}</Field.Label>
                                </Field.Root>
                            </Stack>
                        </Card.Body>
                        <Card.Footer justifyContent="center">
                            <Button
                                onClick={() => handleDelete(idx)}
                                colorPalette="red"
                                variant="surface">
                                削除
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                ))}
            </Flex>
        </>
    );
};

export default Post;