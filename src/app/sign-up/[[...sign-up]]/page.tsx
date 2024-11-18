"use client";

import { Input } from '@/components/ui/input';
import { SignUp } from '@clerk/nextjs';
import { useState } from 'react';

export default function Page() {
    const [role, setRole] = useState("");

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
