export interface Images {
    thumbnailURL: string,
    sliderURLs: string[]
}

export interface Review {
    value: number,
    description: string,
    date: number,
    user: {nickname: string}
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
        },
        public reviews: Review[] = []
    ) {}
}

export class TripSpots {
    constructor(
        public reserved: number = 0,
        public available: number = 0
    ) {}
}