// Must be used in client components

export const gtmEvent = ({ action, params }) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      ...params,
    });
  }
};
