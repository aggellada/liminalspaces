"use server";

import prisma from "@/lib/prisma";
import { cookies, headers } from "next/headers";

export const getOrCreateUplink = async (receiverId: string) => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const userId = cookieStore.get("liminal_user_id")?.value || headerStore.get("x-liminal-user-id");

  if (!userId) {
    console.error("Middleware failed to generate ID");
    return null;
  }

  if (userId === receiverId) return null;

  try {
    const existingUplink = await prisma.uplink.findFirst({
      where: {
        OR: [
          { initiatorId: userId, receiverId: receiverId },
          { initiatorId: receiverId, receiverId: userId },
        ],
      },
    });

    if (existingUplink) return existingUplink;

    const newUplink = await prisma.uplink.create({
      data: {
        initiatorId: userId,
        receiverId: receiverId,
      },
    });

    return newUplink;
  } catch (error) {
    console.error("createUplink Error", error);
    return null;
  }
};

export const getAllUplinks = async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const userId = cookieStore.get("liminal_user_id")?.value || headerStore.get("x-liminal-user-id");

  if (!userId) {
    console.error("Middleware failed to generate ID");
    return null;
  }

  try {
    const allUplinks = await prisma.uplink.findMany({
      where: {
        OR: [{ initiatorId: userId }, { receiverId: userId }],
      },
      include: {
        initiator: true,
        receiver: true,
        messages: true,
      },
    });

    if (!allUplinks) {
      return [];
    }

    return allUplinks;
  } catch (error) {
    console.error("getAllUplinks Error", error);
    return null;
  }
};

export const getSpecificUplink = async (uplinkId: string) => {
  try {
    const allUplinks = await prisma.uplink.findUnique({
      where: { id: uplinkId },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        receiver: true,
        initiator: true,
      },
    });

    if (!allUplinks) {
      throw new Error("No uplink found");
    }

    return allUplinks;
  } catch (error) {
    console.error("getSpecificUplink Error", error);
    return null;
  }
};

export const sendMessage = async (formData: FormData, uplinkId: string) => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const userId = cookieStore.get("liminal_user_id")?.value || headerStore.get("x-liminal-user-id");

  if (!userId) {
    console.error("Middleware failed to generate ID");
    return null;
  }

  try {
    const content = formData.get("content") as string;

    const newMessage = await prisma.message.create({ data: { senderId: userId, uplinkId, content } });

    if (!newMessage) {
      return { error: "Failed to send message" };
    }
  } catch (error) {
    console.error("sendMessage Error", error);
    return null;
  }
};
