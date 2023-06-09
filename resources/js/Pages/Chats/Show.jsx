import App from "@/Layouts/App";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function Show(props) {
    const { auth } = usePage().props;
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);
    const messageRef = useRef(null);
    const { user, chats } = props;
    const { data, setData, reset, errors, post } = useForm({ message: "" });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("chats.store", user.username), {
            onSuccess: () => {
                reset("message");
                scrollRef.current.scrollTo(0, 999999999);
            },
        });
    };

    const sts = (x, y, option = "justify") => {
        if (option == "justify") {
            return x === y ? "justify-end" : "justify-start";
        }
        if (option == "background") {
            return x === y ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900";
        }
    };

    const onTyping = () => {
        setTimeout(() => {
            Echo.private(`chats.${user.uuid}`).whisper("isTyping", { name: user.name });
        }, 500);
    };

    Echo.private("chats." + auth.user.uuid)
        .listenForWhisper("isTyping", (e) => {
            setTyping(true);

            setTimeout(() => setTyping(false), 5000);
        })
        .listen("MessageSent", ({ chat }) => {
            router.reload({
                preserveScroll: true,
                onSuccess: () => {
                    scrollRef.current.scrollTo(0, 999999999);
                    setTyping(false);
                },
            });
        });

    useEffect(() => {
        scrollRef.current.scrollTo(0, 999999999);
        messageRef.current.focus();
    }, []);
    return (
        <>
            <Head title={`Chat With ${user.name}`} />
            <div className="flex flex-col justify-between h-screen">
                <div className="border-b p-4">
                    <h1 className="font-semibold">{user.name}</h1>
                    {typing && <div className="text-xs text-gray-500">is typing ...</div>}
                </div>
                <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2" ref={scrollRef}>
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <div className={`flex ${sts(auth.user.id, chat.sender_id)}`} key={chat.id}>
                                <div
                                    className={`p-4 text-sm rounded-xl ${sts(
                                        auth.user.id,
                                        chat.sender_id,
                                        "background"
                                    )}`}
                                >
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Start chat now ...</div>
                    )}
                </div>
                <div className="border-t px-4 py-2">
                    <form onSubmit={submitHandler}>
                        <input
                            onKeyUp={onTyping}
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Start Typing"
                            autoComplete={"off"}
                            value={data.message}
                            ref={messageRef}
                            onChange={(e) => setData({ ...data, message: e.target.value })}
                            className="form-input focus:outline-none focus:border-0 border-0 focus:ring-0 w-full p-0"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <App children={page} />;
