const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';
const MAILERLITE_GROUP_ID = '200951716555785626';

function readBody(body) {
  if (!body) return {};
  if (typeof body !== 'string') return body;

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

module.exports = async function newsletterSubscribe(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const token = process.env.MAILERLITE_API_TOKEN;
  if (!token) {
    console.error('MAILERLITE_API_TOKEN is not configured.');
    return response.status(503).json({
      ok: false,
      message: 'Signup is temporarily unavailable. Please try again shortly.'
    });
  }

  const body = readBody(request.body);
  const firstName = String(body.first_name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().toLowerCase();
  const website = String(body.website || '').trim();

  // Quietly accept likely bot submissions without sending them to MailerLite.
  if (website) {
    return response.status(200).json({ ok: true });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firstName || email.length > 254 || !emailPattern.test(email)) {
    return response.status(400).json({
      ok: false,
      message: 'Please enter your first name and a valid email address.'
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const mailerLiteResponse = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName },
        groups: [MAILERLITE_GROUP_ID]
      }),
      signal: controller.signal
    });

    if (!mailerLiteResponse.ok) {
      const errorBody = await mailerLiteResponse.text();
      console.error('MailerLite signup failed.', mailerLiteResponse.status, errorBody.slice(0, 500));

      const message = mailerLiteResponse.status === 422
        ? 'Please check your email address and try again.'
        : 'Signup is temporarily unavailable. Please try again shortly.';

      return response.status(mailerLiteResponse.status === 422 ? 400 : 502).json({
        ok: false,
        message
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('MailerLite request error.', error instanceof Error ? error.message : error);
    return response.status(502).json({
      ok: false,
      message: 'Signup is temporarily unavailable. Please try again shortly.'
    });
  } finally {
    clearTimeout(timeout);
  }
};
