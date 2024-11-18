"use client";

import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <section className='py-24'>
            <div className='container flex flex-col items-center justify-center'>
                {/* Sign-up form from Clerk */}
                <div className='mb-4'>
                    <SignUp />
                </div>
            </div>
        </section>
    );
}
