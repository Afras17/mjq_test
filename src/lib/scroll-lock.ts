/**
 * Reference-counted body scroll lock.
 *
 * Several overlays (search, quick view, cart) can be open in sequence or at
 * once. Each setting `body.style.overflow` directly means the first one to
 * unmount unlocks scrolling for the others. Counting locks fixes that: the
 * body is only released once every overlay has let go.
 */

let locks = 0;

export function lockScroll(): void {
  if (typeof document === 'undefined') return;
  if (locks === 0) {
    document.body.style.overflow = 'hidden';
  }
  locks += 1;
}

export function unlockScroll(): void {
  if (typeof document === 'undefined' || locks === 0) return;
  locks -= 1;
  if (locks === 0) {
    document.body.style.overflow = '';
  }
}
