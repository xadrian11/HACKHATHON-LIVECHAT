export async function getPages() {
    const res = await fetch('/api/pages');
    if (res.ok) {
      return await res.json()
    } else {
      console.log('sup')
    }
  }
