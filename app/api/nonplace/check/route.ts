import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lat, lng } = await req.json();

    if (!lat || !lng) {
      return NextResponse.json({ status: "ERROR", message: "Invalid Coordinates" }, { status: 400 });
    }

    // THE RAW SQL QUERY
    // 1. ST_MakePoint(lng, lat): Create a point from the inputs. Note it is LNG then LAT.
    // 2. ST_SetSRID(..., 4326): Tell PostGIS this is on Earth (WGS 84).
    // 3. ST_Contains(geofence, ...): The "Magic Check". Returns true if point is inside polygon.

    const result: any[] = await prisma.$queryRaw`
      SELECT id, name
      FROM "NonPlace"
      WHERE ST_Contains(
        geofence,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
      )
      LIMIT 1;
    `;

    const nonplace = result[0];

    if (nonplace) {
      // SCENARIO A: They are inside a known nonplace (e.g., Airport)
      return NextResponse.json({
        status: "FOUND",
        nonplace: {
          id: nonplace.id,
          name: nonplace.name,
          description: nonplace.description,
        },
      });
    } else {
      // SCENARIO B: They are outside (The Void)
      return NextResponse.json({ status: "VOID" });
    }
  } catch (error) {
    console.error("Geofence Error:", error);
    return NextResponse.json({ status: "ERROR" }, { status: 500 });
  }
}
