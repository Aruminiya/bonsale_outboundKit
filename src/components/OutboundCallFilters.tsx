import { Box, Paper, Typography, TextField, MenuItem, Button } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Clear, Search } from '@mui/icons-material'
import dayjs, { Dayjs } from 'dayjs'
import { OutboundCallFilters as FilterType } from '@/types/outboundCall'

interface OutboundCallFiltersProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
  onClear: () => void
  onSearch: () => void
}

export function OutboundCallFilters({
  filters,
  onFiltersChange,
  onClear,
  onSearch,
}: OutboundCallFiltersProps) {
  const handleStartDateChange = (newValue: Dayjs | null) => {
    onFiltersChange({ ...filters, startDate: newValue?.toDate() || null })
  }

  const handleEndDateChange = (newValue: Dayjs | null) => {
    onFiltersChange({ ...filters, endDate: newValue?.toDate() || null })
  }

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status })
  }

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search })
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography sx={{ minWidth: 60 }}>時間：</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="開始時間"
            value={filters.startDate ? dayjs(filters.startDate) : null}
            onChange={handleStartDateChange}
            format="YYYY/MM/DD HH:mm"
            slotProps={{
              textField: {
                size: 'small',
                sx: { width: 200 },
              },
            }}
          />
        </LocalizationProvider>
        <Typography>-</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="結束時間"
            value={filters.endDate ? dayjs(filters.endDate) : null}
            onChange={handleEndDateChange}
            format="YYYY/MM/DD HH:mm"
            slotProps={{
              textField: {
                size: 'small',
                sx: { width: 200 },
              },
            }}
          />
        </LocalizationProvider>

        <Typography sx={{ ml: 2, minWidth: 60 }}>狀態：</Typography>
        <TextField
          select
          size="small"
          value={filters.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          sx={{ width: 120 }}
        >
          <MenuItem value="全部">全部</MenuItem>
          <MenuItem value="未撥打">未撥打</MenuItem>
          <MenuItem value="撥打成功">撥打成功</MenuItem>
          <MenuItem value="撥打失敗">撥打失敗</MenuItem>
        </TextField>

        <Typography sx={{ ml: 2, minWidth: 60 }}>分機：</Typography>
        <TextField
          size="small"
          placeholder="請選擇或輸入分機"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ width: 200 }}
        />

        <Button startIcon={<Clear />} onClick={onClear} sx={{ ml: 2 }}>
          清除
        </Button>
        <Button variant="contained" startIcon={<Search />} onClick={onSearch}>
          搜尋
        </Button>
      </Box>
    </Paper>
  )
}
