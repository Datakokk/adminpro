import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public title!: string;
  public titleSubscription$!: Subscription

  constructor( private router: Router,
                private route: ActivatedRoute) {
      console.log(route.snapshot.children[0].data)

      this.titleSubscription$ = this.getRouteArguments()
                                    .subscribe(({ title }) => {
                                        this.title = title;
                                        document.title = `AdminPro - ${title}`
                                    })
  }
  
  getRouteArguments(){
    return this.router.events
    .pipe(
      filter<any>(event  => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
   }

  ngOnDestroy(): void {
    this.titleSubscription$.unsubscribe();
  }

}
