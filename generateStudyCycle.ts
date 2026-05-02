// ============================================================
// generateStudyCycle.ts - Lógica de Distribuição de Estudos
// ============================================================

export interface SubjectInput {
  id: string;
  name: string;
  weight: number;
}

export interface SubjectSession {
  id: string;
  name: string;
  weight: number;
  allocatedMinutes: number;
  sharePercent: number;
}

export interface StudyCycle {
  totalAvailableMinutes: number;
  totalAllocatedMinutes: number;
  sessions: SubjectSession[];
  warnings: string[];
  generatedAt: string;
}

const MIN_MINUTES = 30;
const ROUND_TO = 5;

function largestRemainderRound(rawValues: number[], target: number, step: number): number[] {
  const floors = rawValues.map(v => Math.floor(v / step) * step);
  const remainders = rawValues.map((v, i) => v - floors[i]);
  let deficit = Math.round((target - floors.reduce((a, b) => a + b, 0)) / step);
  const indices = remainders.map((r, i) => ({ r, i })).sort((a, b) => b.r - a.r).map(x => x.i);
  const result = [...floors];
  for (let k = 0; k < deficit; k++) {
    result[indices[k % indices.length]] += step;
  }
  return result;
}

export function generateStudyCycle(subjects: SubjectInput[], availableHours: number): StudyCycle {
  const warnings: string[] = [];
  const totalMinutes = Math.round(availableHours * 60);
  const requiredMinimum = subjects.length * MIN_MINUTES;

  if (totalMinutes < requiredMinimum) {
    throw new Error(`Tempo insuficiente para o número de matérias.`);
  }

  const totalWeight = subjects.reduce((sum, s) => sum + s.weight, 0);
  const flexibleTime = totalMinutes - (subjects.length * MIN_MINUTES);

  const rawAllocations = subjects.map(s => MIN_MINUTES + ((s.weight / totalWeight) * flexibleTime));
  const roundedAllocations = largestRemainderRound(rawAllocations, totalMinutes, ROUND_TO);

  const sessions: SubjectSession[] = subjects.map((s, i) => ({
    id: s.id,
    name: s.name,
    weight: s.weight,
    allocatedMinutes: roundedAllocations[i],
    sharePercent: Math.round((roundedAllocations[i] / totalMinutes) * 1000) / 10,
  }));

  return {
    totalAvailableMinutes: totalMinutes,
    totalAllocatedMinutes: totalMinutes,
    sessions,
    warnings,
    generatedAt: new Date().toISOString(),
  };
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}