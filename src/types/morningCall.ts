export interface MorningCallRecord {
  id: string
  audioFile: string // 鈴聲名稱，例如: "預設鈴聲"
  date: string // 日期，例如: "2024/12/05"
  extension: string // 分機號，例如: "A館 10F - 1002"
  callStatus: '未撥打' | '撥打成功' | '撥打失敗' // 撥號紀錄，例如: "已接聽"
  notes?: string // 備註
  notificationContent: string // 通知內容
  retryInterval: string // 重試間隔，單位分鐘
}

export interface MorningCallFilters {
  startDate: Date | null
  endDate: Date | null
  status: string // '全部' | '排程中' | '已完成' | '失敗'
  search: string
}

export type CallStatus = '排程中' | '已完成' | '失敗'
