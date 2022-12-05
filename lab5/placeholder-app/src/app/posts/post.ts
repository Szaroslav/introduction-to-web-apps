export class Post {
    constructor(
        public userId: number = 0,
        public id: number = 0,
        public title: string = '',
        public body: string = ''
    ) {}
}