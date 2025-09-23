"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // This will be called when the user is created.
      fetch('/api/clerk/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp afterSignUp={() => window.location.href = '/'} />
    </div>
  );
}

