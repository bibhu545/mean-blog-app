export class DDLModel {
    value: string;
    text: string;
    constructor(value: string, text: string) {
        this.value = value;
        this.text = text;
    }
}

export class UserModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isAdmin: boolean;
}

export class CategoryModel {
    categoryId: string;
    name: string;
    isActive: number;
}

export class PostModel {
    postId: string;
    title: string;
    authorId: string;
    authorDetails: UserModel;
    categoryId: string;
    categoryDetails: CategoryModel;
    body: string;
    bodyText: string;
    readingTime: number;
    disableComments: boolean;
    isFeatured: boolean;
    addedOn: Date;
}

export class CommentModel {
    commentBody: string;
    userId: string;
    postId: string;
    commentId: string;
    userDetails: UserModel;
}