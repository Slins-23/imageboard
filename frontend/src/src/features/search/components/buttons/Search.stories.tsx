import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Search/Buttons/Search",
    component: IconButton,
};

export default meta;

export const SearchButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "searchBtn",
        disabled: false,
        icon: faSearch,
    },
};
