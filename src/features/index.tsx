import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Chip,
  Pagination,
} from '@mui/material'
import {
  Phone,
  Edit,
  Delete,
  Add,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import { OutboundCallRecord, OutboundCallFilters as FilterType } from '@/types/outboundCall'
import { OutboundCallDialogWrapper, OutboundCallFormData } from '../components/OutboundCallDialogWrapper'
import { OutboundCallFilters } from '../components/OutboundCallFilters'

export { OutboundCallDialogWrapper } from '../components/OutboundCallDialogWrapper'
export type { OutboundCallFormData } from '../components/OutboundCallDialogWrapper'

// 模擬數據 之後改成從 API 獲取

const testData: OutboundCallRecord[] = [
  {
    id: '1',
    audioFile: '預設鈴聲',
    date: '2025/12/05 07:30',
    extension: 'A館 10F - 1002',
    callStatus: '未撥打',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
  },
  {
    id: '2',
    audioFile: '預設鈴聲',
    date: '2025/12/05 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '未撥打',
    notes: '明天會議叫醒',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
  },
  {
    id: '3',
    date: '2025/12/04 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '未撥打',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '4',
    date: '2025/12/04 06:00',
    extension: 'B館 11F - 1101',
    callStatus: '撥打成功',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '5',
    date: '2025/12/03 07:15',
    extension: 'B館 11F - 1108',
    callStatus: '未撥打',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '6',
    date: '2025/12/03 06:45',
    extension: 'B館 11F - 1103',
    callStatus: '撥打失敗',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '7',
    date: '2025/12/03 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '未撥打',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '8',
    date: '2025/12/03 06:00',
    extension: 'B館 11F - 1108',
    callStatus: '撥打成功',
    notes: '提醒飛機起飛時間',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '9',
    date: '2025/12/03 05:30',
    extension: 'C館 12F - 1201',
    callStatus: '撥打成功',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
  {
    id: '10',
    date: '2025/12/02 09:00',
    extension: 'B館 11F - 1108',
    callStatus: '撥打失敗',
    notes: '',
    notificationContent: '標準叫醒服務',
    retryInterval: '5',
    audioFile: ''
  },
]
const PAGE_SIZE = 10 // 每頁顯示筆數

const testList = {
  totalPage: Math.ceil(testData.length / PAGE_SIZE),
  list: testData as OutboundCallRecord[],
}

export function MorningCallList() {
  // 模擬數據 之後改成從 API 獲取
  const [mockList, setMockList] = useState(testList)

  const [filters, setFilters] = useState<FilterType>({
    startDate: null,
    endDate: null,
    status: '全部',
    search: '',
  })
  const [page, setPage] = useState(1)
  const [isSearchActive, setIsSearchActive] = useState(false)

  // 過濾資料
  const filteredList = useMemo(() => {
    if (!isSearchActive) {
      return mockList.list
    }

    let result = mockList.list

    // 過濾時間區間
    if (filters.startDate) {
      result = result.filter(item => {
        const itemDate = dayjs(item.date, 'YYYY/MM/DD HH:mm')
        return itemDate.isAfter(dayjs(filters.startDate)) || itemDate.isSame(dayjs(filters.startDate))
      })
    }
    if (filters.endDate) {
      result = result.filter(item => {
        const itemDate = dayjs(item.date, 'YYYY/MM/DD HH:mm')
        return itemDate.isBefore(dayjs(filters.endDate)) || itemDate.isSame(dayjs(filters.endDate))
      })
    }

    // 過濾狀態
    if (filters.status !== '全部') {
      result = result.filter(item => item.callStatus === filters.status)
    }

    // 過濾分機號
    if (filters.search.trim()) {
      result = result.filter(item =>
        item.extension.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    return result
  }, [mockList.list, filters, isSearchActive])

  // 計算過濾後的總頁數
  const totalPages = useMemo(() => {
    return Math.ceil(filteredList.length / PAGE_SIZE)
  }, [filteredList.length])

  // 計算當前頁面應該顯示的數據
  // 使用 useMemo 避免不必要的重新計算
  const paginatedList = useMemo(() => {
    return filteredList.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    )
  }, [filteredList, page])

  const handleClearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      status: '全部',
      search: '',
    })
    setIsSearchActive(false)
    setPage(1)
  }

  const handleSearch = () => {
    setIsSearchActive(true)
    setPage(1)
  }

  const handleAddMorningCall = (data: OutboundCallFormData) => {
    console.log('新增 Morning Call:', data)
    // TODO: 呼叫 API 新增資料
    setMockList((prev) => {
      const newRecord: OutboundCallRecord = {
        id: (prev.list.length + 1).toString(),
        audioFile: data.audioFile,
        date: data.date,
        extension: data.extension,
        callStatus: '未撥打',
        notes: data.notes,
        notificationContent: data.notificationContent,
        retryInterval: data.retryInterval,
      }
      const newList = [newRecord, ...prev.list]
      return {
        totalPage: Math.ceil(newList.length / PAGE_SIZE),
        list: newList,
      }
    })
  }

  const handleDeleteMorningCall = (id: string) => {
    console.log('刪除 Morning Call')
    // TODO: 呼叫 API 刪除資料
    setMockList((prev) => {
      const newList = prev.list.filter((item) => item.id !== id)
      return {
        totalPage: Math.ceil(newList.length / PAGE_SIZE),
        list: newList,
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '未撥打':
        return 'default'
      case '撥打成功':
        return 'success'
      case '撥打失敗':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3, px: 2, bgcolor: 'background.paper' }}>
        <Phone sx={{ color: 'text.secondary' }} />
        <Typography variant="h6" component="h1">
          Morning Call 分機紀錄
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <OutboundCallDialogWrapper
            onSubmit={handleAddMorningCall}
            trigger={(onClick) => (
              <Button variant="contained" startIcon={<Add />} onClick={onClick}>
                新增
              </Button>
            )}
          />
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          {/* Filters */}
          <OutboundCallFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={handleClearFilters}
            onSearch={handleSearch}
          />

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>時間</TableCell>
                  <TableCell>分機號</TableCell>
                  <TableCell>撥號狀態</TableCell>
                  <TableCell>備註</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedList.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.extension}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.callStatus}
                        color={getStatusColor(row.callStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.notes || '-'}</TableCell>
                    <TableCell align="center">
                      <OutboundCallDialogWrapper
                        onSubmit={handleAddMorningCall}
                        mode='edit'
                        data={{
                          extension: row.extension,
                          date: row.date, // 直接使用 row.date，格式應該是 "yyyy/MM/dd HH:mm"
                          retryInterval: row.retryInterval,
                          maxRetries: '3', // 預設值（MorningCallRecord 沒有此欄位）
                          notificationContent: row.notificationContent,
                          audioFile: row.audioFile,
                          notes: row.notes || '',
                        }}
                        trigger={(onClick) => (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={onClick}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                      />

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteMorningCall(row.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
