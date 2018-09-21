import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Select, Store } from '@ngxs/store';
import { GetHeros, AddHero, DeleteHero } from '../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  @Select(state => state.heroes.list) heroes$: Observable<Hero[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetHeros());
    this.heroes$.subscribe(heroList => this.heroes = heroList);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero));
  }

}
