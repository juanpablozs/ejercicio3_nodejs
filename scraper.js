const axios = require('axios');
const cheerio = require('cheerio');

// Función para realizar la solicitud HTTP y extraer datos
async function scrapeWebsite(url) {
  try {
    // Realizar la solicitud HTTP
    const response = await axios.get(url);

    // Cargar el contenido HTML en Cheerio
    const $ = cheerio.load(response.data);

    // Aquí puedes usar selecciones jQuery-like para extraer datos específicos
    const title = $('title').text();
    const paragraphs = $('p').map((index, element) => $(element).text()).get();

    // Devolver los datos extraídos
    return {
      title,
      paragraphs,
    };
  } catch (error) {
    console.error('Error al hacer la solicitud HTTP:', error.message);
    throw error;
  }
}

// URL de ejemplo
const targetUrl = 'https://www.marca.com';

// Llamar a la función de scraping
scrapeWebsite(targetUrl)
  .then((data) => {
    console.log('Datos extraídos:', data);
    // Aquí puedes procesar los datos según tus necesidades
  })
  .catch((error) => {
    console.error('Error en el scraping:', error.message);
  });

