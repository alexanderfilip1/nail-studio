export const getUserProfile = async (email) => {
  try {
    const req = await fetch("http://localhost:3000/api/getUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const body = await req.json();
    return body;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
