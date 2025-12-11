import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useState } from 'react'

interface MorningCallDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: MorningCallFormData) => void
}

export interface MorningCallFormData {
  extension: string
  date: string
  time: string
  retryInterval: string // 分鐘
  maxRetries: string // 次數
  notificationContent: string
  audioFile: string
  notes: string
}

export function MorningCallDialog({ open, onClose, onSubmit }: MorningCallDialogProps) {
  const [formData, setFormData] = useState<MorningCallFormData>({
    extension: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:00',
    retryInterval: '5',
    maxRetries: '3',
    notificationContent: '標準叫醒服務',
    audioFile: '預設鈴聲',
    notes: '',
  })

  const handleChange = (field: keyof MorningCallFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
    // Reset form
    setFormData({
      extension: '',
      date: new Date().toISOString().split('T')[0],
      time: '07:00',
      retryInterval: '5',
      maxRetries: '3',
      notificationContent: '標準叫醒服務',
      audioFile: '預設鈴聲',
      notes: '',
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">新增 Morning Call</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* 分機 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            分機
          </Typography>
          <TextField
            fullWidth
            placeholder="請選擇或輸入分機"
            value={formData.extension}
            onChange={(e) => handleChange('extension', e.target.value)}
            size="small"
          />
        </Box>

        {/* 日期和呼叫時間 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              日期
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              呼叫時間
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        {/* 重呼設定 */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          重呼設定
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              重試間隔（分鐘）
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.retryInterval}
              onChange={(e) => handleChange('retryInterval', e.target.value)}
              size="small"
            >
              <MenuItem value="1">1 分鐘</MenuItem>
              <MenuItem value="3">3 分鐘</MenuItem>
              <MenuItem value="5">5 分鐘</MenuItem>
              <MenuItem value="10">10 分鐘</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              最多重試次數
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.maxRetries}
              onChange={(e) => handleChange('maxRetries', e.target.value)}
              size="small"
            >
              <MenuItem value="1">1 次</MenuItem>
              <MenuItem value="2">2 次</MenuItem>
              <MenuItem value="3">3 次</MenuItem>
              <MenuItem value="5">5 次</MenuItem>
            </TextField>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
          每 {formData.retryInterval} 分鐘重試，最多 {formData.maxRetries} 次
        </Typography>

        {/* 通知內容和音檔名稱 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              通知內容
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.notificationContent}
              onChange={(e) => handleChange('notificationContent', e.target.value)}
              size="small"
            >
              <MenuItem value="標準叫醒服務">標準叫醒服務</MenuItem>
              <MenuItem value="會議提醒">會議提醒</MenuItem>
              <MenuItem value="航班提醒">航班提醒</MenuItem>
              <MenuItem value="自訂訊息">自訂訊息</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              音檔名稱
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.audioFile}
              onChange={(e) => handleChange('audioFile', e.target.value)}
              size="small"
            >
              <MenuItem value="預設鈴聲">預設鈴聲</MenuItem>
              <MenuItem value="溫柔叫醒">溫柔叫醒</MenuItem>
              <MenuItem value="緊急鈴聲">緊急鈴聲</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* 備註 */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            備註（選填）
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="例如：會議、趕飛機等"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          取消
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          新增
        </Button>
      </DialogActions>
    </Dialog>
  )
}
