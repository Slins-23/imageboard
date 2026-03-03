import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DialogCard from "./dialogCard";
import Button from "@/components/Button/button";
import TextBox from "@/components/TextBox/textBox";

const meta: Meta<typeof DialogCard> = {
    title: "Components/DialogCard",
    component: DialogCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DeleteAlbum: Story = {
    args: {
        children: (
            <>
                <span>
                    Are you sure you want to delete the album{" "}
                    <span style={{ color: "var(--tertiary)" }}>
                        Snowy places
                    </span>
                    ?
                </span>
                <div style={{ display: "flex", gap: "1.25rem" }}>
                    <Button aria-label="Yes">Yes</Button>
                    <Button aria-label="No">No</Button>
                </div>
            </>
        ),
        style: { width: "450px" },
    },
};

export const CreateAlbum: Story = {
    args: {
        children: (
            <>
                <span>Type the new album name</span>
                <TextBox
                    style={{
                        width: "50%",
                        fontSize: "0.889em",
                    }}
                />
                <Button aria-label={"Create"}>Create</Button>
            </>
        ),
        style: { width: "450px" },
    },
};

export const CreateAlbumSuccess: Story = {
    args: {
        children: (
            <>
                <span style={{ fontSize: "var(--font-size-3xl)" }}>
                    Successfully created album{" "}
                    <span style={{ color: "var(--tertiary)" }}>???????</span>
                </span>
                <Button aria-label={"OK"}>OK</Button>
            </>
        ),
        style: { width: "450px" },
    },
};

export const CreateAlbumError: Story = {
    args: {
        children: (
            <>
                <span style={{ fontSize: "var(--font-size-3xl)" }}>
                    Could not create album
                </span>
                <span style={{ fontSize: "var(--font-size-xl)" }}>
                    Reason: Too many characters (Max{" "}
                    <span style={{ color: "var(--tertiary)" }}>??</span>)
                </span>
                <Button aria-label={"OK"}>OK</Button>
            </>
        ),
        style: { width: "450px" },
    },
};

export const DeletePost: Story = {
    args: {
        children: (
            <>
                <span>Are you sure you want to delete this post?</span>
                <div style={{ display: "flex", gap: "1.25rem" }}>
                    <Button
                        aria-label="Yes"
                        style={{}}
                    >
                        Yes
                    </Button>
                    <Button aria-label="No">No</Button>
                </div>
            </>
        ),
        style: { width: "450px" },
    },
};

export const DeleteAccount: Story = {
    args: {
        children: (
            <>
                <span>Are you sure you want to delete this account?</span>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Button aria-label="Yes">Yes</Button>
                    <Button aria-label="No">No</Button>
                </div>
            </>
        ),
        style: { width: "450px" },
    },
};

export const SignupConfirmation: Story = {
    args: {
        children: (
            <>
                <span style={{ fontSize: "var(--font-size-2xl)" }}>
                    A confirmation link was sent to your e-mail. Open it in a
                    browser to complete your signature.
                </span>
                <Button aria-label={"OK"}>OK</Button>
            </>
        ),
        style: { width: "450px" },
    },
};
