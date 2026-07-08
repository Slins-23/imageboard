import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PostTags, { type TagLike } from "./PostTags";

const meta: Meta<typeof PostTags> = {
    title: "UI/Posts/PostTags",
    component: PostTags,
};

export default meta;

const tagNames = [
    "Anime",
    "Rain",
    "City",
    "Mountains",
    "Character",
    "Melancholic",
    "Sky",
    "Night",
    "Stars",
    "Dawn",
    "Ethereal",
    "Dusk",
    "Nebula",
    "Female",
    "Short hair",
    "Staring",
    "Solitude",
    "Wanderlust",
    "Woman",
    "Skyscraper",
    "Girl",
    "Fiction",
];

type MockTag = TagLike & { randomNumber: number };

const tags: MockTag[] = tagNames.map((tag) => {
    return { id: crypto.randomUUID(), name: tag, randomNumber: Math.random() };
});

export const Primary: StoryObj<typeof meta> = {
    args: {
        tags,
        onTagSelect: (event, tag) => {
            const wasMouseClick = event.type === "click";

            alert(
                `Tag "${tag.name}" selected through ${wasMouseClick ? "mouse click" : "key press"}.`
            );
        },
    },
    render: (args) => {
        return (
            <div>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url('/images/thumb/userb.jpg')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        top: 0,
                        left: 0,
                    }}
                />
                <PostTags {...args} />
            </div>
        );
    },
};
