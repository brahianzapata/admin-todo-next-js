'use client';

import { useEffect } from "react";
import { useSession } from 'next-auth/react';


export default function ProfilePage() {

    const { data: session} = useSession();

    useEffect(() => {
      console.log('client side');
    }, []);
    
    return (
        <div>
            <h1>Profile Page</h1>
            <hr/>

            <div className="flex flex-col mt-5">
                <span>{ session?.user?.name ?? 'No name'}</span>
                <span>{ session?.user?.email ?? 'No Email'}</span>
                <span>{ session?.user?.image ?? 'No Image'}</span>
                <span>{ session?.user?.id ?? 'No UUID'}</span>
                <span>{ session?.user?.roles?.join(',') ?? ['No roles']}</span>
            </div>
        </div>
    );
}