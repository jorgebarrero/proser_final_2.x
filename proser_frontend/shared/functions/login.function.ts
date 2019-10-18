export function logout(authService, routeOk: string, routeFail: string) {
  authService.logoutUser().subscribe(
    data => {
      this.router.navigate([routeOk]);
    },
    error => {
      this.onError(error);
      this.router.navigate([routeFail]);
    }
  );
}
