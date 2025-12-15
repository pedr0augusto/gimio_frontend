export function getLevelColor(level: number): string {
  if (level >= 1 && level <= 19) return '#CD7F32'; // Bronze
  if (level >= 20 && level <= 49) return '#C0C0C0'; // Prata
  if (level >= 50 && level <= 89) return '#FFD700'; // Ouro
  if (level >= 90 && level <= 120) return '#FF4500'; // Master
  return '#FFFFFF';
}

export function getLevelIcon(level: number) {
  if (level >= 1 && level <= 19)
    return require('../../assets/icons/level/bronze.png');
  if (level >= 20 && level <= 49)
    return require('../../assets/icons/level/prata.png');
  if (level >= 50 && level <= 89)
    return require('../../assets/icons/level/ouro.png');
  if (level >= 90 && level <= 120)
    return require('../../assets/icons/level/master.png');

  return require('../../assets/icons/level/bronze.png'); // fallback
}
