import {Component, OnInit} from '@angular/core';
import {BcData} from './interfaces/breadcrumbs';
import {distinctUntilChanged, filter} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  breadcrumbs: BcData[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.breadcrumbs = this.create(this.activatedRoute.root);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = this.create(this.activatedRoute.root);
    });
  }

  private create(route: ActivatedRoute, url: string = "", breadcrumbs: BcData[] = []): BcData[] {

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({text: child.snapshot.data['breadcrumbs'], url: url});
      return this.create(child, url, breadcrumbs);
    }

    console.log('hi', breadcrumbs);

    return breadcrumbs;
  }

}
