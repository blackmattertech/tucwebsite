import React from 'react';
import { Link } from 'react-router';

export function Social() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-gray-900 mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700 }}>
        Connect With Us
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-8" style={{ fontSize: '18px', lineHeight: 1.6 }}>
        Follow Tag Unlimited on social media for updates, behind-the-scenes, and industry insights.
      </p>
      <p className="text-gray-500 text-sm">
        Use the Social card (top right, next to Contact) to open Facebook, Instagram, and YouTube.
      </p>
      <Link
        to="/"
        className="mt-8 text-gray-900 font-semibold underline hover:no-underline"
      >
        Back to Home
      </Link>
    </div>
  );
}
