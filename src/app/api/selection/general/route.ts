export async function GET() {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=50&category=9");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
