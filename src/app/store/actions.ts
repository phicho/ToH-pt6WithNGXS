import { Hero } from "../hero";

export class GetHeros {
    static readonly type = '[Heros API] Fetch heros lists';
}
export class GetHero {
    static readonly type = '[Heros API] Fetch hero';
    constructor(public id: number) { }
}
export class UpdateHero {
    static readonly type = '[Heros API] Update hero';
    constructor(public hero: Hero) { }
}
export class AddHero {
    static readonly type = '[Heros API] Add hero';
    constructor(public hero: Hero) { }
}
export class DeleteHero {
    static readonly type = '[Heros API] Delete hero';
    constructor(public hero: Hero) { }
}
