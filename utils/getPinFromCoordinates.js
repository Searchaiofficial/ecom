import axios from "axios";

export const getPinFromCoordinates = async (lat, lng) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    return response.data.results[0].address_components.find((component) => {
      return component.types.includes("postal_code");
    }).long_name;
  } catch (error) {
    console.error(error);
  }
};
