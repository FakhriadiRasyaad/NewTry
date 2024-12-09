import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Botpress: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const loadBotpress = () => {
      const script = document.createElement('script');
      script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      script.async = true;
      document.body.appendChild(script);
      const configScript = document.createElement('script');
      configScript.src = "https://files.bpcontent.cloud/2024/10/03/01/20241003014651-SMMMGG71.js";
      configScript.async = true;
      document.body.appendChild(configScript);
    };

 
    if (router.pathname === '/home' || router.pathname === '/monitor') {
      loadBotpress();
    }

    return () => {
      const scripts = document.querySelectorAll('script[src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"], script[src="https://files.bpcontent.cloud/2024/10/03/01/20241003014651-SMMMGG71.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [router.pathname]); 

  return null; 
};

export default Botpress;
