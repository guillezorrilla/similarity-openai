export async function getSimilarity({
  text1,
  text2,
  apiKey
}: {
  text1: string;
  text2: string;
  apiKey: string;
}) {
  const details: any = {
    text1,
    text2
  };
  let formBody: any = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  const res = await fetch('/api/v1/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: apiKey
    },
    body: formBody
  });

  const data = (await res.json()) as { error?: string };
  if (data.error) {
    throw new Error(data.error);
  }
  return data as {
    similarity: number;
    success: boolean;
    text1: string;
    text2: string;
  };
}
