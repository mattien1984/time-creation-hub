export function downloadFile(href, filename) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename || href.split('/').pop();
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadBlob(text, filename, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  downloadFile(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function swatchSVG(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="${c.hex}"/></svg>`;
}
