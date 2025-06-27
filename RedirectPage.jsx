import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../logging-middleware/services/api';

function RedirectPage() {
  const { shortCode } = useParams();

  useEffect(() => {
    API.get(`/url/redirect/${shortCode}`)
      .then(res => {
        window.location.href = res.data.originalUrl;
      })
      .catch(() => {
        alert('Invalid or expired link');
      });
  }, [shortCode]);

  return (
    <div>Redirecting...</div>
  );
}

export default RedirectPage;
