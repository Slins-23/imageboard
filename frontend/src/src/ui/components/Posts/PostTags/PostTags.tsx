import postTagsStyle from "./PostTags.module.css";
import Card from "@/ui/components/Layout/Card/Card";
import Button from "@/ui/components/Buttons/Button/Button";
import Link from "next/link";
import { makeKebabCase } from "@/ui/utils/strings";
import type { MouseEvent, KeyboardEvent } from "react";

export interface TagLike {
    id: string;
    name: string;
}

interface PostTagsProps<Tag extends TagLike> {
    tags: Tag[];
    onTagSelect?: (
        event: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>,
        tag: Tag
    ) => void;
}

export default function PostTags<Tag extends TagLike>({
    tags,
    onTagSelect,
}: PostTagsProps<Tag>) {
    return (
        <Card className={postTagsStyle.card}>
            <span>Tags</span>
            <ul className={postTagsStyle.tagsList}>
                {tags.map((tag: Tag) => (
                    <li key={tag.id}>
                        <Button
                            as={Link}
                            href={`/tags/${makeKebabCase(tag.name)}`}
                            className={postTagsStyle.tagBtn}
                            onClick={(event) => {
                                onTagSelect?.(event, tag);
                            }}
                            onKeyDown={(event) => {
                                onTagSelect?.(event, tag);
                            }}
                        >
                            {tag.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
