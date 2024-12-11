import { useEffect, useRef, useState } from 'react';

interface ScriptLoaderOptions {
  id?: string;
  async?: boolean;
  defer?: boolean;
}

export function useScriptLoader(src: string, options: ScriptLoaderOptions = {}) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id, async = true, defer = false } = options;

  useEffect(() => {
    const existingScript = id 
      ? document.getElementById(id) 
      : document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    if (id) script.id = id;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      setIsLoaded(false);
    };
      
    scriptRef.current = script;
    document.body.appendChild(script);

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      scriptRef.current = null;
      setIsLoaded(false);
    };
  }, [src, id, async, defer]);

  return { isLoaded, scriptRef };
}