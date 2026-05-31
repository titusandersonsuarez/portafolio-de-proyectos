import { Component } from '@angular/core';

import { About } from './components/about/about';
import { Hero } from './components/hero/hero';
import { SkillsGrid } from './components/skills-grid/skills-grid';

@Component({
  selector: 'app-home-page',
  imports: [Hero, About, SkillsGrid],
  template: `
    <app-hero />
    <app-about />
    <app-skills-grid />
  `
})
export class HomePage {}
