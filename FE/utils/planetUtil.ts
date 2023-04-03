export const planetNameParser = (planetName: string) => {
  if (!Boolean(planetName)) return ['', ''];
  return [
    planetName.split(' ').slice(0, 3).join(' '),
    planetName.split(' ')[3],
  ];
};
