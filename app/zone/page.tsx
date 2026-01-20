"use client";

import { useGeofence } from "@/lib/hooks/useGeofence";
import EnteringZone from "../components/UI/EnteringZone";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MalfunctionScreen from "../components/UI/MalfunctionScreen";

const Zone = () => {
  const router = useRouter();

  const { nonPlace, loading, error, nonPlaceId } = useGeofence();

  useEffect(() => {
    if (!loading && nonPlaceId) {
      router.push(`/zone/${nonPlaceId}`);
    }
  }, [loading, nonPlace, nonPlaceId, router]);

  if (loading) {
    return <EnteringZone />;
  }

  if (error || !nonPlace) {
    return <MalfunctionScreen />;
  }

  return <EnteringZone />;
};

export default Zone;
