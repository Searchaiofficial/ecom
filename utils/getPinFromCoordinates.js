import axios from "axios";

export const getPinFromCoordinates = async (lat, lng) => {
  const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
  const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;

  const options = {
    method: "GET",
    url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
    params: {
      location: `${lat},${lng}`,
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
  };

  try {
    const response = await axios.request(options);

    return response.data.results[0].postal_code;
  } catch (error) {
    console.error(error);
  }
};
