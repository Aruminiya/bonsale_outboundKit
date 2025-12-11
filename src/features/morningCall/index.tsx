import { useState } from 'react'
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
  TextField,
  MenuItem,
  Button,
  Chip,
  Pagination,
} from '@mui/material'
import {
  Phone,
  Edit,
  Delete,
  Visibility,
  Clear,
  Search,
  Add,
} from '@mui/icons-material'
import { MorningCallRecord, MorningCallFilters } from '@/types/morningCall'
import { MorningCallDialog, MorningCallFormData } from './MorningCallDialog'

export { MorningCallDialog } from './MorningCallDialog'
export type { MorningCallFormData } from './MorningCallDialog'

// 模擬數據
const mockData: MorningCallRecord[] = [
  {
    id: '1',
    time: '12/05 07:30',
    extension: 'A館 10F - 1002',
    callStatus: '排程中',
  },
  {
    id: '2',
    time: '12/05 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '排程中',
    notes: '明天會議叫醒',
  },
  {
    id: '3',
    time: '12/04 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '排程中',
  },
  {
    id: '4',
    time: '12/04 06:00',
    extension: 'B館 11F - 1101',
    callStatus: '已完成',
    callResult: '已接聽',
  },
  {
    id: '5',
    time: '12/03 07:15',
    extension: 'B館 11F - 1108',
    callStatus: '排程中',
  },
  {
    id: '6',
    time: '12/03 06:45',
    extension: 'B館 11F - 1103',
    callStatus: '失敗',
    callResult: '未接聽',
  },
  {
    id: '7',
    time: '12/03 06:30',
    extension: 'B館 11F - 1108',
    callStatus: '排程中',
  },
  {
    id: '8',
    time: '12/03 06:00',
    extension: 'B館 11F - 1108',
    callStatus: '已完成',
    callResult: '已接聽',
    notes: '提醒飛機起飛時間',
  },
  {
    id: '9',
    time: '12/03 05:30',
    extension: 'C館 12F - 1201',
    callStatus: '已完成',
    callResult: '未接聽 → 重呼成功',
  },
  {
    id: '10',
    time: '12/02 09:00',
    extension: 'B館 11F - 1108',
    callStatus: '失敗',
    callResult: '系統錯誤，無法完成撥號',
  },
]

export function MorningCallList() {
  const [filters, setFilters] = useState<MorningCallFilters>({
    startDate: null,
    endDate: null,
    status: '全部',
    search: '',
  })
  const [page, setPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      status: '全部',
      search: '',
    })
  }

  const handleAddMorningCall = (data: MorningCallFormData) => {
    console.log('新增 Morning Call:', data)
    // TODO: 呼叫 API 新增資料
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '排程中':
        return 'warning'
      case '已完成':
        return 'success'
      case '失敗':
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
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ ml: 'auto' }}
          onClick={() => setDialogOpen(true)}
        >
          新增
        </Button>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          {/* Filters */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography sx={{ minWidth: 60 }}>時間：</Typography>
              <TextField
                type="date"
                size="small"
                placeholder="開始日期"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 160 }}
              />
              <Typography>-</Typography>
              <TextField
                type="date"
                size="small"
                placeholder="結束日期"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 160 }}
              />

              <Typography sx={{ ml: 2, minWidth: 60 }}>狀態：</Typography>
              <TextField
                select
                size="small"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                sx={{ width: 120 }}
              >
                <MenuItem value="全部">全部</MenuItem>
                <MenuItem value="排程中">排程中</MenuItem>
                <MenuItem value="已完成">已完成</MenuItem>
                <MenuItem value="失敗">失敗</MenuItem>
              </TextField>

              <Typography sx={{ ml: 2, minWidth: 60 }}>分機：</Typography>
              <TextField
                size="small"
                placeholder="請選擇或輸入分機"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                sx={{ width: 200 }}
              />

              <Button
                startIcon={<Clear />}
                onClick={handleClearFilters}
                sx={{ ml: 2 }}
              >
                清除
              </Button>
              <Button variant="contained" startIcon={<Search />}>
                搜尋
              </Button>
            </Box>
          </Paper>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>時間</TableCell>
                  <TableCell>分機號</TableCell>
                  <TableCell>撥號狀態</TableCell>
                  <TableCell>撥號紀錄</TableCell>
                  <TableCell>備註</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.extension}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.callStatus}
                        color={getStatusColor(row.callStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.callResult || '-'}</TableCell>
                    <TableCell>{row.notes || '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary">
                        {row.callStatus === '已完成' || row.callStatus === '失敗' ? (
                          <Visibility fontSize="small" />
                        ) : (
                          <Edit fontSize="small" />
                        )}
                      </IconButton>
                      <IconButton size="small" color="error">
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
              count={2}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Container>

      {/* Add Dialog */}
      <MorningCallDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddMorningCall}
      />
    </>
  )
}
