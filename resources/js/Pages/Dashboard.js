import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-3xl font-bold text-white">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
            </div>
        </Authenticated>
    );
}
