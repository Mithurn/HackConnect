import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasGitHubId: !!process.env.AUTH_GITHUB_ID,
    hasGitHubSecret: !!process.env.AUTH_GITHUB_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
  });
}
