import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
    form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[^@]+/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        address: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: ['', [Validators.required, Validators.minLength(4)]],
        country: ['', [Validators.required, Validators.minLength(2)]]
    });

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar) {}

    onSubmit(): void {
        const user = {
            username: this.form.get('username')!.value,
            email: this.form.get('email')!.value,
            password: this.form.get('password')!.value,
            firstName: this.form.get('password')!.value,
            lastName: this.form.get('password')!.value,
            address: this.form.get('password')!.value,
            city: this.form.get('password')!.value,
            postalCode: this.form.get('password')!.value,
            country: this.form.get('password')!.value,
        };
        if (this.form.invalid)
            return;

        this.authService.register(user)
            .subscribe(_ => {
                this.snackBar.open('You has been registered successfully', '', { duration: 2000 });
                setTimeout(() => this.router.navigate(['..', 'login'], { relativeTo: this.route }), 2000);
            });
    }
}