import { DownloadIcon } from './icons';
import { downloadFile } from '../lib/download';

export default function DownloadButton({ file, label, onClick }) {
  const handle = onClick || (() => downloadFile(file, file.split('/').pop()));
  return (
    <button className="dlbtn" onClick={handle}>
      <DownloadIcon />
      {label}
    </button>
  );
}
