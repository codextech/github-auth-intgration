import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubIntegrationRoutingModule } from './github-integration-routing.module';
import { StatusComponent } from './status/status.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    StatusComponent,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    GithubIntegrationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class GithubIntegrationModule { }
