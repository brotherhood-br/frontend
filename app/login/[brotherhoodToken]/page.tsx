"use client"

import SignInForm from "../login-form"

interface SignInInvitePageProps {
  params: { brotherhoodToken: string }
}

export default function SignInInvitePage({ params }: SignInInvitePageProps) {
  return <SignInForm inviteId={params.brotherhoodToken} />
}
