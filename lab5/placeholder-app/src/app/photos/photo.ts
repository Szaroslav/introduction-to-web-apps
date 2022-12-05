export class Photo {
    constructor(
        public albumId: number = 0,
        public id: number = 1,
        public title: string = '',
        public url: string = '',
        public thumbnailUrl: string = ''
    ) {}
}