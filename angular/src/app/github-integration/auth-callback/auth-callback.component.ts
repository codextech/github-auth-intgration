import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  errorMessage: string | null = null;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.githubService.exchangeCodeForToken(code).subscribe({
          next: (response: any) => {
            localStorage.setItem('githubToken', response.token);
            this.router.navigate(['/status']);
          },
          error: (error) => {
            this.hasError = true;
            this.errorMessage = 'Failed to authenticate with GitHub. Please try again later.';
            console.error('GitHub authentication error:', error);
          }
        });
      } else {
        this.hasError = true;
        this.errorMessage = 'No authorization code found. Please try again.';
      }
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
