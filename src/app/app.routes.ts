import { Routes } from '@angular/router';

// import { ListComponent } from '@products/page/list/list.component';
// import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import path from 'path';
// import { ProdutcDetailComponent } from '@products/page/produtc-detail/produtc-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/page/list/list.component')
      }, {
        path: 'about',
        loadComponent: () => import('./domains/info/pages/about/about.component')
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./domains/products/page/produtc-detail/produtc-detail.component')
      },
      {
        path: 'services',
        loadComponent: () => import('./domains/info/pages/services/services.component')
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
