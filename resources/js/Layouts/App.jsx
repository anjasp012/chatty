import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

export default function App({ title, children }) {
    const { users, auth } = usePage().props;
    return (
        <div className="flex min-h-screen">
            <Head title={title} />
            <div className="w-1/3">
                <div className="fixed flex flex-col w-1/3 px-6 py-4 text-right h-full border-r">
                    <div className="flex-1 overflow-y-auto space-y-1">
                        {users.map((user) => (
                            <Link
                                key={user.id}
                                href={route("chats.show", user)}
                                className={`block py-1 px-2 rounded-md ${
                                    route().current("chats.show", user.username)
                                        ? "text-black font-semibold bg-gradient-to-l from-green-300 via-white to-white"
                                        : "text-gray-600 bg-gradient-to-l from-gray-300 via-white to-white"
                                }`}
                            >
                                {user.name}
                            </Link>
                        ))}
                    </div>
                    <div className="bg-gradient-to-l from-green-300 via-white to-white rounded-xl p-4 space-y-3">
                        <div>{auth.user.name}</div>
                        <Link
                            href={route("logout")}
                            method="POST"
                            as="button"
                            className="bg-white border font-medium text-black rounded-xl px-4
                         py-2"
                        >
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-2/3">{children}</div>
        </div>
    );
}
