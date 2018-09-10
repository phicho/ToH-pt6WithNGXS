import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { Select, Store } from '@ngxs/store';
import { GetHero, UpdateHero } from '../store/actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  @Select(state => state.heroes.selected) hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetHero(id))

    this.hero$.subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.store.dispatch(new UpdateHero(this.hero))
      .subscribe(() => this.goBack());
  }
}
