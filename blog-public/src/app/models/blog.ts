import { Comments } from './comments';

export class Blog {
    _id: string;
    name: string;
    description: string;
    images: [];
    author: string;
    favourites: boolean;
    comments: [Comments];
}