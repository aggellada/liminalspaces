"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const postBroadcast = async (formData: FormData): Promise<{ error?: string; success?: boolean }> => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("liminal_user_id")?.value;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { broadcast: true },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const lastBroadcast = await prisma.broadcast.findFirst({
      where: { anonymousId: existingUser.id },
      orderBy: { createdAt: "desc" }, // Get the newest one
    });

    if (lastBroadcast) {
      const timeSinceLastPost = Date.now() - new Date(lastBroadcast.createdAt).getTime();

      // 10 minutes * 60 seconds * 1000 milliseconds
      const TEN_MINUTES = 600000;
      if (timeSinceLastPost < TEN_MINUTES) {
        // Calculate how many minutes are left to show the user
        const minutesLeft = Math.ceil((TEN_MINUTES - timeSinceLastPost) / 60000);
        return { error: `To avoid spam, you can post a broadcast again in ${minutesLeft} minutes.` };
      }
    }

    const content = formData.get("text") as string;
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    await prisma.broadcast.create({
      data: {
        nonplaceId: "36972ce9-d254-48c5-8cb8-4b5399b4a1a4", // TODO: change this
        anonymousId: existingUser.id,
        content,
        expiresAt,
      },
    });

    revalidatePath("/zone");

    return { success: true };
  } catch (error) {
    console.error("postBroadcast error:", error);
    return { error: "Transmission failed. Satellite unreachable." };
  }
};

export const getNonplaceBroadcasts = async (nonplaceId: string) => {
  try {
    if (!nonplaceId) {
      throw new Error("No nonplaceId found.");
    }

    const broadcasts = prisma.broadcast.findMany({
      where: {
        nonplaceId: nonplaceId,
      },
      include: {
        anonymous: { select: { handle: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!broadcasts) {
      throw new Error("No broadcasts found");
    }

    return broadcasts;
  } catch (error) {
    console.log("getNonplaceBroadcasts Error", error);
    return null;
  }
};
