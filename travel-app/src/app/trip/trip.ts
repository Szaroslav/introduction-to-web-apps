interface Images {
    thumbnailURL: string,
    sliderURLs: string[]
}

export class Trip {
    constructor(
        public id: number = -1,
        public name: string = '',
        public country: string = '',
        public startDate: any = 0,
        public endDate: any = 0,
        public unitPrice: number = 0,
        public spotsNumber: number = 0,
        public purchasedSpotsNumber: number = 0,
        public description: string = '',
        public images: Images = {
            thumbnailURL: '',
            sliderURLs: []
        }
    ) {}
}