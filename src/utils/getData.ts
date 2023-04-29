export async function getData(url: string){
  try {
      const response = await fetch(url);

      if (!response.ok) {
          console.error("Network response was not OK");

          return [];
      }

      return await response.json();

  } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);

      return [];
  }
}
