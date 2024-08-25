import React from 'react';
import {Label} from "@radix-ui/react-label";
import {Input} from "postcss";
import {Button} from "@/components/ui/button.tsx";

type RegisterFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    name: string;
    setName: (value: string) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
                                                              handleSubmit,
                                                              email,
                                                              setEmail,
                                                              password,
                                                              setPassword,
                                                              name,
                                                              setName,
                                                          }) => (
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
            <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                />
            </div>
        </div>

        <Button type="submit" className="w-full">
            Sign up
        </Button>
    </form>
);
