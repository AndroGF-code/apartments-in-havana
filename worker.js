export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/availability' && request.method === 'GET') {
      const apartment = url.searchParams.get('apartment');
      
      if (!apartment) {
        return new Response(JSON.stringify({ error: 'Apartment parameter required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const calendarIds = {
        centro: env.CENTRO_CALENDAR_ID,
        centro2: env.MAJESTIC_CALENDAR_ID,
        miramar1: env.MIRAMAR_CALENDAR_ID
      };

      const calendarId = calendarIds[apartment];
      if (!calendarId) {
        return new Response(JSON.stringify({ error: 'Invalid apartment' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const busyDates = await getBusyDates(calendarId, env);
        return new Response(JSON.stringify({ busy: busyDates }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function getBusyDates(calendarId, env) {
  const now = new Date();
  const threeMonthsLater = new Date(now);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  const timeMin = now.toISOString();
  const timeMax = threeMonthsLater.toISOString();

  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
    `timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&` +
    `singleEvents=true&orderBy=startTime&fields=items(start,end)`;

  const response = await fetch(calendarUrl, {
    headers: {
      'Authorization': `Bearer ${await getAccessToken(env)}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Calendar API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const events = data.items || [];

  return events.map(event => ({
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date
  }));
}

async function getAccessToken(env) {
  const jwt = await createJWT(env);
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await response.json();
  
  if (!data.access_token) {
    throw new Error('Failed to get access token: ' + JSON.stringify(data));
  }
  
  return data.access_token;
}

async function createJWT(env) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/calendar.read',
    aud: 'https://oauth2.googleapis.com/token',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const headerB64 = btoa(JSON.stringify(header)).replace(/+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  
  const message = `${headerB64}.${payloadB64}`;
  
  // Convert base64 private key to ArrayBuffer
  const privateKeyBase64 = env.GOOGLE_PRIVATE_KEY.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');
  const privateKeyBytes = Uint8Array.from(atob(privateKeyBase64), c => c.charCodeAt(0));
  
  try {
    const key = await crypto.subtle.importKey(
      'pkcs8',
      privateKeyBytes,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(message));
    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
    return `${message}.${signatureB64}`;
  } catch (error) {
    throw new Error('Failed to sign JWT: ' + error.message);
  }
}
