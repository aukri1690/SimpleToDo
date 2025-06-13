'use client';

import { Button, Card, Field, Input, Stack, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';

const LoginForm = () => {
    const router = useRouter();

    const goToPost = () => {
        router.push('/post');
    };

    return (
        <Flex minH="100vh" align="center" justify="center">
            <Card.Root maxW="sm">
                <Card.Header>
                    <Card.Title textAlign="center">ログイン</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">
                        <Field.Root required>
                            <Field.Label>
                                ユーザー名
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                placeholder="ユーザー名を入力"
                                variant="subtle"
                                css={{ '--focus-color': 'cyan' }}
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                メールアドレス
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                placeholder="メールアドレスを入力"
                                variant="subtle"
                                css={{ '--focus-color': 'cyan' }}
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                パスワード
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <PasswordInput
                                placeholder="パスワードを入力"
                                variant="subtle"
                                css={{ '--focus-color': 'cyan' }}
                            />
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent="center">
                    <Button onClick={goToPost} colorPalette="cyan" variant="surface">
                        ログイン
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Flex>
    );
};

export default LoginForm;