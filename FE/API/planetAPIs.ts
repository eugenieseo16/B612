export const getPlanetDetailAPI = async (
  planetId: string,
  planetContract: any
) => {
  if (!planetContract) return;
  const planetDetail = await planetContract?.methods
    .b612AddressMap(planetId)
    .call();

  return planetDetail;
};
