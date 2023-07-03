import fetch from "node-fetch";

export function webhookError(event, webhook) {
    const footer = "lol";
    fetch(webhook, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // the username to be displayed
            username: "Util Bot Error",
            // the avatar to be displayed
            avatar_url:
                "https://cdn.discordapp.com/avatars/369594312390082571/589e649cd8152d1ab70f31d4cbda7349.webp?size=1024",
            // contents of the message to be sent
            content: "<@324958899545309195>",
            // embeds to be sent
            embeds: [
                {
                    color: 0xff0000,
                    title: `Uncaught Exception: ${event.name}`,
                    fields: [
                        {
                            name: event.message,
                            value: event.stack,
                        },
                    ],
                    footer: {
                        text: footer,
                    },
                },
            ],
        }),
    });
}
