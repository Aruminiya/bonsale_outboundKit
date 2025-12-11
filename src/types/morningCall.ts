export interface MorningCallRecord {
  id: string
  time: string // 時間，例如: "12/05 07:30"
  extension: string // 分機號，例如: "A館 10F - 1002"
  callStatus: '排程中' | '已完成' | '失敗' // 撥號狀態
  callResult?: string // 撥號紀錄，例如: "已接聽"
  notes?: string // 備註
}

export interface MorningCallFilters {
  startDate: Date | null
  endDate: Date | null
  status: string // '全部' | '排程中' | '已完成' | '失敗'
  search: string
}

export type CallStatus = '排程中' | '已完成' | '失敗'
