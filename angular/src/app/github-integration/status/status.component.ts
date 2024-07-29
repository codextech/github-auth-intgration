import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  userStatus: any;
  isConnected: boolean = false;
  token: string | null = localStorage.getItem('githubToken');
  isLoading = false;
  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    if (this.token) {
      this.githubService.getUserStatus().subscribe((response: any) => {
        this.isConnected = response.connected;
        this.userStatus = response.user;
      });
    }
  }

  removeIntegration(): void {
    if (this.token) {
      this.isLoading = true;
      this.githubService.removeIntegration().subscribe(() => {
        this.isConnected = false;
        this.userStatus = null;
        localStorage.removeItem('githubToken');
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
    }
  }

  connect(): void {
    this.isLoading = true;
    this.githubService.getAuthUrl().subscribe((response: any) => {
      window.location.href = response.url;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }
}
