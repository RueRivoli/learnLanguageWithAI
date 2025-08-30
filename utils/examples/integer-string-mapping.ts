/**
 * 📚 Guide complet : Mapper des entiers avec des chaînes en TypeScript
 * 
 * Ce fichier montre différentes approches pour créer des mappings 
 * bidirectionnels entre entiers et chaînes.
 */

// ========================================
// 1. OBJET DE MAPPING SIMPLE (Recommandé)
// ========================================

export const STATUS_MAPPING = {
  1: "ACTIVE",
  2: "INACTIVE", 
  3: "PENDING",
  4: "SUSPENDED"
} as const

export const STATUS_REVERSE = {
  "ACTIVE": 1,
  "INACTIVE": 2,
  "PENDING": 3,
  "SUSPENDED": 4
} as const

// Types dérivés
export type StatusName = typeof STATUS_MAPPING[keyof typeof STATUS_MAPPING]
export type StatusId = typeof STATUS_REVERSE[keyof typeof STATUS_REVERSE]

// Fonctions utilitaires
export function getStatusName(id: number): StatusName | null {
  return STATUS_MAPPING[id as keyof typeof STATUS_MAPPING] || null
}

export function getStatusId(name: string): StatusId | null {
  return STATUS_REVERSE[name as keyof typeof STATUS_REVERSE] || null
}

// ========================================
// 2. CLASSE DE MAPPING AVANCÉE
// ========================================

export class BiDirectionalMap<K extends string | number, V extends string | number> {
  private keyToValue = new Map<K, V>()
  private valueToKey = new Map<V, K>()

  constructor(entries: [K, V][]) {
    entries.forEach(([key, value]) => {
      this.keyToValue.set(key, value)
      this.valueToKey.set(value, key)
    })
  }

  get(key: K): V | undefined {
    return this.keyToValue.get(key)
  }

  getKey(value: V): K | undefined {
    return this.valueToKey.get(value)
  }

  has(key: K): boolean {
    return this.keyToValue.has(key)
  }

  hasValue(value: V): boolean {
    return this.valueToKey.has(value)
  }

  entries(): [K, V][] {
    return Array.from(this.keyToValue.entries())
  }

  keys(): K[] {
    return Array.from(this.keyToValue.keys())
  }

  values(): V[] {
    return Array.from(this.keyToValue.values())
  }
}

// Utilisation
export const priorityMap = new BiDirectionalMap([
  [1, "LOW"],
  [2, "MEDIUM"],
  [3, "HIGH"],
  [4, "CRITICAL"]
] as const)

// ========================================
// 3. ENUM NUMÉRIQUE AVEC HELPERS
// ========================================

export enum UserRole {
  GUEST = 1,
  USER = 2,
  MODERATOR = 3,
  ADMIN = 4,
  SUPERADMIN = 5
}

export const USER_ROLE_LABELS = {
  [UserRole.GUEST]: "Invité",
  [UserRole.USER]: "Utilisateur",
  [UserRole.MODERATOR]: "Modérateur", 
  [UserRole.ADMIN]: "Administrateur",
  [UserRole.SUPERADMIN]: "Super Administrateur"
} as const

export function getRoleLabel(role: UserRole): string {
  return USER_ROLE_LABELS[role] || "Inconnu"
}

export function getRoleFromString(roleString: string): UserRole | null {
  const entry = Object.entries(UserRole).find(
    ([key, value]) => key === roleString.toUpperCase()
  )
  return entry ? Number(entry[1]) as UserRole : null
}

// ========================================
// 4. MAPPING AVEC MÉTADONNÉES
// ========================================

interface LevelConfig {
  id: number
  name: string
  label: string
  color: string
  icon: string
  minScore: number
}

export const GAME_LEVELS: Record<number, LevelConfig> = {
  1: {
    id: 1,
    name: "NOVICE",
    label: "Novice",
    color: "#10B981",
    icon: "🌱",
    minScore: 0
  },
  2: {
    id: 2,
    name: "APPRENTICE", 
    label: "Apprenti",
    color: "#3B82F6",
    icon: "🎯",
    minScore: 100
  },
  3: {
    id: 3,
    name: "EXPERT",
    label: "Expert", 
    color: "#F59E0B",
    icon: "🏆",
    minScore: 500
  },
  4: {
    id: 4,
    name: "MASTER",
    label: "Maître",
    color: "#EF4444",
    icon: "👑",
    minScore: 1000
  }
}

export function getLevelConfig(id: number): LevelConfig | null {
  return GAME_LEVELS[id] || null
}

export function getLevelByScore(score: number): LevelConfig {
  const levels = Object.values(GAME_LEVELS).sort((a, b) => b.minScore - a.minScore)
  return levels.find(level => score >= level.minScore) || GAME_LEVELS[1]
}

export function getLevelByName(name: string): LevelConfig | null {
  return Object.values(GAME_LEVELS).find(
    level => level.name === name.toUpperCase()
  ) || null
}

// ========================================
// 5. MAPPING DYNAMIQUE AVEC VALIDATION
// ========================================

export class ValidatedMapping<T extends string | number> {
  private mapping: Map<number, T>
  private reverse: Map<T, number>
  private validator?: (value: T) => boolean

  constructor(
    entries: [number, T][],
    validator?: (value: T) => boolean
  ) {
    this.mapping = new Map(entries)
    this.reverse = new Map(entries.map(([k, v]) => [v, k]))
    this.validator = validator
  }

  get(id: number): T | null {
    return this.mapping.get(id) || null
  }

  getId(value: T): number | null {
    if (this.validator && !this.validator(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
    return this.reverse.get(value) || null
  }

  add(id: number, value: T): void {
    if (this.validator && !this.validator(value)) {
      throw new Error(`Invalid value: ${value}`)
    }
    if (this.mapping.has(id)) {
      throw new Error(`ID ${id} already exists`)
    }
    if (this.reverse.has(value)) {
      throw new Error(`Value ${value} already exists`)
    }
    this.mapping.set(id, value)
    this.reverse.set(value, id)
  }

  remove(id: number): boolean {
    const value = this.mapping.get(id)
    if (!value) return false
    
    this.mapping.delete(id)
    this.reverse.delete(value)
    return true
  }

  list(): Array<{ id: number; value: T }> {
    return Array.from(this.mapping.entries()).map(([id, value]) => ({ id, value }))
  }
}

// Exemple avec validation
const isValidLanguage = (lang: string): boolean => /^[A-Z]{2,3}$/.test(lang)

export const languageMapping = new ValidatedMapping([
  [1, "EN"],
  [2, "FR"], 
  [3, "ES"],
  [4, "DE"],
  [5, "TR"]
], isValidLanguage)

// ========================================
// 6. MAPPING AVEC HIÉRARCHIE
// ========================================

interface HierarchicalLevel {
  id: number
  name: string
  parent?: number
  children: number[]
}

export const SKILL_TREE: Record<number, HierarchicalLevel> = {
  1: { id: 1, name: "BASICS", children: [2, 3] },
  2: { id: 2, name: "GRAMMAR", parent: 1, children: [4, 5] },
  3: { id: 3, name: "VOCABULARY", parent: 1, children: [6, 7] },
  4: { id: 4, name: "TENSES", parent: 2, children: [] },
  5: { id: 5, name: "CASES", parent: 2, children: [] },
  6: { id: 6, name: "COMMON_WORDS", parent: 3, children: [] },
  7: { id: 7, name: "PHRASES", parent: 3, children: [] }
}

export function getSkillPath(skillId: number): HierarchicalLevel[] {
  const path: HierarchicalLevel[] = []
  let current = SKILL_TREE[skillId]
  
  while (current) {
    path.unshift(current)
    current = current.parent ? SKILL_TREE[current.parent] : undefined
  }
  
  return path
}

export function getSkillChildren(skillId: number): HierarchicalLevel[] {
  const skill = SKILL_TREE[skillId]
  return skill ? skill.children.map(id => SKILL_TREE[id]).filter(Boolean) : []
}

// ========================================
// 7. EXEMPLES D'UTILISATION
// ========================================

export function demonstrateUsage() {
  console.log("=== Exemples d'utilisation ===")
  
  // 1. Mapping simple
  console.log("Status 1:", getStatusName(1)) // "ACTIVE"
  console.log("Status ID pour PENDING:", getStatusId("PENDING")) // 3
  
  // 2. Classe BiDirectionalMap
  console.log("Priorité 3:", priorityMap.get(3)) // "HIGH"
  console.log("ID pour CRITICAL:", priorityMap.getKey("CRITICAL")) // 4
  
  // 3. Enum avec labels
  console.log("Role label:", getRoleLabel(UserRole.ADMIN)) // "Administrateur"
  console.log("Role from string:", getRoleFromString("MODERATOR")) // 3
  
  // 4. Mapping avec métadonnées
  const level = getLevelConfig(3)
  console.log("Level 3:", level?.label, level?.icon) // "Expert 🏆"
  
  const scoreLevel = getLevelByScore(750)
  console.log("Level pour score 750:", scoreLevel.label) // "Expert"
  
  // 5. Mapping avec validation
  try {
    languageMapping.add(6, "ZZ") // Erreur si validation échoue
  } catch (error) {
    console.log("Erreur validation:", error.message)
  }
  
  // 6. Hiérarchie
  const grammarPath = getSkillPath(4)
  console.log("Chemin vers TENSES:", grammarPath.map(s => s.name)) // ["BASICS", "GRAMMAR", "TENSES"]
}

// Export par défaut avec toutes les approches
export default {
  STATUS_MAPPING,
  STATUS_REVERSE,
  BiDirectionalMap,
  priorityMap,
  UserRole,
  USER_ROLE_LABELS,
  GAME_LEVELS,
  ValidatedMapping,
  languageMapping,
  SKILL_TREE,
  // Fonctions utilitaires
  getStatusName,
  getStatusId,
  getRoleLabel,
  getRoleFromString,
  getLevelConfig,
  getLevelByScore,
  getLevelByName,
  getSkillPath,
  getSkillChildren,
  demonstrateUsage
}
