import { createContext, useContext, type RefObject } from "react";

interface PostData {
    errorMessage?: string;
    postURL?: string;
}

const PostContext = createContext<RefObject<PostData> | undefined>(undefined);

export function usePostContext() {
    const context = useContext(PostContext);

    if (context === undefined) {
        throw new Error("Error: Could not use post context.");
    }

    return context;
}

export const PostProvider = PostContext.Provider;
