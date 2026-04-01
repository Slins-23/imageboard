// `followRelation` could be either `following` or `follows`
// As this component behaves the same way when displaying a list
// of user this user follows, or users that follow this user
export interface User {
    avatar?: string;
    name: string;
    followed: boolean;
}

export type Users = User[];
