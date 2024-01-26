import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './layouts/components/data-table/data-table.component';
import { RoutingDistinationComponent } from './layouts/pages/routing-distination/routing-distination.component';

const routes: Routes = [
  /* {
    path: "routing-destination", component: RoutingDistinationComponent, children: [
      { path: "data-table", component: DataTableComponent } // Cant start with a slash
    ]
  } */
  { path: "routing-destination/data-table", component: DataTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
