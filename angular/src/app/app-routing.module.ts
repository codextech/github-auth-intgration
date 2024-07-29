import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/status', pathMatch: 'full' },
  { path: 'status', loadChildren: () => import('./github-integration/github-integration.module').then(m => m.GithubIntegrationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
