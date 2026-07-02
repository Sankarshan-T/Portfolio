import { useEffect, useState } from "react";

type TerminalMode =
    | "idle"
    | "waiting-name"
    | "waiting-message"
    | "saving";

type LineType =
    | "normal"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "command";

interface TerminalLine {
    text: string;
    type: LineType;
}

const INITIAL_HISTORY: TerminalLine[] = [
    { text: "My guestbook...", type: "info" },
    { text: "", type: "normal" },
    { text: 'I want you to type "help" first.', type: "warning" },
    { text: "", type: "normal" },
];

export default function Terminal() {
    const [history, setHistory] = useState(INITIAL_HISTORY);

    const [input, setInput] = useState("");

    const [cancelled, setCancelled] = useState(false);

    const [mode, setMode] = useState<TerminalMode>("idle");

    const [guestbook, setGuestbook] = useState({
        name: "",
        message: "",
    });

    function print(
        text: string,
        type: LineType = "normal"
    ) {
        setHistory((prev) => [...prev, { text, type }]);
    }

    function saveName(name: string) {
        setGuestbook(prev => ({
            ...prev,
            name,
        }));

        print("Leave a message:");

        setMode("waiting-message");
    }

    async function saveMessage(message: string) {
        setGuestbook(prev => ({
            ...prev,
            message,
        }));

        print("");
        print("Committing...");
        try {
            const response = await fetch("/api/guestbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: guestbook.name,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save.");
            }

            print("");
            print("git add guestbook.md", "info");
            print(`git commit -m "${message}"`, "info");
            print("");
            print("Committing...", "info");
            print("[main a81f2c]");
            print("1 file changed, 1 insertion(+)", "success");
            print("");
            print("Guestbook updated!", "success");
        }
        catch {
            print("");
            print("Oops. Your commit couldn't be created.", "error");
        }

        setGuestbook({
            name: "",
            message: "",
        });

        setMode("idle");
    }

    function execute(command: string) {
        switch (command.toLowerCase()) {
            case "help":
                print("");
                print("Available commands:", "normal");
                print("> help   -   Show this message", "info");
                print("> sign   -   Sign the guestbook", "info");
                print("> clear  -   Clear terminal", "info");
                print("");
                break;

            case "clear":
                setHistory(INITIAL_HISTORY);
                return;

            case "sign":
                print("");
                print("What's your name?");
                setMode("waiting-name");
                break;

            default:
                print(`Command not found: ${command}`);
                print('Type "help" for available commands.');
        }
    }

    function handleCtrlC() {
        print("^C", "warning");
        print("cancelled whatever you were gonna do.", "success");
        print("");

        setGuestbook({
            name: "",
            message: "",
        });

        setMode("idle");

        setInput("");
    }

    const COLORS = {
        normal: "text-slate-300",
        success: "text-green-400",
        error: "text-red-400",
        warning: "text-yellow-400",
        info: "text-blue-400",
        command: "text-yellow-500",
    } as const;

    function handleEnter() {
        const value = input.trim();

        if (!value) return;

        setHistory(prev => [
            ...prev,
            {
                text: `$ ${value}`,
                type: "command",
            },
        ]);

        switch (mode) {
            case "idle":
                execute(value);
                break;

            case "waiting-name":
                saveName(value);
                break;

            case "waiting-message":
                saveMessage(value);
                break;
        }

        setInput("");
    }



    return (

        <div className="w-full bg-slate-950 text-green-400 font-mono p-4 rounded-xl">
            <div className="mb-3 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            {history.map((line, index) => (
                <div key={index} className={COLORS[line.type]}>
                    {line.text}
                </div>
            ))}

            <div className="flex gap-2">
                <span className="text-slate-300">$</span>

                <input
                    value={input}
                    disabled={mode === "saving"}
                    autoFocus
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-slate-300 outline-none"
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key.toLowerCase() === "c") {
                            e.preventDefault();
                            handleCtrlC();
                            return;
                        }

                        if (e.key === "Enter") {
                            handleEnter();
                        }
                    }}
                />
            </div>
        </div>

    );
}