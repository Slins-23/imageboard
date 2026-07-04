import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PostTags from "./PostTags";

const meta: Meta<typeof PostTags> = {
    title: "UI/Posts/PostTags",
    component: PostTags,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        tags: [
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
        ],
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
