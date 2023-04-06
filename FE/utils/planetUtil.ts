export const planetNameParser = (planetName: string | null | undefined) => {
  if (!planetName) return ['', ''];
  const length = planetName.split(' ').length;
  return [
    planetName
      .split(' ')
      .slice(0, length - 1)
      .join(' '),
    planetName.split(' ')[length - 1],
  ];
};
