import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class LoadingService {
  requestCount = signal(0);
  loading = computed(() => this.requestCount() > 0);

  show() {
    this.requestCount.update((count) => count + 1);
  }

  hide() {
    this.requestCount.update((count) => Math.max(0, count - 1));
  }
}

export default LoadingService;
