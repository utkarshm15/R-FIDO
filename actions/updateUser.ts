"use server"

import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export async function updateUserPassword(password: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                ok: false,
                message: "Unauthorized Request"
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        });

        return {
            ok: true,
            message: "Password updated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Internal Server Error"
        };
    }
}

export async function updateUserPin(pin: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                ok: false,
                message: "Unauthorized Request"
            };
        }

        const hashedPin = await bcrypt.hash(pin, 10);
        
        await prisma.user.update({
            where: { id: session.user.id },
            data: { pin: hashedPin }
        });

        return {
            ok: true,
            message: "PIN updated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Internal Server Error"
        };
    }
}

export async function updateUserPhone(phone: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                ok: false,
                message: "Unauthorized Request"
            };
        }

        // Check if phone already exists
        const existingUser = await prisma.user.findUnique({
            where: { phone }
        });

        if (existingUser && existingUser.id !== session.user.id) {
            return {
                ok: false,
                message: "Phone number already in use"
            };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: { phone }
        });

        return {
            ok: true,
            message: "Phone number updated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Internal Server Error"
        };
    }
}

export async function updateUserImage(image: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                ok: false,
                message: "Unauthorized Request"
            };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: { image }
        });

        return {
            ok: true,
            message: "Profile image updated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Internal Server Error"
        };
    }
}

export async function getUserProfile() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return {
                ok: false,
                message: "Unauthorized Request"
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                phone: true,
                image: true,
                balance: true
            }
        });

        if (!user) {
            return {
                ok: false,
                message: "User not found"
            };
        }

        return {
            ok: true,
            data: user
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Internal Server Error"
        };
    }
}
