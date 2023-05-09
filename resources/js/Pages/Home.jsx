import App from "@/Layouts/App";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="py-4 px-6">Start chat with someone ...</div>
        </>
    );
}

Home.layout = (page) => <App children={page} />;
