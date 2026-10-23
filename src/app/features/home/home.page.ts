import { Component } from '@angular/core';

import { About } from './components/about/about';
import { FeaturedProjects } from './components/featured-projects/featured-projects';
import { Hero } from './components/hero/hero';
import { SkillsGrid } from './components/skills-grid/skills-grid';

@Component({
  selector: 'app-home-page',
  imports: [Hero, About, FeaturedProjects, SkillsGrid],
  template: `
    <app-hero />
    <app-featured-projects />
    <app-about />
    <app-skills-grid />
  `
})
export class HomePage {}
