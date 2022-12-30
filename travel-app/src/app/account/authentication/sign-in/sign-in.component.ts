import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
    form = this.fb.group({
        userId: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar) {}

    onSubmit(): void {
        const user = {
            id: this.form.get('userId')!.value,
            password: this.form.get('password')!.value
        };
        if (!user.id || user.id.length === 0 || !user.password || user.password.length === 0)
            return;

        this.authService.login(user.id, user.password)
            .subscribe({
                next: _ => {
                    if (this.authService.isAuthenticated()) {
                        this.snackBar.open('You has been logged successfully', '', { duration: 2000 });
                        setTimeout(() => this.router.navigate(['..', 'dashboard'], { relativeTo: this.route }), 2000);
                    }
                },
                error: err => {
                    console.log(err);
                    this.snackBar.open('Wrong email, username or password', '', { duration: 2000 });
                }
            });
    }
}